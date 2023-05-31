import { AppError, Errorlist } from "../utils/AppError.mjs";
import { logger } from "../utils/logger.mjs";



const sendErrorDev = (err,req, res) => {
    if ( String(err.statusCode).match(/^5/))
       {
        let id=req.user?req.user.id:'annoymous'
        logger.log({
          level: 'error',
          message: `${req.method} ${req.originalUrl} ${req.ip} ${id}. Error: ${err}`
        });  

        console.error("Error: ", err);
       }
  return res.status(err.statusCode).json({
    status: Errorlist[err.statusCode]|| err.status,
    message: err.message,
  });
};

const sendErrorProd = (err,req, res) => {
  if (!err.isOperational){
    let id=req.user?req.user.id:'annoymous'
        logger.log({
          level: 'error',
          message: `${req.method} ${req.originalUrl} ${req.ip} ${id}. Error: ${err}`
        });  

        console.error("Error: ", err);
  }
  return res.status(err.statusCode).json({
    status: err.status,
    statusCode: err.statusCode,
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


//
export const ErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Server Error";
  err.message = err.message || "sorry somthing went wrong :(";
  
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err,req, res);
  } else {
  
    //handling DB errors in production
    var error = { ...err };
    if (err.name === "CastError") {
      error = handleCastErrorDb(error);
      sendErrorProd(error,req, res);
    } else if (err.code === 11000) {
      error = handleDublicateFieldDb(error);
      sendErrorProd(error,req, res);
    } else if (err.name === "ValidationError") {
      error = handleValidationErrorDb(error);
      sendErrorProd(error,req, res);
    } else sendErrorProd(err,req, res);
  }
};

