import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { User } from '../../models/Users/User.mjs';
import { AppError } from '../../utils/AppError.mjs';
import { catchAsync } from '../../utils/catchAsync.mjs';
import { getToken } from '../../utils/getToken.mjs';

export const alreadyLoggedIn = (req, res, next) => {
    var token =getToken(req);
    
    
    //const token = req.cookies.jwt;
    if (!token) return next();
    return jwt.verify(token, process.env.JWT_KEY, (err, decodedvalues) => {
      if (err) {
        //jwt expired
        return next()
      }
      if (decodedvalues.username)
        return next(new AppError(401, "a user is already logged in to this device"));
      else return next();
    });
}


export const protect =catchAsync(async (req, res, next) => {
  var token=getToken(req);  
  
  if (!token)
    return next(new AppError(401, "signin to continue"));
  
  const decodedvalues=await promisify( jwt.verify)(token, process.env.JWT_KEY)
  const user= await User.findById(decodedvalues.id)
  if(!user){
    return next(new AppError(401, "user with this token no longer exists"));
  }
  req.user=user
  next()
})