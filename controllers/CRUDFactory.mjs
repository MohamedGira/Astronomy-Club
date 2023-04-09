import { json } from "express"
import { filterObj, jsonifyObj } from "../utils/objOp.mjs"
import { catchAsync } from "../utils/catchAsync.mjs"
import { AppError } from "../utils/AppError.mjs"

export const deleteOne=(Model)=>{
return catchAsync( async (req,res,next)=>{
     const id=req.params.elementId
     const doc = await Model.findByIdAndDelete(id)
     if(!doc)
         return next(new AppError(404,`requested document ${id} doesn't exitst`))
     return res.status(204).json({
         message:'deleted succesfully',
         doc
     })
    }
    )}
