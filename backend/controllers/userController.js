const User = require('../models/user');

const catchAsyncErrors = require('../middlewares/catchAsyncErrors');
const ErrorHandler = require('../utils/errorHandler');

// @route   POST api/products
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

  const token = getJwtToken();

  res.status(201).json({
    success: true,
    token
  });
});

// @route   POST api/products
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

  const token = user.getJwtToken();

  res.status(200).json({
    success: true,
    token
  });
});

exports.registerUser = registerUser;
exports.loginUser = loginUser;
