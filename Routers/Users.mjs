import express from "express";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

import { confirmUser } from "../controllers/User/Admin.mjs/confirmMember.mjs";
import { getUser } from "../controllers/User/getUser.mjs";
import { getusers } from "../controllers/User/getUsers.mjs";
import { myProfile } from "../controllers/User/myProfile.mjs";
import { myTasks } from "../controllers/User/myTasks.mjs";
import {catchAsync} from "../utils/catchAsync.mjs";

export const UserRouter=express.Router()

UserRouter.post('/confirmUser',isAuthorizedMw('admin'),confirmUser)

UserRouter.get('/myProfile',protect,myProfile)
UserRouter.get('/myTasks', protect,myTasks)
UserRouter.get('/',isAuthorizedMw('admin'),getusers)

UserRouter.get('/:id',isAuthorizedMw('admin'),getUser)