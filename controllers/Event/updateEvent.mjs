import { Event } from "../../models/Events/Event.mjs"
import { AppError } from "../../utils/AppError.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs"
import { maxImagesPerEvent } from "../../utils/consts.mjs";
import { filterObj, jsonifyObj } from "../../utils/objOp.mjs";
import { deleteFile } from "../../utils/uploads/cleanDir.mjs";
import { createImageObject, saveImage } from "../../utils/uploads/saveImage.mjs";
import { createGatheringPoint } from "./gatheringPoints/CRUDGatheringPoints.mjs";





export const updateEvent= catchAsync( async (req,res,next)=>{
    const id=req.params.id
    const body=jsonifyObj(req.body)
    const update=filterObj(req.body,Event.schema.paths,['images','checkpoints','gatheringPoints','banner'])
    var event=await  Event.findByIdAndUpdate(id,update,{new: true})
    
    if(!event)
         return next( new AppError(400,'invalid event id'))
    //adding new files
    
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
            event.images.push(...(await Promise.all(req.files.images.map(async (el)=> { return await saveImage(el)}))))
            imgslist.push(...req.files.images)
             }        
            //check for new banner
            if(req.files.banner){
                const banner=await saveImage(req.files.banner)
                imgsToDeleteFS.push(event.banner)
                event.banner=banner     
            }
        }catch(err){
            console.log(`couldn't update event, imgs issue`)
            return   next(new AppError(500,`image saving issue,${err.message}`))
        }
    }

    if(body.delete){
    let imagesTodelete=body.delete;
    imagesTodelete.forEach(el=>{
        try{
            event.images=event.images.filter(item=>item!=el)
            imgsToDeleteFS.push(el)
        }
        catch(err){
            console.log(`image doesn't exist,${err.message}`)
        }
    })
    }
    
    await event.save()
    imgsToDeleteFS.forEach(el=>deleteFile(el,'images'))

    return res.status(200).json({
        messge:"object updated successfully",
        event
    })
}

)