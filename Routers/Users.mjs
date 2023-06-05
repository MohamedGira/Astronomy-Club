import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


import { getUser } from "../controllers/User/getUser.mjs";
import { getusers } from "../controllers/User/getUsers.mjs";
import { myProfile } from "../controllers/User/myProfile.mjs";
import { getPendingUsers } from "../controllers/User/Admin/getPendingUsers.mjs";
import { confirmUser } from "../controllers/User/Admin/confirmMember.mjs";
import { deleteUser, deleteUser2 } from "../controllers/User/Admin/deleteUser.mjs";
import { declineUser } from "../controllers/User/Admin/declineUser.mjs";
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
.delete(deleteUser2)
.patch(editUser)
.get(getUser);


