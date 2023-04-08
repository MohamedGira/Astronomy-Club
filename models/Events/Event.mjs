import mongoose from'mongoose'
import { LocationSchema } from './subSchemas/Location.mjs';
import { Checkpoint, CheckpointSchema } from './subSchemas/checkpoint.mjs';

import { GatheringPoint, GatheringPointSchema } from './subSchemas/gatheringPoint.mjs';
import { imgdir } from '../../utils/image/saveImage.mjs';
import {unlinkSync} from "fs";

export const EventSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    type:{
        type:String,
        enum:['trip','conference','online'],
        default:'trip'
    },
    description:{
        type:String,
        required:true,
    },
    banner:String,
    images:[String],
    capacity:{
        type:Number,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    isVisible:Boolean,
    date:{
        type:Date,
        required:true,
    },
    location:{
        type:LocationSchema,
        required:true
    },
});

EventSchema.pre(/delete/i,async function(next){
    const doc = await this.model.findOne(this.getFilter());
    if (doc){
    const deletedCheckpoint=await Checkpoint.find({event:doc._id})
    for (let elem in deletedCheckpoint){
        await Checkpoint.findByIdAndDelete(deletedCheckpoint[elem]._id)
    }
    if(deletedCheckpoint)
        console.log(`deleted ${deletedCheckpoint.length} checkpoints from db`)
    const deletedGatheringPoint=await GatheringPoint.find({event:doc._id})
    for (let elem in deletedGatheringPoint){
        await GatheringPoint.findByIdAndDelete(deletedGatheringPoint[elem]._id)
    }
    if(deletedGatheringPoint)
        console.log(`deleted ${deletedGatheringPoint.length} gathering from db`)
    
    let imgs=[...doc.images]
    if(doc.banner){
        imgs.push(doc.banner)
    }
    for (let i in imgs){
        try{
            unlinkSync(imgdir+imgs[i])
        }catch(e){
            console.log(e.message)
        }
    }
    }
    next()
})
export const Event=mongoose.model('Event',EventSchema)