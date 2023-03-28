import { Event } from "../../models/Events/Event.mjs"
import { AppError } from "../../utils/AppError.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs"
import { filterObj } from "../../utils/objOp.mjs";





export const updateEvent= catchAsync( async (req,res,next)=>{
    const id=req.params.id
    const update=filterObj(req.body.update,Event.schema.paths)
    var event=await  Event.findByIdAndUpdate(id,update,{new: true})
    if(!event)
    return next(AppError('400','invalid event id'))
    return res.status(200).json({
        messge:"object updated successfully",
        event
    })
}

)