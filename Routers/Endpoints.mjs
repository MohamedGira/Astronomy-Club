import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";
export const EndpointRouter=express.Router()
import * as EndpointController from "../controllers/Endpoint/EndpointController.mjs"


EndpointRouter.use(RBACAutorizerMw)
EndpointRouter.route('/')
.get(EndpointController.getEndpoints)
EndpointRouter.route('/:elementId')
.get(EndpointController.getEndpoint)

