import { Event } from "../../../models/Events/Event.mjs";
import { LocationSchema } from "../../../models/Events/subSchemas/Location.mjs";
LocationSchema
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

