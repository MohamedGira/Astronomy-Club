import express from "express";
import { getGatheringPoints,addGatheringPoint, deleteGatheringPoint, getGatheringPoint, updateGatheringPoint } from "../controllers/Event/gatheringPoints/CRUDGatheringPoints.mjs";
export const gatheringPointsRouter=express.Router({mergeParams:true})
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";


gatheringPointsRouter.route('/')
.get(getGatheringPoints)
.post(isAuthorizedMw('admin'),addGatheringPoint)

gatheringPointsRouter.route('/:elementId')
.get(getGatheringPoint)
.patch(isAuthorizedMw('admin'),updateGatheringPoint)
.delete(isAuthorizedMw('admin'),deleteGatheringPoint)
