import mongoose from'mongoose'
import { Checkpoint } from './checkpoint.mjs';
import { imageSchema } from '../../image.mjs';

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
        type:imageSchema,
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
  