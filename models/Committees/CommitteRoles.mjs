import mongoose from'mongoose'

const committeeRoleScema=mongoose.Schema(
    {
     name:{
        type:String,
        required:true,
        unique:[true,'this user Role already exists']
       },
    }
)

export const CommitteeRole= mongoose.model('CommitteeRole',committeeRoleScema)
