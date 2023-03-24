import mongoose from'mongoose'
import { LocationSchema } from './Location.mjs';

export const GatheringPointSchema = new mongoose.Schema({
    from:Date,
    to:Date,
    location: {
    type: LocationSchema,
    required: true
    }
});
export const GatheringPoint= mongoose.model('GatheringPoint',GatheringPointSchema)