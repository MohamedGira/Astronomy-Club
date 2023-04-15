import jwt from 'jsonwebtoken';
import { AppError } from '../../utils/AppError.mjs';
import { getToken } from '../../utils/getToken.mjs';
  
export const logout = (req, res, next) => {
    const token = getToken(req)
    //shouldn't reach such case
    if (!token) return next(new AppError(401, "Not authorized, token not available"));

    jwt.verify(token, process.env.JWT_KEY, (err, decodedvalues) => {
      if (err) return next(new AppError(401, "invalid token"));
      res.cookie("jwt", "", { maxAge: "1" }).status(200).json({message:"logged out"});
    });
};