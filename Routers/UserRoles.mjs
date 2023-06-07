import express from "express";
import * as userRolesController from "../controllers/User/UserRole.mjs";
export const userRolesRouter=express.Router({mergeParams:true})
import { RBACAutorizerMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


userRolesRouter.route('/')
.get(userRolesController.getUserRoles)
.post(RBACAutorizerMw,userRolesController.addUserRole)

userRolesRouter.route('/:elementId')
.get(userRolesController.getUserRole)
.patch(RBACAutorizerMw,userRolesController.updateUserRole)
.delete(RBACAutorizerMw,userRolesController.deleteUserRole)
