import mongoose from'mongoose'
import {  LocationSchema } from './subSchemas/Location.mjs';
import { Checkpoint } from './subSchemas/checkpoint.mjs';

import { GatheringPoint } from './subSchemas/gatheringPoint.mjs';
import { deleteFile } from '../../utils/uploads/cleanDir.mjs';

import { elementStatusSchema } from '../elementsStatus.mjs'

export const EventSchema = new mongoose.Schema({
    title:{
        type:String,
        unique:true,
        required:true
    },
    type:{
    
        type: mongoose.Schema.Types.ObjectId,
        ref:'EventType',
        required:true
    
    },
    description:{
        type:String,
        required:true,
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
    elementStatus: {type:elementStatusSchema,default:{}},
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
    timestamps:true
});

EventSchema.virtual('checkpoints',{ref:'Checkpoint',foreignField:'event',localField:'_id',match:{'elementStatus.isDeleted':{$ne:true}}})
EventSchema.virtual('gatheringPoints',{ref:'GatheringPoint',foreignField:'event',localField:'_id',match:{'elementStatus.isDeleted':{$ne:true}}})
EventSchema.virtual('images',{ref:'Image',foreignField:'for',localField:'_id'})
EventSchema.virtual('extraFields',{ref:'OptionValue',foreignField:'element',localField:'_id',match:{'elementStatus.isDeleted':{$ne:true}}})


EventSchema.pre(/delete|remove/i,async function(next){
    const doc = await this.model.findOne(this.getFilter()).populate('checkpoints gatheringPoints images');
    if (doc){
    if(doc.checkpoints)
        doc.checkpoints.forEach(async el=>await Checkpoint.findByIdAndDelete(el._id))
    if(doc.gatheringPoints)
        doc.gatheringPoints.forEach(async el=>await GatheringPoint.findByIdAndDelete(el._id))         
    if(doc.images)
        doc.images.forEach(el=>{
            Image.findByIdAndDelete(el._id)
            deleteFile(el.filename,'images')
        })    
    }
    next()
})



export const Event=mongoose.model('Event',EventSchema)
