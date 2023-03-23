import jwt from 'jsonwebtoken';
import mongoose from'mongoose'
import { User } from '../../../models/User.mjs';
import { UserRole } from '../../../models/UserType.mjs';
import {promisify} from 'util'
import {catchAsync} from "../../../utils/catchAsync.mjs";
import { AppError } from '../../../utils/AppError.mjs';


export const isAuthorized= (role)=>{
    return   catchAsync (async (req,res,next)=>{
        const token = req.cookies.jwt;
        const verifypromisfied=promisify (jwt.verify);
        try{
        const decodedValues= await verifypromisfied (token, process.env.JWT_KEY)

        //unnecessary logic
        if (!decodedValues.email)
            return next(new AppError(401, "invalid request"));
        //refactoring: too much overhead, just use the role provided in the jwt
        //const user=await User.findOne({email:decodedValues.email}).populate('role')
        //if (user.role.role!==role)
        if (decodedValues.role!==role)
            return next(new AppError(401, "unauthorized access to this endpoint"));
        next()
         }
        catch(err){
            return next(new AppError(401, "unauthorized access to this endpoint"))
        }
        })
    }
    
