import express from "express";
import { getCheckpoints } from "../controllers/Event/checkpoints/getCheckpoints.mjs";
import { addCheckpoint, deleteCheckpoint, getCheckpoint, updateCheckpoint } from "../controllers/Event/checkpoints/CRUDCheckpoint.mjs";
import { createEvent } from "../controllers/Event/createEvent.mjs";
import { getEvent } from "../controllers/Event/getEvent.mjs";
import { getEvents } from "../controllers/Event/getEvents.mjs";
import { updateEvent } from "../controllers/Event/updateEvent.mjs";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";
import { deleteEvent } from "../controllers/Event/deleteEvent.mjs";

export const EventRouter=express.Router()


EventRouter.route('/')
.post(createEvent)
.get(getEvents)
EventRouter.route('/:id')
.get(getEvent)
.patch(isAuthorizedMw('admin'),updateEvent)
.delete(isAuthorizedMw('admin'),deleteEvent)

EventRouter.route('/:id/checkpoints')
.get(getCheckpoints)
.post(isAuthorizedMw('admin'),addCheckpoint)


EventRouter.route('/:id/checkpoints/:checkpointId')
.get(getCheckpoint)
.patch(isAuthorizedMw('admin'),updateCheckpoint)
.delete(isAuthorizedMw('admin'),deleteCheckpoint)


