import express from "express";
import { isAuthorized } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";

import { createTicket } from "../controllers/Ticket/createTicket.mjs";
import { getUser } from "../controllers/User/getUser.mjs";
import {catchAsync} from "../utils/catchAsync.mjs";

export const UserRouter=express.Router()

UserRouter.get('/:id',isAuthorized('admin'),getUser)

