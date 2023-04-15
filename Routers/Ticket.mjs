import express from "express";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";

import { createTicket } from "../controllers/Ticket/createTicket.mjs";
import {catchAsync} from "../utils/catchAsync.mjs";

export const TicketRouter=express.Router()

import * as TicketsController from "../controllers/Ticket/CRUDTicket.mjs"
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

TicketRouter.use(protect)
TicketRouter.route('/')
.get(TicketsController.getTickets)
.post(TicketsController.addTicket)

TicketRouter.route('/:elementId')
.get(TicketsController.getTicket)
.patch(TicketsController.updateTicket)
.delete(TicketsController.deleteTicket)
