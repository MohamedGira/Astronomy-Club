import { Event } from "../../models/Events/Event.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { isAuthorizedPlain } from "../Authentication/authorizationMw.mjs/Authorizer.mjs";
import { getCheckpointsbyId } from "./checkpoints/getCheckpoints.mjs";


export const getEvent= catchAsync( async (req,res,next)=>{
    const id=req.params.id
    let event;
    console.log(await isAuthorizedPlain(req,'admin'))
    if (await isAuthorizedPlain(req,'admin'))
        event= await Event.findById(id)
    else
        event=await Event.findOne({_id:id,isVisible:{$ne:false}})
    
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