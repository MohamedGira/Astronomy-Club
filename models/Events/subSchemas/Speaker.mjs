import mongoose from'mongoose'
import { Checkpoint } from './checkpoint.mjs';

export const speakerSchema=mongoose.Schema(
    {
       name:{
        type:String,
        required:true,
       },
       title:{
        type:String,
        required:true,
       },
       description:{
        type:String,
        required:true,
       },
       image:{
        type:String,
        required:true,
       }
        
    }
)

export const Speaker= mongoose.model('Speaker',speakerSchema)

speakerSchema.pre("save", async function (next) {
    const checkpoint=Checkpoint.find({_id:this.checkpoint})
    
    if(!checkpoint)
      return next(new AppError(400, "invalid Checkpoint id, couldn't create user"));
    next()
  });
  