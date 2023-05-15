import mongoose from'mongoose'

const permessionSchema=mongoose.Schema(
    {
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserRole",
          },
        endpoint:{
            type:String
        },
        method:{
            type:String
        }
    }
)

export const Permession= mongoose.model('Permession',permessionSchema)
