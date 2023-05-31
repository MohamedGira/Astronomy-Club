import { Event } from "../../../models/Events/Event.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";
import { isAuthorized } from "../../Authentication/authorizationMw/Authorizer.mjs";
import * as factory from "../../CRUDFactory.mjs";


//deprecated
export const getEventById= async(id,fullaccess)=>{
    // the population is the new part
    if (fullaccess)
        return Event.findById(id).populate('checkpoints gatheringPoints extraFields type')
    else
        return Event.findOne({_id:id,isVisible:{$ne:false}}).populate('checkpoints gatheringPoints extraFields type')
}

export const getEvent= factory.getOne(Event,['checkpoints','gatheringPoints','type','extraFields'],{showDeleted:true})
