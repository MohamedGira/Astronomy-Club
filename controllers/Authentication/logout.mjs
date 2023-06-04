import jwt from 'jsonwebtoken';
import { AppError } from '../../utils/AppError.mjs';
import { getToken } from '../../utils/getToken.mjs';
  
export const logout = (req, res, next) => {
    const token = getToken(req)
    //shouldn't reach such case
    if (!token) return next(new AppError(401, "Not authorized, token not available"));

    jwt.verify(token, process.env.JWT_KEY, (err, decodedvalues) => {
      if (err) return next(new AppError(401, "logout failed invalid token"));
      return res.status(200).json({message:"logged out"});
    });
};