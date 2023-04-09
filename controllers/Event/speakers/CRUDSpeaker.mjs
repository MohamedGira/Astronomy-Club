import { Speaker } from "../../../models/Events/subSchemas/Speaker.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import {filterObj, jsonifyObj} from "../../../utils/objOp.mjs"
import { createImageObject, saveImage} from "../../../utils/uploads/saveImage.mjs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const relativePathtoUploads='/../../../upload/images/'

export const  createSpeaker=async (unfilteredBody,reqfiles=undefined)=>{
    unfilteredBody=jsonifyObj(unfilteredBody)
    
    const speaker=filterObj(unfilteredBody,Speaker.schema.paths)
    if(!reqfiles||!reqfiles[speaker.image])
        throw new AppError(400,'Speaker must have an image')

  speaker.image=await(saveImage(reqfiles[speaker.image]))
  return  Speaker.create(speaker)
}
