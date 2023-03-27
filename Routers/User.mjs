import express from "express";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

import { createTicket } from "../controllers/Ticket/createTicket.mjs";
import { getUser } from "../controllers/User/getUser.mjs";
import { myProfile } from "../controllers/User/myProfile.mjs";
import {catchAsync} from "../utils/catchAsync.mjs";

export const UserRouter=express.Router()

UserRouter.get('/myProfile',protect,myProfile)
UserRouter.get('/:id',isAuthorizedMw('admin'),getUser)

