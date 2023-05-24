import express from "express";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";
export const EndpointRouter=express.Router()
import * as EndpointControllerrmission from "../controllers/Endpoint/EndpointController.mjs"
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

EndpointRouter.use(protect)
EndpointRouter.route('/')
.get(EndpointControllerrmission.getEndpoints)
EndpointRouter.route('/:elementId')
.get(EndpointControllerrmission.getEndpoint)

