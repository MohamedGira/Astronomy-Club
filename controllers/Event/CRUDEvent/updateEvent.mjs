import { Event } from "../../../models/Events/Event.mjs"
import { AppError } from "../../../utils/AppError.mjs";

import { maxImagesPerEvent } from "../../../utils/consts.mjs";
import { jsonifyObj } from "../../../utils/objOp.mjs";
import { deleteFile } from "../../../utils/uploads/cleanDir.mjs";
import { saveImage } from "../../../utils/uploads/saveImage.mjs";
import {factory} from "../../CRUDFactory/package.mjs";






export const updateEvent2=factory.updateOne(Event,['images','banner','checkpoints','gatheringPoints'],{
    executePre:[async function saveImages (req,res,next){
        const id=req.params.elementId
        const body=jsonifyObj(req.body)
        var event=await  Event.findById(id)
    
        if(!event)
             return next( new AppError(400,'invalid event id'))
       
        //adding new images
        let delcount=0
        let addcount=0
        if(body.delete)
            delcount=body.delete.length
        if (req.files)
            addcount=req.files.images.length
        if(event.images.length+addcount-delcount>maxImagesPerEvent)
             return next( new AppError(400,`maximum limit of ${maxImagesPerEvent} exceeded`))
    
        let imgsToDeleteFS=[]
        if (req.files){
            let imgslist=[]
            try{
                
                //check if new images where added
                if(req.files.images){
                if(!Array.isArray(req.files.images))
                    req.files.images=[req.files.images]
                let savedImages=await Promise.all(req.files.images.map(async (el)=> { return await saveImage(el)}))
                event.images.push(...savedImages)
                imgslist.push(...req.files.images)
                }        
                //check for new banner
                if(req.files.banner){
                    const banner=await saveImage(req.files.banner)
                    imgsToDeleteFS.push(event.banner)
                    event.banner=banner     
                }
            }catch(err){
                console.log(`couldn't update event, images issue`)
                return   next(new AppError(500,`image saving issue,${err.message}`))
            }
        }

        //deleting images
        if(body.delete){
        let imagesTodelete=body.delete;
        if(!Array.isArray(imagesTodelete))
            imagesTodelete=[imagesTodelete]
        try{
            event.images=event.images.filter(item=>!imagesTodelete.includes(item))
            imgsToDeleteFS.concat(imagesTodelete)
        }
        catch(err){
            console.log(`image doesn't exist,${err.message}`)
        }


        imgsToDeleteFS.forEach(el=>deleteFile(el,'images'))
        req.files=undefined        

    }
    await event.save()
}]
}
)