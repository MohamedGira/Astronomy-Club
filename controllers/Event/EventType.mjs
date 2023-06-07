import { EventType } from "../../models/Events/EventTypes.mjs";
import {factory} from "../CRUDFactory/package.mjs";



// GET eventTypes
export const  getEventTypes= factory.getAll(EventType)

// POST eventTypes
export const  addEventType= factory.createOne(EventType)

// GET eventTypes:elementId 
export const  getEventType= factory.getOne(EventType)

// PATCH eventTypes:elementId 
export const  updateEventType= factory.updateOne(EventType)

// DELETE eventTypes:elementId
export const  deleteEventType= factory.deleteOne(EventType)
