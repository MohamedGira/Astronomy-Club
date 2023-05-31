import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


export const CommitteeRouter=express.Router()

import * as CommitteesController from "../controllers/Committee/CRUDCommittee.mjs"

import { getCommiteeKanban } from "../controllers/Committee/Kanban.mjs";

CommitteeRouter.route('/')
.get(CommitteesController.getCommittees)
.post( RBACAutorizerMw,CommitteesController.addCommittee)

CommitteeRouter.route('/:elementId')
.get(CommitteesController.getCommittee)
.patch(RBACAutorizerMw,CommitteesController.updateCommittee)
.delete(RBACAutorizerMw,CommitteesController.deleteCommittee)
CommitteeRouter.route('/:elementId/kanban').get(
    RBACAutorizerMw, getCommiteeKanban
)