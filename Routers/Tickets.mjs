import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


export const TicketRouter=express.Router()

import * as TicketsController from "../controllers/Ticket/CRUDTicket.mjs"


TicketRouter.use(RBACAutorizerMw)
TicketRouter.route('/')
.get(TicketsController.getTickets)
.post( TicketsController.addTicket)

TicketRouter.route('/:elementId')
.get(TicketsController.getTicket)
.patch(TicketsController.updateTicket)
.delete(TicketsController.deleteTicket)
