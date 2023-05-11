import express from "express";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw.mjs/Authorizer.mjs";
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

import { createTicket } from "../controllers/Ticket/createTicket.mjs";
import { getUser } from "../controllers/User/getUser.mjs";
import { getusers } from "../controllers/User/getUsers.mjs";
import { myProfile } from "../controllers/User/myProfile.mjs";
import { catchAsync } from "../utils/catchAsync.mjs";
import { getPendingUsers } from "../controllers/User/Admin.mjs/getPendingUsers.mjs";
import { confirmUser } from "../controllers/User/Admin.mjs/confirmMember.mjs";
import { deleteUser } from "../controllers/User/Admin.mjs/deleteUser.mjs";
import { declineUser } from "../controllers/User/Admin.mjs/declineUser.mjs";
import { editProfile } from "../controllers/User/editProfile.mjs";

export const UserRouter = express.Router();

UserRouter.get("/myProfile", protect, myProfile);
UserRouter.post("/editProfile", protect, editProfile);

UserRouter.get("/getUsers", isAuthorizedMw("admin"), getusers);
UserRouter.get("/getPendingUsers", isAuthorizedMw("admin"), getPendingUsers);
UserRouter.delete("/deleteUser", isAuthorizedMw("admin"), deleteUser);
UserRouter.post("/declineUser", isAuthorizedMw("admin"), declineUser);
UserRouter.post("/confirmUser", isAuthorizedMw("admin"), confirmUser);
UserRouter.get("/:id", isAuthorizedMw("admin"), getUser);
