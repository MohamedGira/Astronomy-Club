import path, { relative } from "path";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { fileURLToPath } from "url";
import { AppError } from "../../utils/AppError.mjs";
import { emailer } from "../../utils/mailSender.mjs";
import { User } from "../../models/Users/User.mjs";
import { getResetTemplate } from "../../utils/templates/templatesCombined.mjs"
import * as consts from "../../utils/consts.mjs";
import { appendFile, fstat, readFileSync } from "fs";
import bcrypt from "bcrypt";
import { promisify } from "util";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { getToken } from "../../utils/getToken.mjs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export const resetPassword = async (req, res, next) => {
    const email = req.body.email;
    const user = await User.findOne({ email: email }).select('+password');

    if (!user) 
      return next(new AppError(400, "invalid email"));

    
    if (!user.confirmed) 
        return next(new AppError(401, "Account is not confirmed,rerigester later"));
    

    const resetToken = jwt.sign(
      { email: email, password: user.password },
      process.env.RESET_JWT_KEY,
      { expiresIn: consts.PASSWORD_RESET_TIMEOUT_SECS }
    );
    
    await emailer.sendResetPassword(email,
        'resetPasswordNew',
        {url:`${req.headers.referrer || req.headers.referer}/auth/new-password?targetUrl=${resetToken}
        &email=${encodeURIComponent(email)}`},'Astronomy Club')

    return res.status(200).json({
        message: "check your email to reset password",
    });
    
  };

//called from the email
export const changePassword = async (req, res, next) => {
    const newPassword = req.body.password;
    const confirm_newPassword = req.body.confirm_password;
    const confirmationToken = req.body.token;
    console.log(confirmationToken)
    jwt.verify(
        confirmationToken,
        process.env.RESET_JWT_KEY,
        async (err, decodedvalues) => {
        if (err) 
            return next(new AppError(401, err.message));

        const user = await User.findOne({email: decodedvalues.email}).select('+password');

        if (user.password === decodedvalues.password) {
            
            if (newPassword!= confirm_newPassword)
                return next(new AppError(400, "passwords doesn't match"));
            user.password =  bcrypt.hash(
            newPassword,
            parseInt(process.env.HASH_SALT)
            )
            
            await user.save()
          
            return res.status(200).json({
                message: "password changed succesfully",
            });
        } else {    
            return res.status(200).json({
            message: "password has already been changed once",
            });
        }
        }
    );
};

//called from within
export const updatePassword =catchAsync (async (req, res, next) => {
    
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;
    var token = getToken(req);
    if(!token)
        return next(new AppError(401, "no signed in user"))
    const decodedValues = await promisify(jwt.verify)(token, process.env.JWT_KEY)
    const user=await User.findById(decodedValues.id).select('+password')
    if(!user)
        return next(new AppError(401,'invalid user id'))
    if(! await bcrypt.compare(oldPassword, user.password))
        return next(new AppError(400,'invalid old password'))
    if (newPassword!= confirmPassword)
        return next(new AppError(400, "passwords doesn't match"));

    user.password =  await bcrypt.hash(
    newPassword,
    parseInt(process.env.HASH_SALT)
    );
    
    await user.save()
    
    token =  jwt.sign(
        { id: user._id, role: user.role.name, username: `${user.firstName} ${user.lastName}` ,email:user.email},
        process.env.JWT_KEY,
        { expiresIn: consts.LOGIN_TIMEOUT_SECS }
        );  
    return res
    .status(200)
    .json({
            message: "password changed successfully",
            user: user._id,
            accessToken:token
    });
})