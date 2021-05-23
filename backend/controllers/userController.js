const User = require('../models/user');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

const cloudinary = require('cloudinary');

// @route   POST api/register
// @desc    Register a user
// @access  Public
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: 'shop/avatars',
    width: 150,
    crop: 'scale'
  });

  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: result.public_id,
      url: result.secure_url
    }
  });

  sendToken(user, 200, res);
});

// @route   POST api/login
// @desc    Login user
// @access  Public
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checks if email and password where entered
  if (!email || !password) {
    return next(new ErrorHandler('Please enter your email and password', 400));
  }

  //Finding a user with the email
  const user = await User.findOne({ email }).select('+password');

  // Checking if there is a user with that mail
  if (!user) {
    return next(new ErrorHandler('Invalid email', 401));
  }

  // Checking if password is correct
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler('Mail and password do not match', 401));
  }

  sendToken(user, 200, res);
});

// @route   GET api/logout
// @desc    Logout user
// @access  Public
const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
    httpOnly: true
  });

  res.status(200).json({
    success: true,
    message: 'Loged out'
  });
});

// @route   POST api/password/forgot
// @desc    Recovery mail to reset password
// @access  Public
const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler('No user with this mail was found', 404));
  }

  // Get reset token
  const resetToken = await user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password url
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/password/reset/${resetToken}`;

  const message = `Your password reset token is as follow:\n\n${resetURL}\n\nIf you have not requested this email, than ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'shop password recovery',
      message
    });

    res.status(200).json({
      success: true,
      message: `Email sent to: ${user.email}`
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// @route   POST api/password/reset/:token
// @desc    Reset password
// @access  Public
const resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL tokenn
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() }
  });

  if (!user) {
    {
      return next(new ErrorHandler('Password reset token has expired', 400));
    }
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler('Passwords do not match', 400));
  }

  // Set the new password
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// @route   GET api/me
// @desc    Get currently logged in user details
// @access  private
const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user
  });
});

// @route   PUT api/password/update
// @desc    Update password
// @access  private
const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');

  // Checking previous password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler('Old password is incorrect'));
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
});

// @route   PUT api/me/update/
// @desc    Update profile
// @access  private
const updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email
  };

  // TODO: Update avatar

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true
  });
});

// -------- Admin routes ----------

// @route   GET api/admin/users
// @desc    Get all users
// @access  admin
const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users
  });
});

// @route   GET api/admin/user/:user_id
// @desc    Get user by id
// @access  admin
const getUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.user_id);

  if (!user) {
    return next(
      new ErrorHandler(
        `Could not find user with the following id: ${req.params.user_id}`,
        404
      )
    );
  }

  res.status(200).json({
    success: true,
    user
  });
});

// @route   PUT api/admin/user/:user_id
// @desc    Update user profile
// @access  admin
const updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role
  };

  // TODO: Update avatar

  const user = await User.findByIdAndUpdate(req.params.user_id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });

  res.status(200).json({
    success: true
  });
});

// @route   DELETE api/admin/user/:user_id
// @desc    Delete user by id
// @access  admin
const deleteUserById = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.user_id);

  if (!user) {
    return next(
      new ErrorHandler(
        `Could not find user with the following id: ${req.params.user_id}`,
        404
      )
    );
  }

  // TODO - remove avatar from cloudinary

  await user.remove();

  res.status(200).json({
    success: true
  });
});

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.logout = logout;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.getUserProfile = getUserProfile;
exports.updatePassword = updatePassword;
exports.updateProfile = updateProfile;
exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.updateUser = updateUser;
exports.deleteUserById = deleteUserById;
