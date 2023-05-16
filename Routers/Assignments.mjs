import express from "express";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


export const AssignmentRouter=express.Router()

import * as AssignmentsController from "../controllers/Assignment/CRUDAssignment.mjs"
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

AssignmentRouter.use(protect)
AssignmentRouter.route('/')
.get(AssignmentsController.getAssignments)
.post( isAuthorizedMw('admin'),AssignmentsController.addAssignment)

AssignmentRouter.route('/:elementId')
.get(AssignmentsController.getAssignment)
.patch(isAuthorizedMw('admin'),AssignmentsController.updateAssignment)
.delete(isAuthorizedMw('admin'),AssignmentsController.deleteAssignment)
