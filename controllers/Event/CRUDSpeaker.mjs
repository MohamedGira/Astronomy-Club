import { Speaker } from "../../models/Events/subSchemas/Speaker.mjs";
import * as factory from "../CRUDFactory.mjs";



export const  createSpeaker=async (unfilteredBody,reqfiles=undefined)=>{
  unfilteredBody=jsonifyObj(unfilteredBody)  
  const speaker=filterObj(unfilteredBody,Speaker.schema.paths)
  if(!reqfiles||!reqfiles[speaker.image])
      throw new AppError(400,'Speaker must have an image')
speaker.image=reqfiles[speaker.image]
return  Speaker.create(speaker)
}

// GET Speakers/
export const  getSpeakers= factory.getAll(Speaker)

// POST Speakers/
export const  addSpeaker= factory.CreateOne(Speaker)

// GET Speakers/:elementId 
export const  getSpeaker= factory.getOne(Speaker)

// PATCH Speakers/:elementId 
export const  updateSpeaker= factory.updateOne(Speaker)

// DELETE Speakers/:elementId
export const  deleteSpeaker= factory.deleteOne(Speaker)
