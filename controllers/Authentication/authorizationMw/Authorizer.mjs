import jwt from 'jsonwebtoken';
import { promisify } from 'util'
import { User } from '../../../models/Users/User.mjs';
import { AppError } from '../../../utils/AppError.mjs';
import { getToken } from '../../../utils/getToken.mjs';
import { Database } from '../../../models/DbConnection.mjs';
import { catchAsync } from '../../../utils/catchAsync.mjs';
import { Permission } from '../../../models/Permissions/Permission.mjs';


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
export const RBACAutorizerMw=  async function RBACAutorizerMw (req, res, next) {
    try{
    const token = getToken(req);
    if(!token)
        {
            return next(new AppError(401, "No token provided, Signin to continue"));
        }

    let decodedValues =  promisify(jwt.verify)(token, process.env.JWT_KEY)
    try{    
        decodedValues=await decodedValues
    }catch(err){
        return next(new AppError(401, err.message));
    }
    let user= await User.findById(decodedValues.id)
    if(!user)
        return next(new AppError(401, "Can't sign in with this user,contact adminstatration if you think this is a mistake"));
    req.user=user
    let regex=/^[a-f\d]{24}$/i
    let url=req.originalUrl.split('?')[0].split('/').filter((el)=>{return el!=''&&!regex.test(el)}).join('/')
    //console.log(url)
    let permission= await Permission.findOne({url:{$in:[`/${url}`,`/${url}/`]},role:user.role._id})
    if (!permission)
        return next(new AppError(401, "protected endpoint with no permission for this role"));
    if(!permission.allowed)
        {   
            console.log(permission)
            return next(new AppError(403, permission.errorMessage||"unauthorized access to this endpoint"+`${req.baseUrl}`));
        }
    //console.log(permission.friendlyName)
    
    return next()
}catch(err){
    return next(new AppError(500, err.message));
}
}



