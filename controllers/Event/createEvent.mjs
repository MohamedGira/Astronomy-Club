import { Event } from "../../models/Events/Event.mjs";
import path from "path";

import { fileURLToPath } from "url";
import { AppError } from "../../utils/AppError.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {createImageObject, imgdir, saveImage} from '../../utils/uploads/saveImage.mjs'
import { catchAsync } from "../../utils/catchAsync.mjs";
import { filterObj, jsonifyObj } from "../../utils/objOp.mjs";
import { createCheckpoint } from "./checkpoints/CRUDCheckpoint.mjs";
import { Checkpoint } from "../../models/Events/subSchemas/checkpoint.mjs";
import { createGatheringPoint } from "./gatheringPoints/CRUDGatheringPoints.mjs";
import { GatheringPoint } from "../../models/Events/subSchemas/gatheringPoint.mjs";
import { deleteFile } from "../../utils/uploads/cleanDir.mjs";
const relativeUploadPath= '../../upload'

/*  
    Title:String,
    Type:'trip','conference','online'
    description:String,
    banner:image,
    event-image-1:image,
    event-image-2:image,
    etc...  

    capacity:Number,
    price:Number,
    isVisible:Boolean,
    date:Date,
    location:{landmark: String, latitude:Number,longitude:Number},
    checkpoints:[
        {
        name:String
        description:String
        startsAt:type:Date
        endsAt:type:Date
        type: String: either 'speaker' or 'gathering'
        location:{landmark: String, latitude:Number,longitude:Number}
        //if of type speaker
        speaker:{
            name:String
            title:String,
            description:String,
            image: speakerx_image_field_name
            }
        },..
    ],
    gatheringPoints:[
    {
    from:Date,
    to:Date,
    location: {landmark: String, latitude:Number,longitude:Number}
    },...]
    */




export const createEvent=catchAsync( async (req,res,next)=>{
    
    const body=jsonifyObj(req.body)

    const filteredEvent=filterObj(body,Event.schema.paths,['images','checkpoints','gatheringPoints','banner'])
    //handling excluded fields

    const event=await Event.create(filteredEvent)
    

    if(body.checkpoints){
        //checkpoints exists
        try{
            for (let checkpoint in body.checkpoints){
                await createCheckpoint(body.checkpoints[checkpoint],event._id,req.files)
            }
        }
        catch(err){
            const del=await Event.findByIdAndDelete(event._id)
            console.log(`couldn\'t create event ${del.title}, checkpoints issue`)
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
            console.log(`couldn\'t create event ${del.title}, gathering points issues`)
            throw(err)
        }
    }

    if (req.files){
        const imgslist=[] 
        
        try{
            event.images=await Promise.all(req.files.images.map(async (el)=> { return await saveImage(el)}))
            imgslist.push(...req.files.images)
            event.banner= await saveImage(req.files.banner)
            await event.save()
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


