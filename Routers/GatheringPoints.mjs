import express from "express";
import * as gatheringPointsController from "../controllers/Event/CRUDGatheringPoints.mjs";
export const gatheringPointsRouter=express.Router({mergeParams:true})
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";


gatheringPointsRouter.route('/')
.get(gatheringPointsController.getGatheringPoints)
.post(isAuthorizedMw('admin'),gatheringPointsController.addGatheringPoint)

gatheringPointsRouter.route('/:elementId')
.get(gatheringPointsController.getGatheringPoint)
.patch(isAuthorizedMw('admin'),gatheringPointsController.updateGatheringPoint)
.delete(isAuthorizedMw('admin'),gatheringPointsController.deleteGatheringPoint)
