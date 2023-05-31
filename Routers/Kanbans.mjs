import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


export const KanbanRouter=express.Router()



import { getKanban } from "../controllers/Kanban/CRUDKanban.mjs";


KanbanRouter.route('/').get(
    RBACAutorizerMw, getKanban
)