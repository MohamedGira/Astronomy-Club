import mongoose from'mongoose'
import { Checkpoint } from './checkpoint.mjs';
import { imageSchema } from '../../image.mjs';
import { saveImage } from '../../../utils/uploads/saveImage.mjs';
import { AppError } from '../../../utils/AppError.mjs';
import { deleteFile } from '../../../utils/uploads/cleanDir.mjs';

export const SpeakerSchema=mongoose.Schema(
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
        required:true
       },
      
    }
)
SpeakerSchema.pre(/delete/,function(){
  deleteFile(this.image)
})


export const Speaker= mongoose.model('Speaker',SpeakerSchema)
