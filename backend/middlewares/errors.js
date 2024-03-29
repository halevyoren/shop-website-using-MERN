const ErrorHandler = require('../utils/errorHandler');

const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  // err.message = err.message || 'Internal server error';
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errorMessage: err.message,
      stack: err.stack
    });
  }

  if (process.env.NODE_ENV === 'PRODUCTION') {
    let error = { ...err };
    error.message = err.message;

    // Wrong mongoose object id error
    if (err.name === 'CastError') {
      const message = `Resource not found. Invalid: ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handling mongoose validation error
    if (err.name === 'ValidationError') {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    // Handling mongoose duplicate key error
    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    // Handling wrong JWT error
    if (err.name === 'JsonWebTokenError') {
      const message = 'JSON Web Token is invalid. Please try again.';
      error = new ErrorHandler(message, 400);
    }

    // Handling expired JWT error
    if (err.name === 'TokenExpiredError') {
      const message = 'JSON Web Token has expired. Please try again.';
      error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }
};

module.exports = errorMiddleware;
