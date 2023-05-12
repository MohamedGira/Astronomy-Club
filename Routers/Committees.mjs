import express from "express";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


export const CommitteeRouter=express.Router()

import * as CommitteesController from "../controllers/Committee/CRUDCommittee.mjs"
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

CommitteeRouter.use(protect)
CommitteeRouter.route('/')
.get(CommitteesController.getCommittees)
.post( isAuthorizedMw('admin'),CommitteesController.addCommittee)

CommitteeRouter.route('/:elementId')
.get(CommitteesController.getCommittee)
.patch(isAuthorizedMw('admin'),CommitteesController.updateCommittee)
.delete(isAuthorizedMw('admin'),CommitteesController.deleteCommittee)
