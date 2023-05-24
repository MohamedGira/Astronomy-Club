import jwt from 'jsonwebtoken';
import { promisify } from 'util'
import { User } from '../../../models/Users/User.mjs';
import { AppError } from '../../../utils/AppError.mjs';
import { getToken } from '../../../utils/getToken.mjs';
import { Database } from '../../../models/DbConnection.mjs';
import { catchAsync } from '../../../utils/catchAsync.mjs';


export const isAuthorizedMw = (...roles) => {
    return async (req, res, next) => {
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

//utilizes Singleton design pattern
export const RBACAutorizerMw= catchAsync( async (req, res, next) => {
    const token = getToken(req);
    if(!token)
        return next(new AppError(401, "unauthorized access to this endpoint, signin to continue"));
    let permissions=await Database.getPermissionsInstance()
    const decodedValues = await promisify(jwt.verify)(token, process.env.JWT_KEY)
    let user= await User.findById(decodedValues.id)
    if(!user)
        return next(new AppError(401, "no user exists with this id"));

        permissions=permissions.filter(el=>
        { 
         return   el.role.equals(user.role._id) && el.allowed && req.baseUrl.includes(el._doc.endpoint.url) && el._doc.endpoint.method==req.method
        })
    
    if (permissions.length==0)
        return next(new AppError(403, "0unauthorized access to this endpoint"));
        
    next()
    
})
