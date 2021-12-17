/* eslint-disable no-console */
const AppError = require("./apiError");

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

// eslint-disable-next-line no-unused-vars
const handleDuplicateFieldsDB = (err) => {
  // const value = err.message.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token, Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired!, Please log in again.", 401);

const sendErrorDev = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) RENDERED WEBSITE
  console.log("ERROR!!!:", err);

  return res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
    message: err.message,
  });
};

const sendErrorProd = (err, req, res) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    // A) Operational, trusted error: send message to client
    if (
      err.isOperational /*|| err.status === 'fail' || err.status === 'error'*/
    ) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }

    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.log("ERROR!!!:", err);
    // 2) Send generic message
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (
    err.isOperational /*|| err.status === 'fail' || err.status === 'error'*/
  ) {
    return res.status(err.statusCode).json({
      title: "Something went wrong!",
      msg: err.message,
    });
  }

  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.log("ERROR!!!:", err);
  // 2) Send generic message
  return res.status(err.statusCode).json({
    title: "Something went wrong!",
    msg: "Please try again later...",
  });
};

//error controller

module.exports = (err, req, res, next) => {
  // console.log(err.stack);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    if (err.name === "CastError") err = handleCastErrorDB(err);
    if (err.code === 11000) err = handleDuplicateFieldsDB(err);
    if (err.name === "ValidationError") err = handleValidationErrorDB(err);
    if (err.name === "JsonWebTokenError") err = handleJWTError();
    if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

    sendErrorProd(err, req, res);
  }
};
