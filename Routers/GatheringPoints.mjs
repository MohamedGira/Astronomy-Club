import express from "express";
import { addGatheringPoint, deleteGatheringPoint, getGatheringPoint, updateGatheringPoint } from "../controllers/Event/gatheringPoints/CRUDGatheringPoints.mjs";
import { getGatheringpoints } from "../controllers/Event/gatheringPoints/getGatheringpoints.mjs";
export const gatheringPointsRouter=express.Router({mergeParams:true})
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";


gatheringPointsRouter.route('/')
.get(getGatheringpoints)
.post(isAuthorizedMw('admin'),addGatheringPoint)

gatheringPointsRouter.route('/:elementId')
.get(getGatheringPoint)
.patch(isAuthorizedMw('admin'),updateGatheringPoint)
.delete(isAuthorizedMw('admin'),deleteGatheringPoint)
