import express from "express";

import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";
import * as checkpointsController from "../controllers/Event/CRUDCheckpoint.mjs"

export const CheckpointsRouter=express.Router({mergeParams:true})

CheckpointsRouter.route('/')
.get(checkpointsController.getCheckpoints)
.post(RBACAutorizerMw,checkpointsController.addCheckpoint)

CheckpointsRouter.route('/:elementId')
.get(checkpointsController.getCheckpoint)
.patch(RBACAutorizerMw,checkpointsController.updateCheckpoint)
.delete(RBACAutorizerMw,checkpointsController.deleteCheckpoint)