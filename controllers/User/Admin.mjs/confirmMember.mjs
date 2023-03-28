import { User } from "../../../models/Users/User.mjs"
import { AppError } from "../../../utils/AppError.mjs"
import { catchAsync } from "../../../utils/catchAsync.mjs"





export const confirmUser= catchAsync( async (req,res,next)=>{
    const id=req.body.id
    const user=await User.findByIdAndUpdate(id,{confirmed:true})
    if(user.confirmed)
        return next (new AppError(400,'this user is already confirmed'))
    user._doc.confirmed=true
    return res.status(200).json({
        messge:"user confirmed succesfully",
        user
    })
}

)