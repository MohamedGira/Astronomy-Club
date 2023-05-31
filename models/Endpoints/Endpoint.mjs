import mongoose from "mongoose";
import dotenv from "dotenv";
import { AppError } from "../../utils/AppError.mjs";

dotenv.config()
import { elementStatusSchema } from '../elementsStatus.mjs'


export const endpointSchema = mongoose.Schema({
    url: {
        type:String,
        required:true,
        unique:true
    },
});




export const Endpoint = mongoose.model("Endpoint", endpointSchema);
