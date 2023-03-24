import { Event } from "../../../models/Events/Event.mjs";
import path from "path";

import { writeFile, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { AppError } from "../../../utils/AppError.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import {saveImage} from '../../../utils/image/saveImage.mjs'
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
    visibility:Boolean,
    date:Date,
    location:LocationSchema,
    checkpoints:[CheckpointSchema],
    gatheringPoints:[GatheringPointSchema] */




export const createEvent= async (req,res,next)=>{
    const banner=undefined
    const eventImages=[]
    const speakersImages=[]
    if (req.files){
    banner=req.files.banner
    for(key in req.files){
        if (/event-image/.test(key)){
            const evimg=await saveImage(req.files.key,relativeUploadPath)
            eventImages.append(evimg)
        }
        else if (/speaker-image/.test(key)){
            const spimg=await saveImage(req.files.key,relativeUploadPath)
            speakersImages.append(spimg)
        }
    }
    }
    const event=await Event.create({
        title:req.body.title,
        type:req.body.type,
        description:req.body.description,
        banner:"not Implemented yet",
        images:["not Implemented yet"],
        capacity:req.body.capacity,
        price:req.body.price,
        visibility:true,
        date:req.body.date,
        location:{
            landmark:req.body.location.landmark,
            location:{
            coordinates:req.body.location.location.coordinates
            }
        },
        checkpoints:req.body.checkpoints,
        gatheringPoints:req.body.gatheringPoints
    })

    
    return res.status(200).json({
        message:"event created successfully",
        event
    });

}

