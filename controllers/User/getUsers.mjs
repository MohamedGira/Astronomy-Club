import { User } from "../../models/Users/User.mjs"
import { ResultsManager } from "../../utils/ResultsManager.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"
import { getAll } from "../CRUDFactory.mjs"



export const getusersold= catchAsync( async (req,res,next)=>{
    
    let users= await new ResultsManager(User.find(),req.query,['password']).filter().select().query
    return res.status(200).json({
        messge:"success",
        count:users.length,
        users
    })
}
)

export const getusers= getAll(User,[],{sensitiveFields:['password'],resultsName:'users'})
