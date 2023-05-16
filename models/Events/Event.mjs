import mongoose from'mongoose'
import { Location, LocationSchema } from './subSchemas/Location.mjs';
import { imageSchema } from '../image.mjs';
import { Checkpoint, CheckpointSchema } from './subSchemas/checkpoint.mjs';

import { GatheringPoint, GatheringPointSchema } from './subSchemas/gatheringPoint.mjs';
import { deleteFile } from '../../utils/uploads/cleanDir.mjs';
import { saveImage } from '../../utils/uploads/saveImage.mjs';
import { maxImagesPerEvent } from '../../utils/consts.mjs';
import { EventType } from './EventTypes.mjs';
import { AppError } from '../../utils/AppError.mjs';

export const EventSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    type:{
        type:String,
        required:true,
        validate:{
            validator: async function(type){
                if(!await EventType.findOne({type:type}))
                    return false
                return true
            },
            message:`invalid event Type provided`
        }    
    },
    description:{
        type:String,
        required:true,
    },
    banner:String,
    images:{
        type:[String],
        default:[],
        validate: {validator: function(images){
            if(images.length>maxImagesPerEvent)
                return false
            return true
        },message:`maximum of ${maxImagesPerEvent} images allowed`}
    },
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


EventSchema.pre(/delete|remove/i,async function(next){
    const doc = await this.model.findOne(this.getFilter()).populate('checkpoints').populate('gatheringPoints');
    if (doc){
        //console.log(doc)
        
    if(doc.checkpoints){
        doc.checkpoints.forEach(async el=>await Checkpoint.findByIdAndDelete(el._id))
        // console.log(`deleted ${doc.checkpoints.length} checkpoints from db`)
    }

    if(doc.gatheringPoints){
        doc.gatheringPoints.forEach(async el=>await GatheringPoint.findByIdAndDelete(el._id))
        //  console.log(`deleted ${doc.gatheringPoints.length} gathering points from db`)
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
