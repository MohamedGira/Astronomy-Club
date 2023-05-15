import express from "express";
import * as eventTypesController from "../controllers/Event/EventType.mjs";
export const eventTypesRouter=express.Router({mergeParams:true})
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


eventTypesRouter.route('/')
.get(eventTypesController.getEventTypes)
.post(isAuthorizedMw('admin'),eventTypesController.addEventType)

eventTypesRouter.route('/:elementId')
.get(eventTypesController.getEventType)
.patch(isAuthorizedMw('admin'),eventTypesController.updateEventType)
.delete(isAuthorizedMw('admin'),eventTypesController.deleteEventType)