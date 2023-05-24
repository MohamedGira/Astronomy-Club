import mongoose from "mongoose";
import dotenv from "dotenv";
import { AppError } from "../../utils/AppError.mjs";

dotenv.config()


export const endpointSchema = mongoose.Schema({
    url: {
        type:String,
        required:true,
    },
    method: {
        type:String,
        required:true
    }
},
{ timestamps: true });
endpointSchema.pre("save", async function (next) {
    let exist=await Endpoint.findOne({url:this.url,method:this.method})
    if(exist)
        next(new AppError(400, "endpoint already exist"))
    next();
});

export const Endpoint = mongoose.model("Endpoint", endpointSchema);
