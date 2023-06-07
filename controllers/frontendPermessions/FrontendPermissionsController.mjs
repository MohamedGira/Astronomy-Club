import { ManagmentPermission } from "../../models/ManagmentPermissions/ManagmentPermission.mjs"
import { AppError } from "../../utils/AppError.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"
import {factory} from "../CRUDFactory/package.mjs";

export const CanManage=catchAsync(async(req,res,next)=>{
    let perm=await ManagmentPermission.findOne({name:req.params.name})
    if(!perm)
        return next(new AppError(404,`Invalid Permission Pack, Add it to the database`))
    return res.status(200).json({
        message:'found',
        whoCanDo:perm.whoCanDo
    })
})




// GET tasks/
export const  getManagmentPermissions= factory.getAll(ManagmentPermission)

// POST tasks/
export const  addManagmentPermission= factory.createOne(ManagmentPermission)

// GET tasks/:elementId 
export const  getManagmentPermission= factory.getOne(ManagmentPermission)

// PATCH tasks/:elementId 
export const  updateManagmentPermission= factory.updateOne(ManagmentPermission)

// DELETE tasks/:elementId
export const  deleteManagmentPermission= factory.deleteOne(ManagmentPermission)
