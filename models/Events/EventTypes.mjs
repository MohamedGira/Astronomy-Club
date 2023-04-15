import mongoose from'mongoose'

const EventTypeSchema=mongoose.Schema(
    {
       type:{
        type:String,
        required:true,
        unique:[true,'this Type already exists']
       },
    }
)

export const EventType= mongoose.model('EventType',EventTypeSchema)
