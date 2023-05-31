import mongoose from'mongoose'
import { elementStatusSchema } from '../elementsStatus.mjs'
const userRoleScema=mongoose.Schema(
    {
       name:{
        type:String,
        required:true,
        unique:[true,'this user Role already exists']
       },
       elementStatus: {type:elementStatusSchema,default:{}},
    }
)

export const UserRole= mongoose.model('UserRole',userRoleScema)
