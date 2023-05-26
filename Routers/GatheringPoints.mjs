import express from "express";
import * as gatheringPointsController from "../controllers/Event/CRUDGatheringPoints.mjs";
export const gatheringPointsRouter=express.Router({mergeParams:true})
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


gatheringPointsRouter.route('/')
.get(gatheringPointsController.getGatheringPoints)
.post(RBACAutorizerMw,gatheringPointsController.addGatheringPoint)

gatheringPointsRouter.route('/:elementId')
.get(gatheringPointsController.getGatheringPoint)
.patch(RBACAutorizerMw,gatheringPointsController.updateGatheringPoint)
.delete(RBACAutorizerMw,gatheringPointsController.deleteGatheringPoint)
