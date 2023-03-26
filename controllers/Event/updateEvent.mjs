import { Event } from "../../models/Events/Event.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"





export const updateEvent= catchAsync( async (req,res,next)=>{
    const id=req.params.id
    const update={}
    for( var key in Event.schema.paths){
        if (key in req.body.update){
            update[key]=req.body.update[key]
        }
    }
    var event=await  Event.findByIdAndUpdate(id,update,{new: true})
    return res.status(200).json({
        messge:"object updated successfully",
        event
    })
}

)