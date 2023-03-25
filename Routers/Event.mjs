import express from "express";
import { createEvent } from "../controllers/Event/createEvent.mjs";
import { getEvent } from "../controllers/Event/getEvent.mjs";
import { getEvents } from "../controllers/Event/getEvents.mjs";
import { updateEvent } from "../controllers/Event/updateEvent.mjs";

export const EventRouter=express.Router()


EventRouter.route('/')
.post(createEvent)
.get(getEvents)
EventRouter.route('/:id')
.get(getEvent)
.patch(updateEvent)

console.log( new Date(Date.now()).toISOString())
