import { User } from "../../models/Users/User.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"





export const getusers= catchAsync( async (req,res,next)=>{
    
    const users=await User.find()
    
    return res.status(200).json({
        messge:"success",
        count:users.length,
        users
    })
}

)