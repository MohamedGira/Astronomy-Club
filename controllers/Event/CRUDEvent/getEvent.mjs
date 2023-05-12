import { Event } from "../../../models/Events/Event.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";
import { isAuthorized } from "../../Authentication/authorizationMw/Authorizer.mjs";


export const getEventById= async(id,fullaccess)=>{
    // the population is the new part
    if (fullaccess)
        return Event.findById(id).populate('checkpoints').populate('gatheringPoints')
    else
        return Event.findOne({_id:id,isVisible:{$ne:false}}).populate('checkpoints').populate('gatheringPoints')
}

export const getEvent= catchAsync( async (req,res,next)=>{
    const id=req.params.id
    let event=await getEventById(id,await isAuthorized(req,'admin'))
    
    if(!event)
        return res.status(404).json({
            message:"couldn't find this event",
        });

  
    return res.status(200).json({
        message:"sucess",
        event
    });

}

)