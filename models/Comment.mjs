import mongoose from "mongoose";
import dotenv from "dotenv";
import { elementStatusSchema } from "./elementsStatus.mjs";

dotenv.config()

const commentSchema = mongoose.Schema({
    
    content:{
        type:String,
        required:true,
        validate:{
            validator: async function(content){
                if(content.trim().length==0)
                    return false
                return true
            },
            message:`can't add empty comment`
        }    
    },
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },    
    history:[],
    deleted:{
        type:Boolean,
        default:false
    },
    elementStatus: {type:elementStatusSchema,default:{}},
}, { timestamps: true });




export const Comment = mongoose.model("Comment", commentSchema);
