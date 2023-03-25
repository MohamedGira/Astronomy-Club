import express from "express";
import { getCheckpoints } from "../controllers/Event/checkpoints/getChechpoints.mjs";
import { createCheckpoint, deleteCheckpoint, getCheckpoint, updateCheckpoint } from "../controllers/Event/checkpoints/CRUDCheckpoint.mjs";
import { createEvent } from "../controllers/Event/createEvent.mjs";
import { getEvent } from "../controllers/Event/getEvent.mjs";
import { getEvents } from "../controllers/Event/getEvents.mjs";
import { updateEvent } from "../controllers/Event/updateEvent.mjs";
import { isAuthorized } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";

export const EventRouter=express.Router()


EventRouter.route('/')
.post(createEvent)
.get(getEvents)
EventRouter.route('/:id')
.get(getEvent)
.patch(isAuthorized('admin'),updateEvent)

EventRouter.route('/:id/checkpoints')
.get(getCheckpoints)
.post(isAuthorized('admin'),createCheckpoint)


EventRouter.route('/:id/checkpoints/:checkpointId')
.get(getCheckpoint)
.patch(isAuthorized('admin'),updateCheckpoint)
.delete(isAuthorized('admin'),deleteCheckpoint)


