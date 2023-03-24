import mongoose from'mongoose'
import { AppError } from '../../../utils/AppError.mjs';
import { LocationSchema } from './Location.mjs';
import {speakerSchema} from './Speaker.mjs'

export const CheckpointSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{type:String,required:true},
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
        type:speakerSchema,
        default:undefined
    },
    location:LocationSchema
});
CheckpointSchema.pre('save',function(next){
    if(this.type=='speaker'&&this.speaker==undefined)
        return next(new AppError('400','check point is of type speaker while no speaker was provided'))
    if(this.type!='speaker'&&this.speaker!=undefined)
        return next(new AppError('400','check point is not of type speaker however,there\'s speaker was provided'))
    next()
})
