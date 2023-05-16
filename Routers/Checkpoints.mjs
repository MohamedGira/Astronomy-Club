import express from "express";

import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";
import * as checkpointsController from "../controllers/Event/CRUDCheckpoint.mjs"
export const CheckpointsRouter=express.Router({mergeParams:true})

CheckpointsRouter.route('/')
.get(checkpointsController.getCheckpoints)
.post(isAuthorizedMw('admin'),checkpointsController.addCheckpoint)

CheckpointsRouter.route('/:elementId')
.get(checkpointsController.getCheckpoint)
.patch(isAuthorizedMw('admin'),checkpointsController.updateCheckpoint)
.delete(isAuthorizedMw('admin'),checkpointsController.deleteCheckpoint)