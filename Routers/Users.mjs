import express from "express";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

import { getUser } from "../controllers/User/getUser.mjs";
import { getusers } from "../controllers/User/getUsers.mjs";
import { myProfile } from "../controllers/User/myProfile.mjs";
import { getPendingUsers } from "../controllers/User/Admin/getPendingUsers.mjs";
import { confirmUser } from "../controllers/User/Admin/confirmMember.mjs";
import { deleteUser } from "../controllers/User/Admin/deleteUser.mjs";
import { declineUser } from "../controllers/User/Admin/declineUser.mjs";
import { editProfile } from "../controllers/User/editProfile.mjs";
import { myTasks } from "../controllers/User/myTasks.mjs";
import { editUser } from "../controllers/User/Admin/EditUser.mjs";

export const UserRouter = express.Router();

export const myProfileRouter = express.Router();
myProfileRouter.get('/',protect,myProfile)
myProfileRouter.patch("/", protect,editProfile);
myProfileRouter.get('/myTasks', protect,myTasks)


UserRouter.use('/myProfile',myProfileRouter)





UserRouter.get('/',isAuthorizedMw('admin'),getusers)
UserRouter.get("/getUsers", isAuthorizedMw("admin"), getusers);
UserRouter.get("/getPendingUsers", isAuthorizedMw("admin"), getPendingUsers);
UserRouter.delete("/deleteUser", isAuthorizedMw("admin"), deleteUser);
UserRouter.post("/declineUser", isAuthorizedMw("admin"), declineUser);
UserRouter.post("/confirmUser", isAuthorizedMw("admin"), confirmUser);
UserRouter.get("/:id", isAuthorizedMw("admin"), getUser);
UserRouter.patch("/:id", isAuthorizedMw("admin"), editUser);

