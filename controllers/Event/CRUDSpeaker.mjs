import { Speaker } from "../../models/Events/subSchemas/Speaker.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { saveImage, saveImageOld } from "../../utils/uploads/saveImage.mjs";
import * as factory from "../CRUDFactory.mjs";


// GET Speakers/
export const  getSpeakers= factory.getAll(Speaker)

// POST Speakers/
export const  addSpeaker= factory.CreateOne(Speaker)

// GET Speakers/:elementId 
export const  getSpeaker= factory.getOne(Speaker)

// PATCH Speakers/:elementId 
export const  updateSpeaker= factory.updateOne(Speaker,['image'],{executePre:[async (req,res,next)=>{
  let speaker=await Speaker.findById(req.params.elementId)
  if(!speaker)
    return next(new AppError(400,`No speaker found with that ID`))
  if(req.files&&req.files.image){
    speaker.image=await saveImage(req.files.image)
    speaker.save()
  }
}]})

// DELETE Speakers/:elementId
export const  deleteSpeaker= factory.deleteOne(Speaker)
