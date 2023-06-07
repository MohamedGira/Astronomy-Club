import { Speaker } from "../../models/Events/subSchemas/Speaker.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { deleteFile } from "../../utils/uploads/cleanDir.mjs";
import { saveImage } from "../../utils/uploads/saveImage.mjs";
import { factory } from "../CRUDFactory/package.mjs";



// GET Speakers/
export const  getSpeakers= factory.getAll(Speaker)

// POST Speakers/
export const  addSpeaker= factory.createOne(Speaker)

// GET Speakers/:elementId 
export const  getSpeaker= factory.getOne(Speaker)

// PATCH Speakers/:elementId 
export const  updateSpeaker= factory.updateOne(Speaker,['image'],{executePre:[async (req,res,next)=>{
  let speaker=await Speaker.findById(req.params.elementId)
  if(!speaker)
    return next(new AppError(400,`No speaker found with that ID`))
  if(req.files&&req.files.image){
    let oldImage=speaker.image
    speaker.image=await saveImage(req.files.image)
    deleteFile(oldImage,'images')
    await speaker.save()
  }
}]})

// DELETE Speakers/:elementId
export const  deleteSpeaker= factory.deleteOne(Speaker)
