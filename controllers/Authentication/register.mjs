import path from "path";
import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import { fileURLToPath } from "url";
import { User } from "../../models/Users/User.mjs";
import * as consts from "../../utils/consts.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { emailer } from "../../utils/mailSender.mjs";
import { confirmfrontStr } from"../../utils/templates/templatesCombined.mjs"
import { bufferCompressor} from "../../utils/image/ImageCompression/compressor.mjs";
import { writeFile, writeFileSync } from "fs";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


async function saveImage(image){
//uploaded file is not image
if (image && !/^image/.test(image.mimetype))    
    throw new AppError('400','the provided file\'s extension is not a supported image type')

const imgdir=__dirname.replace(/\\/g,'/') + '/../../upload/images/'
const imgname= `${Date.now()}${parseInt(Math.random()*1000).toString()}${image.mimetype.replace('image/','.')}`

//compressing the image
const compressedImg=await bufferCompressor.compressImageBuffer(image.data)

//saving the compressed image
writeFileSync(imgdir+imgname,compressedImg, "binary")
return imgname

}

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
    
    //user uploaded profileImage     
    if (req.files)
    {
    const  image  = req.files.profileImage;
    const img=await saveImage(image)
    user.profileImage=img
    }
    await user.save();    //user is saved successfully

    //sending an email for the user
    try{
        await emailer.sendHTMLMail(
            req.body.email,
            "Confirm Registration",
            confirmfrontStr
            .replace("{myJWT}", confirmationToken)
            .replace("{expiration_time}", consts.REGISTRATION_TIMEOUT_MINS)
            .replace("{targetUrl}",req.protocol + '://' + req.get('host'))
        );
    }catch(err){
        console.log(err)
        //email wasn't sent, something went wrong, user is deleted
        await User.findOneAndDelete({email:user.email})
        return next(new AppError(err.statusCode,'somthing went wrong :( try again'));
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
            return next(new AppError(401, "request expired, register again"));
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
