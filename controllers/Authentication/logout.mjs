import jwt from 'jsonwebtoken';
import { AppError } from '../../utils/AppError.mjs';
  
export const logout = (req, res, next) => {
    const token = req.cookies.jwt;
    //shouldn't reach such case
    if (!token) return next(new AppError(401, "Not authorized, token not available"));

    jwt.verify(token, process.env.JWT_KEY, (err, decodedvalues) => {
      if (err) return next(new AppError(401, "invalid token"));
      res.cookie("jwt", "", { maxAge: "1" }).redirect("/");
    });
};