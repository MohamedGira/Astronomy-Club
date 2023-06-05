import winston from 'winston';
import { catchAsync } from './catchAsync.mjs';
import { getToken } from './getToken.mjs';
import jwt from 'jsonwebtoken';
import { promisify } from 'util';
export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({ filename: 'upload/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'upload/combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== 'prod') {
    
  logger.add(new winston.transports.Console({
    format: winston.format.combine(winston.format.timestamp(),winston.format.json()),
  }));
}

export const loggingMiddleware=catchAsync(async(req,res,next)=>{
  const token = getToken(req);
  let id='annoymous'
  
    if(token)
    {
      let decodedValues =  promisify(jwt.verify)(token, process.env.JWT_KEY)
      try{    
          decodedValues=await decodedValues
          id=decodedValues.id
      }catch(err){
      }  
    }
    
    logger.log({
      level: 'info',
      message: `${req.method} ${req.originalUrl} ${req.ip} ${id}`
    });
    next()
    
  
})