import express from "express";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";


export const TicketRouter=express.Router()

import * as TicketsController from "../controllers/Ticket/CRUDTicket.mjs"
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

TicketRouter.use(protect)
TicketRouter.route('/')
.get(TicketsController.getTickets)
.post( isAuthorizedMw('admin'),TicketsController.addTicket)

TicketRouter.route('/:elementId')
.get(TicketsController.getTicket)
.patch(isAuthorizedMw('admin'),TicketsController.updateTicket)
.delete(isAuthorizedMw('admin'),TicketsController.deleteTicket)
