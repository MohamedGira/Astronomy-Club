import { Event } from "../../../models/Events/Event.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";
import { isAuthorized } from "../../Authentication/authorizationMw.mjs/Authorizer.mjs";

export const getEventsQuery=async (fullaccess)=>{
    if (fullaccess)
        return Event.find()
    else
        return Event.find({isVisible:{$ne:false}})

}

export const getEvents= catchAsync( async (req,res,next)=>{
    let events= await getEventsQuery(await isAuthorized(req,'admin'))

    if(!events)
        return res.status(404).json({
            message:"couldn't find this event",
        });

    return res.status(200).json({
        message:"sucess",
        count:events.length,
        events
    });

}

)