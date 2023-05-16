import express from "express";
import { isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


export const TaskRouter=express.Router()

import * as TasksController from "../controllers/Task/CRUDTask.mjs"
import { protect } from "../controllers/Authentication/AuthUtils.mjs";

TaskRouter.use(protect)
TaskRouter.route('/')
.get(TasksController.getTasks)
.post( isAuthorizedMw('admin'),TasksController.addTask)

TaskRouter.route('/:elementId')
.get(TasksController.getTask)
.patch(isAuthorizedMw('admin'),TasksController.updateTask)
.delete(isAuthorizedMw('admin'),TasksController.deleteTask)
