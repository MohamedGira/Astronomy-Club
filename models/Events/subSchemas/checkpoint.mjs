import mongoose from'mongoose'
import { AppError } from '../../../utils/AppError.mjs';
import { LocationSchema } from './Location.mjs';
import {Speaker, SpeakerSchema} from './Speaker.mjs'
import { Event } from '../Event.mjs';
import { elementStatusSchema } from '../../elementsStatus.mjs';


export const CheckpointSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
    event:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event',
        required:true
    },
    startsAt:{
        type:Date,
        required:true
    },
    endsAt:{
        type:Date,
        required:true
    },
    type:{
        type:String,
        enum:['speaker','gathering'],
        default:'speaker'
    },
    speaker:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Speaker',
    },
    elementStatus: {type:elementStatusSchema,default:{}},
    location:LocationSchema
});

CheckpointSchema.pre(/delete/i,async function(next){
    const doc = await this.model.findOne(this.getFilter());
    if(doc){
    const deleted=await Speaker.findByIdAndDelete(doc.speaker)
    if (deleted)
        console.log(`deleted ${deleted.name} from db`)
    }
    next()

})


CheckpointSchema.pre('save',async function(next){
    if(this.type=='speaker'&&this.speaker==undefined)
        return next(new AppError('400','check point is of type speaker while no speaker was provided'))
    if(this.type!='speaker'&&this.speaker!=undefined)
        return next(new AppError('400','check point is not of type speaker however,there\'s speaker was provided'))

    next()
})
export const Checkpoint= mongoose.model('Checkpoint',CheckpointSchema)
