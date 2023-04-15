import { Event } from "../../../models/Events/Event.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";
import { filterObj, jsonifyObj } from "../../../utils/objOp.mjs";
import { createCheckpoint } from "../CRUDCheckpoint.mjs";
import { createGatheringPoint } from "../CRUDGatheringPoints.mjs";
import { deleteFile } from "../../../utils/uploads/cleanDir.mjs";
import { saveImage} from '../../../utils/uploads/saveImage.mjs'

export const createEvent=catchAsync( async (req,res,next)=>{
    
    const body=jsonifyObj(req.body)

    const filteredEvent=filterObj(body,Event.schema.paths,['images','checkpoints','gatheringPoints','banner'])
    //handling excluded fields
    const event=await Event.create(filteredEvent)

    if(body.checkpoints){
        //checkpoints exists
        try{
            for (let checkpoint in body.checkpoints){
                await createCheckpoint(body.checkpoints[checkpoint],event._id)
            }
        }
        catch(err){
            const del=await Event.findByIdAndDelete(event._id)
            console.log(`couldn\'t create event ${del.title}, checkpoints issue: ${err}`)
            throw(err)
        }
    }
    if(body.gatheringPoints){
         //gathering points exists
         try{
             for (let gatheringpoint in body.gatheringPoints){
                 await createGatheringPoint(body.gatheringPoints[gatheringpoint],event._id,req.files)
            }
        }
        catch(err){
            const del=await Event.findByIdAndDelete(event._id)
            console.log(`couldn\'t create event ${del.title}, gathering points issues ${err}`)
            throw(err)
        }
    }

    if (req.files){
        const imgslist=[] 
        try{
        console.log(req.files,req.files.banner,req.files,images)
        if (req.files.banner)
            event.banner= await saveImage(req.files.banner)
            if(req.files.images){
            event.images=await Promise.all(req.files.images.map(async (el)=> { return await saveImage(el)}))
            imgslist.push(...req.files.images)
            await event.save()
        }
        }catch(err){
            await Event.findByIdAndDelete(event._id)
            console.log(`couldn\'t create event, imgs issue`)
            imgslist.forEach(el=>deleteFile(el,'images'))
            return next(new AppError(500,'image saving issue'+err.message))
        }   
    }
 
    
    
    return res.status(200).json({
        message:"event created successfully",
        event
    });

})


