import { Event } from "../../models/Events/Event.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { isAuthorized } from "../Authentication/authorizationMw.mjs/Authorizer.mjs";
import { getCheckpointsbyId } from "./checkpoints/getCheckpoints.mjs";


export const getEventById= async(id,fullaccess)=>{
    if (fullaccess)
    return Event.findById(id)
    else
    return Event.findOne({_id:id,isVisible:{$ne:false}})
}

export const getEvent= catchAsync( async (req,res,next)=>{
    const id=req.params.id
    let event=await getEventById(id,await isAuthorized('admin'))
    
    if(!event)
        return res.status(404).json({
            message:"couldn't find this event",
        });

    event._doc.checkpoints=await getCheckpointsbyId(id)
    
    return res.status(200).json({
        message:"sucess",
        event
    });

}

)