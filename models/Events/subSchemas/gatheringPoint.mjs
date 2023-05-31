import mongoose from'mongoose'
import { LocationSchema } from './Location.mjs';
import { elementStatusSchema } from '../../elementsStatus.mjs';

export const GatheringPointSchema = new mongoose.Schema({
    from:{type:Date,required:true},
    to:{type:Date,required:true},
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event',
        required:true
    },
    location: {
    type: LocationSchema,
    required: true
    },
    elementStatus: {type:elementStatusSchema,default:{}},
});
export const GatheringPoint= mongoose.model('GatheringPoint',GatheringPointSchema)