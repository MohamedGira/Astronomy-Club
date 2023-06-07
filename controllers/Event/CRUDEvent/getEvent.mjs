import { Event } from "../../../models/Events/Event.mjs";
import {factory} from "../../CRUDFactory/package.mjs";





//deprecated
export const getEventById= async(id,fullaccess)=>{
    // the population is the new part
    let e=undefined
    if (fullaccess)
        e= Event.findById(id)
    else
        e= Event.findOne({_id:id,isVisible:{$ne:false}})
    return e.populate('checkpoints gatheringPoints extraFields type images')
}

export const getEvent= factory.getOne(Event,['checkpoints','gatheringPoints','type','extraFields'],{showDeleted:true})
