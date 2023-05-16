import mongoose from'mongoose'

const userRoleScema=mongoose.Schema(
    {
       name:{
        type:String,
        required:true,
        unique:[true,'this user Role already exists']
       },
    }
)

export const UserRole= mongoose.model('UserRole',userRoleScema)
