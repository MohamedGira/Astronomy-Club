import path from "path";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { fileURLToPath } from "url";
import { AppError } from "../../utils/AppError.mjs";
import { emailer } from "../../utils/mailSender.mjs";
import { User } from "../../models/User.mjs";
import bcrypt from "bcrypt";
import * as consts from "../../utils/consts.mjs";
import { readFileSync } from "fs";
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
    
    await emailer.sendHTMLMail(
    email,
    "Reset Password",
    readFileSync(__dirname + "\\..\\..\\utils\\templates\\reset_password.html")
    .toString()
    .replace("{myJWT}", resetToken)
    .replace("{expiration_time}", consts.PASSWORD_RESET_TIMEOUT_MINS)
    .replace("{targetUrl}",req.protocol + '://' + req.get('host'))
    );

    return res.status(200).json({
        message: "check your email to reset password",
    });
    
  };

export const changePassword = async (req, res, next) => {
    const newPassword = req.body.password;
    const confirm_newPassword = req.body.confirm_password;
    const confirmationToken = req.body.token;

    jwt.verify(
        confirmationToken,
        process.env.RESET_JWT_KEY,
        async (err, decodedvalues) => {
        if (err) 
            return next(new AppError(401, "token Expired"));

        const user = await User.findOne({email: decodedvalues.email}).select('+password');

        if (user.password === decodedvalues.password) {
            user.password=newPassword
            user.passwordConfirm=confirm_newPassword
            try{
                await user.save()
            }catch(err){
                //new password had some violations
                return next(err)
            }

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
