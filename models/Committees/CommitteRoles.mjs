import mongoose from'mongoose'
import { elementStatusSchema } from '../elementsStatus.mjs'

const committeeRoleScema=mongoose.Schema(
    {
     name:{
        type:String,
        required:true,
        unique:[true,'this user Role already exists']
       },
       elementStatus: {type:elementStatusSchema,default:{}},
    }
)

export const CommitteeRole= mongoose.model('CommitteeRole',committeeRoleScema)
