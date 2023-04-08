import { Event } from "../../models/Events/Event.mjs"
import { AppError } from "../../utils/AppError.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs"
import { filterObj, jsonifyObj } from "../../utils/objOp.mjs";
import { createImageObject } from "../../utils/uploads/saveImage.mjs";
import { createGatheringPoint } from "./gatheringPoints/CRUDGatheringPoints.mjs";





export const updateEvent= catchAsync( async (req,res,next)=>{
    const id=req.params.id
    const body=jsonifyObj(req.body)
    const update=filterObj(req.body,Event.schema.paths,['images','checkpoints','gatheringPoints','banner'])
    var event=await  Event.findByIdAndUpdate(id,update,{new: true})
    if(!event)
         return next(AppError('400','invalid event id'))
    //adding new files
    if (req.files){
        
        try{
            //check if new images where added
            let keys=Object.keys(req.files)
            for(let i in keys){
                if (keys[i].match(/event-image-\d+/)){
                    event.images.push(await createImageObject(req.files[keys[i]]))
                }
            }            
            //check for new banner
            if(req.files.banner){
                const banner=await createImageObject(req.files.banner)
                event.banner=banner
            }
        }catch(err){
            console.log(`couldn't update event, imgs issue`)
            return next(new AppError(500),'image saving issue'+err.message)
        }   
    }

    let keys=Object.keys(req.body)
    for(let i in keys){
        if (keys[i].match(/delete-image-*/)){
            try{
                event.images=event.images.filter(item=>item._id==req.body[keys[i]])
            }
            catch(err){
                console.log(`image doesn't exist,${err.message}`)
            }
        }
    }
    event.save()

    return res.status(200).json({
        messge:"object updated successfully",
        event
    })
}

)