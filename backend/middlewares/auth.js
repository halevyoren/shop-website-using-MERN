const User = require('../models/user');
const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');

// Check if user is authenticated
const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler('Login in oder to access this resource', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) {
    return next(new ErrorHandler('Logout, incorrect token', 403));
  }

  req.user = user;

  next();
});

// Handling user's roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          'This user is not allowed to access this resource',
          403
        )
      );
    }
    next();
  };
};

exports.isAuthenticatedUser = isAuthenticatedUser;
exports.authorizeRoles = authorizeRoles;
