import mongoose from'mongoose'
import { LocationSchema } from './subSchemas/Location.mjs';
import { imageSchema } from '../image.mjs';
import { Checkpoint, CheckpointSchema } from './subSchemas/checkpoint.mjs';

import { GatheringPoint, GatheringPointSchema } from './subSchemas/gatheringPoint.mjs';
import { deleteFile } from '../../utils/uploads/cleanDir.mjs';
import { saveImage } from '../../utils/uploads/saveImage.mjs';

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
    images:{type:[String],default:[]},
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
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

EventSchema.virtual('checkpoints',{ref:'Checkpoint',foreignField:'event',localField:'_id'})
EventSchema.virtual('gatheringPoints',{ref:'GatheringPoint',foreignField:'event',localField:'_id'})

EventSchema.pre(/delete/i,async function(next){
    const doc = await this.model.findOne(this.getFilter()).populate('checkpoints').populate('gatheringPoints');
    if (doc){
        
    if(this.checkpoints){
        this.checkpoints.forEach(async el=>await Checkpoint.findByIdAndDelete(el._id))
        console.log(`deleted ${this.checkpoints.length} checkpoints from db`)
    }

    if(this.gatheringPoints){
        this.gatheringPoints.forEach(async el=>await GatheringPoint.findByIdAndDelete(el._id))
        console.log(`deleted ${this.gatheringPoints.length} gathering points from db`)
    }
            
    if(doc.banner){
        deleteFile(doc.banner,'images')
    }
    if(doc.images)
        doc.images.forEach(el=>deleteFile(el,'images'))    
    }
    next()
})



export const Event=mongoose.model('Event',EventSchema)
