import express from "express";

export const eventTypesRouter=express.Router({mergeParams:true})
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";
import { CanManage } from "../controllers/frontendPermessions/FrontendPermissionsController.mjs";

import   * as ManagmentPermissionController from "../controllers/frontendPermessions/FrontendPermissionsController.mjs";
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

export const FrontendManagmentRouter=express.Router()


FrontendManagmentRouter.route('/')
.get(ManagmentPermissionController.getManagmentPermissions)
.post(protect,isAuthorizedMw('admin'),ManagmentPermissionController.addManagmentPermission)
FrontendManagmentRouter.route('/can/:name')
.get(CanManage)

FrontendManagmentRouter.route('/:elementId')
.get(ManagmentPermissionController.getManagmentPermission)
.patch(isAuthorizedMw('admin'),ManagmentPermissionController.updateManagmentPermission)
.delete(isAuthorizedMw('admin'),ManagmentPermissionController.deleteManagmentPermission)



