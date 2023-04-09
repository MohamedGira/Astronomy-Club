import express from "express";

import { createEvent } from "../controllers/Event/createEvent.mjs";
import { getEvent } from "../controllers/Event/getEvent.mjs";
import { getEvents } from "../controllers/Event/getEvents.mjs";
import { updateEvent } from "../controllers/Event/updateEvent.mjs";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";
import { deleteEvent } from "../controllers/Event/deleteEvent.mjs";

import { CheckpointsRouter } from "./Checkpoints.mjs";
import { gatheringPointsRouter } from "./GatheringPoints.mjs";

export const EventRouter=express.Router()




EventRouter.route('/')
.get(getEvents)
.post(isAuthorizedMw('admin'),createEvent)
EventRouter.route('/:id')
.get(getEvent)
.patch(isAuthorizedMw('admin'),updateEvent)
.delete(isAuthorizedMw('admin'),deleteEvent)





EventRouter.use('/:id/checkpoints',CheckpointsRouter)
EventRouter.use('/:id/gatheringPoints',gatheringPointsRouter)
