import express from "express";
import { getCheckpoints } from "../controllers/Event/checkpoints/getCheckpoints.mjs";
import { addCheckpoint, deleteCheckpoint, getCheckpoint, updateCheckpoint } from "../controllers/Event/checkpoints/CRUDCheckpoint.mjs";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";

export const CheckpointsRouter=express.Router({mergeParams:true})

CheckpointsRouter.route('/')
.get(getCheckpoints)
.post(isAuthorizedMw('admin'),addCheckpoint)

CheckpointsRouter.route('/:elementId')
.get(getCheckpoint)
.patch(isAuthorizedMw('admin'),updateCheckpoint)
.delete(isAuthorizedMw('admin'),deleteCheckpoint)