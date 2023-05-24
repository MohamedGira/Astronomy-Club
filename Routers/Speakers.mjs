import express from "express";
import * as speakerController from '../controllers/Event/CRUDSpeaker.mjs'
export const SpeakerRouter=express.Router({mergeParams:true})
import { RBACAutorizerMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


SpeakerRouter.route('/')
.get(speakerController.getSpeakers)
.post(RBACAutorizerMw,speakerController.addSpeaker)

SpeakerRouter.route('/:elementId')
.get(speakerController.getSpeaker)
.patch(RBACAutorizerMw,speakerController.updateSpeaker)
.delete(RBACAutorizerMw,speakerController.deleteSpeaker)
