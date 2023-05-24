import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


export const BoardColumnRouter=express.Router()

import * as BoardColumnsController from "../controllers/BoardColumn/CRUDBoardColumn.mjs"


BoardColumnRouter.use(RBACAutorizerMw)
BoardColumnRouter.route('/')
.get(BoardColumnsController.getBoardColumns)
.post( BoardColumnsController.addBoardColumn)

BoardColumnRouter.route('/:elementId')
.get(BoardColumnsController.getBoardColumn)
.patch(BoardColumnsController.updateBoardColumn)
.delete(BoardColumnsController.deleteBoardColumn)
