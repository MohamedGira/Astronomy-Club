import { Event } from "../../../models/Events/Event.mjs"
import { AppError } from "../../../utils/AppError.mjs"
import { catchAsync } from "../../../utils/catchAsync.mjs"

export const deleteEvent= catchAsync( async(req,res,next)=>{
    //events/:id/checkpoints/:elementId delete
    const eventid=req.params.id
    const event = await Event.findByIdAndDelete(eventid)
    if(!event)
        return next(new AppError(404,'requested event doesn\'t exitst'))
    return res.status(204).json({
        message:'deleted succesfully',
        event
    })
})