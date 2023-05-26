import express from "express";
import * as eventTypesController from "../controllers/Event/EventType.mjs";
export const eventTypesRouter=express.Router({mergeParams:true})
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


eventTypesRouter.route('/')
.get(eventTypesController.getEventTypes)
.post(RBACAutorizerMw,eventTypesController.addEventType)

eventTypesRouter.route('/:elementId')
.get(eventTypesController.getEventType)
.patch(RBACAutorizerMw,eventTypesController.updateEventType)
.delete(RBACAutorizerMw,eventTypesController.deleteEventType)
