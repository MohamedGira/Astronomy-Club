import express from "express";
import * as speakerController from '../controllers/Event/CRUDSpeaker.mjs'
export const SpeakerRouter=express.Router({mergeParams:true})
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";


SpeakerRouter.route('/')
.get(speakerController.getSpeakers)
.post(isAuthorizedMw('admin'),speakerController.addSpeaker)

SpeakerRouter.route('/:elementId')
.get(speakerController.getSpeaker)
.patch(isAuthorizedMw('admin'),speakerController.updateSpeaker)
.delete(isAuthorizedMw('admin'),speakerController.deleteSpeaker)
