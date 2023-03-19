import mongoose from'mongoose'

const userRoleScema=mongoose.Schema(
    {
       role:{
        type:String,
        required:true,
        unique:[true,'this user Role already exists']
       },
        //may add permessions and so
    }
)

export const UserRole= mongoose.model('UserRole',userRoleScema)
