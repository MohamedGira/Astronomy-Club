
import mongoose from "mongoose";
export const  imageSchema = new mongoose.Schema({
    name: String,
    desc: String,
    img:
    {
        data: Buffer,
        contentType: String
    }
});
 
export const Image= mongoose.model('Image', imageSchema);