import express from "express";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


export const BoardColumnRouter=express.Router()

import * as BoardColumnsController from "../controllers/BoardColumn/CRUDBoardColumn.mjs"
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

BoardColumnRouter.use(protect)
BoardColumnRouter.route('/')
.get(BoardColumnsController.getBoardColumns)
.post( isAuthorizedMw('admin'),BoardColumnsController.addBoardColumn)

BoardColumnRouter.route('/:elementId')
.get(BoardColumnsController.getBoardColumn)
.patch(isAuthorizedMw('admin'),BoardColumnsController.updateBoardColumn)
.delete(isAuthorizedMw('admin'),BoardColumnsController.deleteBoardColumn)
