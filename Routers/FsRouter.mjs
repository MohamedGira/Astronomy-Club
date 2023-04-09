import express from "express";

import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";
import { getfiles, removefile } from "../controllers/filesystem/fileOperations.mjs";

export const FsRouter=express.Router({mergeParams:true})
FsRouter.use(isAuthorizedMw('admin'))
FsRouter.route('/')
.get(getfiles)
.delete(removefile)
