import express from "express";

import {  createEvent } from "../controllers/Event/CRUDEvent/createEvent.mjs";
import { getEvent } from "../controllers/Event/CRUDEvent/getEvent.mjs";
import { getAllEvents } from "../controllers/Event/CRUDEvent/getEvents.mjs";
import {  updateEvent2 } from "../controllers/Event/CRUDEvent/updateEvent.mjs";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";
import { deleteEvent } from "../controllers/Event/CRUDEvent/deleteEvent.mjs";

import { CheckpointsRouter } from "./Checkpoints.mjs";
import { gatheringPointsRouter } from "./GatheringPoints.mjs";
import { eventTypesRouter } from "./EventTypes.mjs";

export const EventRouter=express.Router()


function populateId(req,res,next){
    req.myFilter={event:req.params.id}
    if (req.params.id)
        req.body.event=req.params.id

    return next()
}

EventRouter.route('/')
.get(getAllEvents)
.post(RBACAutorizerMw,createEvent)


EventRouter.route('/:elementId')
.get(getEvent)
.patch(RBACAutorizerMw,updateEvent2)
.delete(RBACAutorizerMw,deleteEvent)





EventRouter.use('/:id/checkpoints',populateId,CheckpointsRouter)
EventRouter.use('/:id/gatheringPoints',populateId,gatheringPointsRouter)
