import express from "express";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";

import { createTicket } from "../controllers/Ticket/createTicket.mjs";
import {catchAsync} from "../utils/catchAsync.mjs";

export const TicketRouter=express.Router()

TicketRouter.post('/',isAuthorizedMw('visitor'),catchAsync(createTicket))


