import { Event } from "../../models/Events/Event.mjs";
import { Speaker } from "../../models/Events/subSchemas/Speaker.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { isAuthorizedPlain } from "../Authentication/authorizationMw.mjs/Authorizer.mjs";

export const getEvents= catchAsync( async (req,res,next)=>{
    const id=req.params.id
    let events;
    if (await isAuthorizedPlain(req,'admin'))
        events= await Event.find()
    else
        events=await Event.find({isVisible:{$ne:false}})
    
    if(!events)
        return res.status(404).json({
            message:"couldn't found this event",
        });
/*     for (let event in events){
        if (event.type=='speaker'){
            Speaker.find({event})
        }
    } */
    return res.status(200).json({
        message:"sucess",
        count:events.length,
        events
    });

}

)