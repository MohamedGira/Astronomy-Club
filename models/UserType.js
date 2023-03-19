const mongoose=require('mongoose')

const userTypeScema=mongoose.Schema(
    {
        Type:String,
        //may add permessions and so
    }
)

exports.UserType=model('UserType',userTypeScema)
