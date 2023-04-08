import mongoose from'mongoose'
import { LocationSchema } from './Location.mjs';

export const GatheringPointSchema = new mongoose.Schema({
    from:Date,
    to:Date,
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event',
        required:true
    },
    location: {
    type: LocationSchema,
    required: true
    }
});
export const GatheringPoint= mongoose.model('GatheringPoint',GatheringPointSchema)