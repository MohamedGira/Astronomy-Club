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
       oldImageName:{
        type:String,
        required:true,
      },
       image:{},
    }
)


SpeakerSchema.pre(/validate|save/i, async function(next) {
  if (!this.image)
    return next(new AppError(400,`Speaker image is required`))
  if (typeof this.image != 'string')
  try{
    //necessary for sharp module
    this.image.data=this.image.data.buffer

    this.image=await saveImage(this.image)
    //delete the old image from the system
    if(this.oldImageName!=this.image)
      deleteFile(this.oldImageName,'images')

    this.oldImageName=this.image
  }catch(err){
    return next(new AppError(500,`something went wrong ${err}`))
  }
  next()
});


SpeakerSchema.pre(/delete/i,async function(next){
  const doc = await this.model.findOne(this.getFilter())
  if(!doc)
    return next()
  deleteFile(doc.image,'images')
})


export const Speaker= mongoose.model('Speaker',SpeakerSchema)
