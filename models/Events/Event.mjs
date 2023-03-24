import mongoose from'mongoose'
import { LocationSchema } from './subSchemas/Location.mjs';
import { CheckpointSchema } from './subSchemas/checkpoint.mjs';

import { GatheringPointSchema } from './subSchemas/gatheringPoint.mjs';

export const EventSchema = new mongoose.Schema({
    title:{
        type:String,
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
    visibility:Boolean,
    date:{
        type:Date,
        required:true,
    },
    location:{
        type:LocationSchema,
        required:true
    },
    checkpoints:[CheckpointSchema],
    gatheringPoints:[GatheringPointSchema]
});

export const Event=mongoose.model('Event',EventSchema)