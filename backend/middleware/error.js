const ErrorHandler = require("../utilities/errorHandler");

module.exports = (err, req, res, next) => {
  // console.log(err);
  
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal server error";
  if (err.name === "CastError") {
    const message = `Rosourse not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 401);
  }
  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }

  // Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token is invalid, Try again `;
    err = new ErrorHandler(message, 400);
  }

  // JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token is Expired, Try again `;
    err = new ErrorHandler(message, 400);
  }
  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
