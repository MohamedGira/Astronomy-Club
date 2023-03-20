import jwt from 'jsonwebtoken';
import { AppError } from '../../utils/AppError.mjs';

export const isLoggedIn = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) return next();
    return jwt.verify(token, process.env.JWT_KEY, (err, decodedvalues) => {
      if (err) {
        throw err;
      }
      if (decodedvalues.username)
        return next(new AppError(400, "a user is already logged in to this device"));
      else return next();
    });
  }