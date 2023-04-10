import mongoose from'mongoose'

import { deleteFile } from '../../../utils/uploads/cleanDir.mjs';
import { saveImage } from '../../../utils/uploads/saveImage.mjs';
import { AppError } from '../../../utils/AppError.mjs';

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
       image:{},
       
    }
)


SpeakerSchema.pre('validate', async function(next) {
  console.log( await Speaker.findById(this._id))
  if (typeof this.image != 'String')

  try{
    this.image=await saveImage(this.image)
  }catch(err){
    return next(new AppError(500,`something went wrong ${err.message}`))
  }
  
  next()
});



SpeakerSchema.pre(/delete/i,async function(next){
  const doc = await this.model.findOne(this.getFilter())

  deleteFile(doc.image,'images')
  next()
})


export const Speaker= mongoose.model('Speaker',SpeakerSchema)
