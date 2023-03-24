import mongoose from'mongoose'

export const speakerSchema=mongoose.Schema(
    {
       name:{
        type:String,
        required:true,
       },
       title:{
        type:String,
        required:true,
       },
       description:{
        type:String,
        required:true,
       },
       image:{
        type:String,
        required:true,
       }
        
    }
)

export const Speaker= mongoose.model('Speaker',speakerSchema)

