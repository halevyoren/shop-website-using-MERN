const User = require('../models/user');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');
const sendToken = require('../utils/jwtToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

// @route   POST api/register
// @desc    Register a user
// @access  Public
const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: 'v1620537600/lhfhnx1cle4axzgqpl9a',
      url:
        'https://res.cloudinary.com/dda7iyn5d/image/upload/v1620537600/lhfhnx1cle4axzgqpl9a.png'
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

exports.registerUser = registerUser;
exports.loginUser = loginUser;
exports.forgotPassword = forgotPassword;
exports.resetPassword = resetPassword;
exports.getUserProfile = getUserProfile;
exports.logout = logout;
