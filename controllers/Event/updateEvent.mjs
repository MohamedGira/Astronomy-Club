import { Event } from "../../models/Events/Event.mjs"
import { AppError } from "../../utils/AppError.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs"
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
         return next( new AppError('400','invalid event id'))
    //adding new files
    if (req.files){

        try{
            //check if new images where added
            let keys=Object.keys(req.files)
            let imagesToAdd=keys.filter(el=>el.match(/event-image-\d+/))
            imagesToAdd.forEach(async image=>{
                event.images.push(await saveImage(req.files[image]))
            })
                    
                      
            //check for new banner
            if(req.files.banner){
                const banner=await saveImage(req.files.banner)
                deleteFile(event.banner,'images')
                event.banner=banner
            }
        }catch(err){
            console.log(`couldn't update event, imgs issue`)
            return next(new AppError(500),`image saving issue,${err.message}`)
        }   
    }

    let keys=Object.keys(req.body)
    let imagesTodelete=keys.filter( el =>el.match(/delete-image-*/))
    imagesTodelete.forEach(el=>{
        try{
            event.images=event.images.filter(item=>item!=req.body[el])
            deleteFile(req.body[el],'images')
        }
        catch(err){
            console.log(`image doesn't exist,${err.message}`)
        }
    })
    
    event.save()

    return res.status(200).json({
        messge:"object updated successfully",
        event
    })
}

)