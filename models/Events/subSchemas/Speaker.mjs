import mongoose from'mongoose'

import { deleteFile } from '../../../utils/uploads/cleanDir.mjs';
import { saveImage } from '../../../utils/uploads/saveImage.mjs';
import { AppError } from '../../../utils/AppError.mjs';
import { elementStatusSchema } from '../../elementsStatus.mjs';

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
       
      elementStatus: {type:elementStatusSchema,default:{}},
      image:{type:String,
             required:true
            },
    }
)





SpeakerSchema.pre(/delete/i,async function(next){
  const doc = await this.model.findOne(this.getFilter())
  if(!doc)
    return next()
  deleteFile(doc.image,'images')
})


export const Speaker= mongoose.model('Speaker',SpeakerSchema)
