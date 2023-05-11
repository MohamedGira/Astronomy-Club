import express from "express";
import * as CommentsController from "../controllers/Comment/CRUDComment.mjs"
export const CommentRouter=express.Router()

import { protect } from "../controllers/Authentication/AuthUtils.mjs";

CommentRouter.use(protect)
CommentRouter.route('/')
.post(CommentsController.addComment)

CommentRouter.route('/delete/:elementId')
.delete(CommentsController.isAuthorizedtoChangeMw,CommentsController.DELETEIT)

CommentRouter.route('/to/:elementId').get(CommentsController.getCommentsFor)

CommentRouter.route('/:elementId')
.patch(CommentsController.isAuthorizedtoChangeMw, CommentsController.updateComment)
.delete(CommentsController.isAuthorizedtoChangeMw,CommentsController.deleteComment)
