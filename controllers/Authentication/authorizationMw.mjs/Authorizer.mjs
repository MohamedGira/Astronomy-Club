import jwt from 'jsonwebtoken';
import { promisify } from 'util'
import { AppError } from '../../../utils/AppError.mjs';


export const isAuthorized = (role) => {
    return async (req, res, next) => {
        const token = req.cookies.jwt;
        const verifypromisfied = promisify(jwt.verify);
        try {
            const decodedValues = await verifypromisfied(token, process.env.JWT_KEY)
            if (decodedValues.role !== role)
                return next(new AppError(401, "unauthorized access to this endpoint"));
            next()
        }
        catch (err) {
            return next(new AppError(401, "unauthorized access to this endpoint, no signed in account"))
        }
    }
}

