import { Ticket } from "../../models/Tickets/Ticket.mjs";
import * as factory from "../CRUDFactory.mjs";


export const  getTickets= factory.getAll(Ticket)

// POST Speakers/
export const  addTicket= factory.CreateOne(Ticket)

// GET Tickets/:elementId 
export const  getTicket= factory.getOne(Ticket)

// PATCH Tickets/:elementId 
export const  updateTicket= factory.updateOne(Ticket)

// DELETE Tickets/:elementId
export const  deleteTicket= factory.deleteOne(Ticket)
