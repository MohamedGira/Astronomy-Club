import jwt from 'jsonwebtoken';
import { promisify } from 'util'
import { User } from '../../../models/Users/User.mjs';
import { AppError } from '../../../utils/AppError.mjs';
import { getToken } from '../../../utils/getToken.mjs';


export const isAuthorizedMw = (...roles) => {
    return async (req, res, next) => {
        console.log(req)
        const token = getToken(req);

        try {
            const decodedValues = await promisify(jwt.verify)(token, process.env.JWT_KEY)
            //meh
            if(!await User.findById(decodedValues.id))
                return next(new AppError(401, "no user exists with this id"));
                
            if (!roles.includes(decodedValues.role)&&decodedValues.role!='SystemAdmin')
                return next(new AppError(403, "unauthorized access to this endpoint"));
                
            next()
        }
        catch (err) {
            return next(new AppError(403, "unauthorized access to this endpoint, no signed in account"))
        }
    }
}

export const isAuthorized = async(req,...roles) => {  
        const token = getToken(req);  
        if (!token)
            return false
        
        try {
            const decodedValues = await promisify(jwt.verify)(token, process.env.JWT_KEY)                
            if (roles.includes(decodedValues.role)||decodedValues.role=='SystemAdmin')
                return true
            return false
        }
        catch (err) {
            return false
        }
}

export const RBACAutorizerMw= async (req)=>{
    
}