import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


import { getUser } from "../controllers/User/getUser.mjs";
import { getusers } from "../controllers/User/getUsers.mjs";
import { myProfile } from "../controllers/User/myProfile.mjs";

import {  deleteUser } from "../controllers/User/Admin/deleteUser.mjs";
import { editProfile } from "../controllers/User/editProfile.mjs";
import { myTasks } from "../controllers/User/myTasks.mjs";
import { editUser } from "../controllers/User/Admin/editUser.mjs";

export const UserRouter = express.Router();

export const myProfileRouter = express.Router();

UserRouter.use(RBACAutorizerMw)
myProfileRouter.use(RBACAutorizerMw)

myProfileRouter.route('/')
.get(myProfile)
.patch(editProfile)
myProfileRouter.route('/myTasks')
.get(myTasks)

UserRouter.use('/myProfile',myProfileRouter)

UserRouter.route('/')
.get(getusers)

UserRouter.route('/:elementId')
.delete(deleteUser)
.patch(editUser)
.get(getUser);


