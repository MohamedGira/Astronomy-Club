import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";
export const PermissionRouter=express.Router()
import * as PermissionsController from "../controllers/Permission/permissionController.mjs"
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

PermissionRouter.use(RBACAutorizerMw)
PermissionRouter.route('/')
.get(PermissionsController.getPermissions)
.post(isAuthorizedMw('admin'),PermissionsController.addPermission)

PermissionRouter.use('/:elementId',RBACAutorizerMw)
PermissionRouter.route('/:elementId')
.get(PermissionsController.getPermission)
.patch(isAuthorizedMw('admin'),PermissionsController.updatePermission)
.delete(isAuthorizedMw('admin'),PermissionsController.deletePermission)
