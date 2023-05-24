import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";
export const PermissionRouter=express.Router()
import * as PermissionsController from "../controllers/Permission/permissionController.mjs"


PermissionRouter.use(RBACAutorizerMw)
PermissionRouter.route('/')
.get(PermissionsController.getPermissions)
.post(PermissionsController.addPermission)

PermissionRouter.route('/:elementId')
.get(PermissionsController.getPermission)
.patch(PermissionsController.updatePermission)
.delete(PermissionsController.deletePermission)
