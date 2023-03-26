import jwt from 'jsonwebtoken';
import { promisify } from 'util'
import { User } from '../../../models/Users/User.mjs';
import { AppError } from '../../../utils/AppError.mjs';


export const isAuthorizedMw = (...roles) => {
    return async (req, res, next) => {
        const token = req.cookies.jwt;

        try {
            const decodedValues = await promisify(jwt.verify)(token, process.env.JWT_KEY)
            //meh
            if(!await User.findById(decodedValues.id))
                return next(new AppError(401, "no user exists with this id"));
                
            if (!roles.includes(decodedValues.role))
                return next(new AppError(403, "unauthorized access to this endpoint"));
            next()
        }
        catch (err) {
            return next(new AppError(403, "unauthorized access to this endpoint, no signed in account"))
        }
    }
}

export const isAuthorized = async(req,...roles) => {    
        if (!req.cookies)
            return false
        const token = req.cookies.jwt;
        
        try {
            const decodedValues = await promisify(jwt.verify)(token, process.env.JWT_KEY)                
            if (roles.includes(decodedValues.role))
                return true
            return false
        }
        catch (err) {
            return false
        }
}

