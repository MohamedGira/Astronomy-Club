import { AppError } from "../utils/AppError.mjs";
const sendErrorDev = (err, res) => {
  console.log(err)
  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (!err.isOperational) console.error("Error: ", err);

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};

// DB Error Handlers
const handleCastErrorDb = (err) => {
  const message = `Invalid query for ${err.path}: ${err.value}.`;
  return new AppError(400, message);
};

const handleDublicateFieldDb = (err) => {
  const message = `${JSON.stringify(err.keyValue)}. is already taken`;
  return new AppError(400, message);
};

const handleValidationErrorDb = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `invalid input data: ${errors.join(". ")}`;
  return new AppError(400, message);
};

export const ErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Server Error";
  err.message = err.message || "sorry somthing went wrong :(";
  console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    //handling DB errors in production
    var error = { ...err };

    if (err.name === "CastError") {
      error = handleCastErrorDb(error);
      sendErrorProd(error, res);
    }else
    if (err.code === 11000) {
      error = handleDublicateFieldDb(error);
      sendErrorProd(error, res);
    }else
    if (err.name === "ValidationError") {
      error = handleValidationErrorDb(error);
      sendErrorProd(error, res);
    }else
    sendErrorProd(err, res);
  }
};
