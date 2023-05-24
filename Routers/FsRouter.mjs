import express from "express";

import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";
import { getfiles, removefile } from "../controllers/filesystem/fileOperations.mjs";

export const FsRouter=express.Router({mergeParams:true})
FsRouter.use(RBACAutorizerMw)
FsRouter.route('/')
.get(getfiles)
.delete(removefile)
