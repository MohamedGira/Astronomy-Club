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
        const decodedValues= await verifypromisfied (token, process.env.JWT_KEY)
        
        if (!decodedValues.email)
            return next(new AppError(401, "invalid request"));
        const user=await User.findOne({email:decodedValues.email}).populate('role')
        if (user.role.role!==role)
            return next(new AppError(401, "unauthorized access to this endpoint"));
        next()
        })
    }
    
