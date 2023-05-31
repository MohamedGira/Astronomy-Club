import mongoose from "mongoose";
import { AppError } from "../utils/AppError.mjs";


const s= new  mongoose.Schema({
    isDeleted:{
        type: Boolean,
        default: false
    },
    deletedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    deletedAt:{
        type: Date,
    }
});

s.pre(/save/,async function(next){
    if(this.isDeleted){
        this.deletedAt = Date.now()
    }
    if(!this.deletedBy&&this.isDeleted)
        return next(new AppError(401,"Unauthoized Access to this action"))
    
    next()
});

export const elementStatusSchema =s;