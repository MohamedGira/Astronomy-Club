import express from "express";
import * as userRolesController from "../controllers/User/UserRole.mjs";
export const userRolesRouter=express.Router({mergeParams:true})
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";


userRolesRouter.route('/')
.get(userRolesController.getUserRoles)
.post(isAuthorizedMw('admin'),userRolesController.addUserRole)

userRolesRouter.route('/:elementId')
.get(userRolesController.getUserRole)
.patch(isAuthorizedMw('admin'),userRolesController.updateUserRole)
.delete(isAuthorizedMw('admin'),userRolesController.deleteUserRole)
