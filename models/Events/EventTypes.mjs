import mongoose from'mongoose'
import { elementStatusSchema } from '../elementsStatus.mjs'

const EventTypeSchema=mongoose.Schema(
    {
       name:{
        type:String,
        required:true,
        unique:[true,'this Type already exists']
       },
       elementStatus: {type:elementStatusSchema,default:{}},
    }
)

export const EventType= mongoose.model('EventType',EventTypeSchema)
