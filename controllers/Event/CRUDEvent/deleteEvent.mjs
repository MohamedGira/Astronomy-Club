import { Event } from "../../../models/Events/Event.mjs"
import { deleteOne } from "../../CRUDFactory/DeleteOne.mjs"

export const deleteEvent= deleteOne(Event)