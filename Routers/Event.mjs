import express from "express";
import { createEvent } from "../controllers/Event/RESTAPI/createEvent.mjs";
import { updateEvent } from "../controllers/Event/RESTAPI/updateEvent.mjs";
import {catchAsync} from "../utils/catchAsync.mjs";

export const EventRouter=express.Router()


EventRouter.post('/',catchAsync(createEvent))
EventRouter.patch('/:id',catchAsync(updateEvent))

console.log( new Date(Date.now()).toISOString())
