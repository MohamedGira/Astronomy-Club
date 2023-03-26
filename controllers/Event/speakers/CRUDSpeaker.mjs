import { Speaker } from "../../../models/Events/subSchemas/Speaker.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import {filterObj, jsonifyObj} from "../../../utils/objOp.mjs"
import { saveImage } from "../../../utils/image/saveImage.mjs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const relativePathtoUploads='/../../../upload/images/'

export const  createSpeaker=async (unfilteredBody,Checkpointid,reqfiles=undefined)=>{
    unfilteredBody=jsonifyObj(unfilteredBody)
    //console.log(unfilteredBody)
    const speaker=filterObj(unfilteredBody,Speaker.schema.paths)
    if(!speaker.image)
        throw new AppError(400,'Speaker must have an image')
   // const img= await saveImage(reqfiles[`${speaker.image}`],__dirname+relativePathtoUploads)
   // speaker.image=img
    return  Speaker.create({...speaker,checkpoint:Checkpointid})
}
