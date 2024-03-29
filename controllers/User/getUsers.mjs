import { User } from "../../models/Users/User.mjs"
import { ResultsManager } from "../../utils/ResultsManager.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"





export const getusers= catchAsync( async (req,res,next)=>{
    
    let users= await new ResultsManager(User.find().populate('role committee'),req.query,['password']).filter().select().query
    return res.status(200).json({
        messge:"success",
        count:users.length,
        users
    })
}
)