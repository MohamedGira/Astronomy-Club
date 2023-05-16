import { EventType } from "../../models/Events/EventTypes.mjs";
import {filterObj,jsonifyObj} from "../../utils/objOp.mjs"
import * as factory from "../CRUDFactory.mjs";


export const createEventType= async(unfilteredBody,eventid)=>{
    
    unfilteredBody=jsonifyObj(unfilteredBody)
    var EventTypeBody=filterObj(unfilteredBody,EventType.schema.paths) 
    var newEventType=await EventType.create({...EventTypeBody,event:eventid})
    return newEventType
}


// GET eventTypes
export const  getEventTypes= factory.getAll(EventType)

// POST eventTypes
export const  addEventType= factory.CreateOne(EventType)

// GET eventTypes:elementId 
export const  getEventType= factory.getOne(EventType)

// PATCH eventTypes:elementId 
export const  updateEventType= factory.updateOne(EventType)

// DELETE eventTypes:elementId
export const  deleteEventType= factory.deleteOne(EventType)
