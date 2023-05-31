import { Event } from "../../../models/Events/Event.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";
import { filterObj, jsonifyObj } from "../../../utils/objOp.mjs";
import { createCheckpoint } from "../CRUDCheckpoint.mjs";
import { createGatheringPoint } from "../CRUDGatheringPoints.mjs";
import { deleteFile } from "../../../utils/uploads/cleanDir.mjs";
import { saveImage} from '../../../utils/uploads/saveImage.mjs'
import * as factory from "../../CRUDFactory.mjs";
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
        req.files=filterObj(req.files,Event.schema.paths)
        const imgslist=[] 
        try{
            for (let key in req.files){
                console.log(key)
                console.log()
                if(Event.schema.paths[key].instance=='Array'){
                    if(!Array.isArray(req.files[key]))
                        req.files[key]=[req.files[key]]
                    let imgs=[]
                    for (let img in req.files[key])
                        {
                        let imgname=await saveImage(req.files[key][img])
                        event[key].push(imgname)
                        imgslist.push(imgname)
                        }
                }else if(Event.schema.paths[key].instance=='String'){
                    event[key]= await saveImage(req.files[key])
                    imgslist.push(event[key])
                }
                await event.save()                    
            }
        }catch(err){
            await Event.findByIdAndDelete(event._id)
            console.log(`couldn\'t create event, imgs issue`)
            return next(new AppError(500,'image saving issue: '+err.message))
        }   
    }
 
    
    
    return res.status(200).json({
        message:"event created successfully",
        event
    });

})
export const createEvent2=factory.CreateOne(Event,['checkpoints','gatheringPoints'])


