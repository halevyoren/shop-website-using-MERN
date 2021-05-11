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

exports.registerUser = registerUser;
