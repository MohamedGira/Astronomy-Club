import mongoose from'mongoose'

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
SpeakerSchema.pre(/delete/i,async function(next){
  const doc = await this.model.findOne(this.getFilter())

  deleteFile(doc.image,'images')
  next()
})


export const Speaker= mongoose.model('Speaker',SpeakerSchema)
