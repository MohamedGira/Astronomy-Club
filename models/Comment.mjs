import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const commentSchema = mongoose.Schema({
    content:String,
    by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },    
}, { timestamps: true });


  


export const Comment = mongoose.model("Comment", commentSchema);
