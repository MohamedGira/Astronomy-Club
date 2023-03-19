import mongoose from'mongoose'

const userRoleScema=mongoose.Schema(
    {
       role:{
        type:String,
        required:true,
       },
        //may add permessions and so
    }
)

export const userRoleModel= mongoose.model('UserRole',userRoleScema)
