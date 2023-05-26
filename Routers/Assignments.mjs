import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


export const AssignmentRouter=express.Router()

import * as AssignmentsController from "../controllers/Assignment/CRUDAssignment.mjs"


AssignmentRouter.use(RBACAutorizerMw)
AssignmentRouter.route('/')
.get(AssignmentsController.getAssignments)
.post( AssignmentsController.addAssignment)

AssignmentRouter.route('/:elementId')
.get(AssignmentsController.getAssignment)
.patch(AssignmentsController.updateAssignment)
.delete(AssignmentsController.deleteAssignment)
