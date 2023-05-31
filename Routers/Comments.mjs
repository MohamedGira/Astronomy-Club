import express from "express";
import * as CommentsController from "../controllers/Comment/CRUDComment.mjs"
export const CommentRouter=express.Router()


import { RBACAutorizerMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";
// middlewares are added in sequence


CommentRouter.route('/to/:elementId').get(CommentsController.getCommentsFor)


CommentRouter.use(RBACAutorizerMw)
CommentRouter.route('/')
.post(CommentsController.addComment)


//perminently delete a comment
CommentRouter.route('/delete/:elementId')
.delete(CommentsController.isAuthorizedtoChangeMw,CommentsController.DELETEIT)



CommentRouter.route('/:elementId')
.patch(CommentsController.isAuthorizedtoChangeMw, CommentsController.updateComment)
.delete(CommentsController.isAuthorizedtoChangeMw,CommentsController.deleteComment)
