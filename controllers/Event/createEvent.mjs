import { Event } from "../../models/Events/Event.mjs";
import path from "path";

import { writeFile, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { AppError } from "../../utils/AppError.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {saveImage} from '../../utils/image/saveImage.mjs'
import { catchAsync } from "../../utils/catchAsync.mjs";
import { filterObj, jsonifyObj } from "../../utils/objOp.mjs";
import { createCheckpoint } from "./checkpoints/CRUDCheckpoint.mjs";
import { Checkpoint } from "../../models/Events/subSchemas/checkpoint.mjs";
/*  
    Title:String,
    Type:{
        type:String,
        enum:['trip','conference','online']
    },
    description:String,
    banner:String,
    images:[String],
    capacity:Number,
    price:Number,
    isVisible:Boolean,
    date:Date,
    location:LocationSchema,
    checkpoints:[CheckpointSchema],
    gatheringPoints:[GatheringPointSchema] */




export const createEvent=catchAsync( async (req,res,next)=>{
    const bannerFieldname=req.body.banner||''
    const imgsArrName=req.body.images||[]

    
    
    const body=jsonifyObj(req.body)
    const filteredEvent=filterObj(body,Event.schema.paths)
    const event=await Event.create(filteredEvent)
    if(body.checkpoints){
        //checkpoints exists
        try{
        for (let checkpoint in req.body.checkpoints){
            await createCheckpoint(req.body.checkpoints[checkpoint],event._id,req.files)
        }
        }
        catch(err){
            const del=await Event.findByIdAndDelete(event._id)
            console.log(`couldn\'t create event ${del.title}`)
            throw(err)
        }
    }

    
    return res.status(200).json({
        message:"event created successfully",
        event
    });

})

