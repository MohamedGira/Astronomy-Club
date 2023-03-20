import path from "path";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { User } from "../../models/User.mjs";
import * as consts from "../../utils/consts.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { emailer } from "../../utils/mailSender.mjs";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



export const registerUser = async (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        username: req.body.username,
    });
    
    //creating confirmation JWT
    const confirmationToken = jwt.sign({}, process.env.CONFIRMATION_JWT_KEY, {
        expiresIn: consts.REGISTRATION_TIMEOUT_SECS,
    });
    user.confirmationToken = confirmationToken;
    
    await user.save();    //user is saved successfully


    //sending an email for the user
    try{
        await emailer.sendHTMLMail(
            req.body.email,
            "Reset Password",
            readFileSync(__dirname + "\\..\\..\\utils\\templates\\confirm_registration.html")
            .toString()
            .replace("{myJWT}", confirmationToken)
            .replace("{expiration_time}", consts.REGISTRATION_TIMEOUT_MINS)
        );
    }catch(err){
        //email wasn't sent, something went wrong, user is deleted
        await User.findOneAndDelete({email:user.email})
        next(new AppError(err.statusCode,'somthing went wrong :( try again'));
    }

    return res.status(200).json({
        message: "user created successfully",
    });
};

export const confirmRegisteration = async (req, res, next) => {
    const reqtoken = req.query.token;
    const user = await User.findOne({
        confirmationToken: reqtoken,
    });

    // no unconfirmed user with such token in the DB
    if (!user) {
        return next(new AppError(400, "invalid token"));
    }

    //user exists
    jwt.verify(
        user.confirmationToken,
        process.env.CONFIRMATION_JWT_KEY,
        async (err, decodedvalues) => {

        if (err) {
            //expired token
            await User.findByIdAndDelete(user._id);
            return next(new AppError(201, "request expired, register again"));
        } else {
            //token is valid
            await User.findOneAndUpdate(
            { _id: user._id },
            {  $unset: { confirmationToken:1 } , confirmed: true}
            )
            return res.status(200).json({ message: "resgistration confirmed" });
        }
        }
    );
};
