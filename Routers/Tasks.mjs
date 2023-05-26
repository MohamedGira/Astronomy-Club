import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";


export const TaskRouter=express.Router()

import * as TasksController from "../controllers/Task/CRUDTask.mjs"


TaskRouter.use(RBACAutorizerMw)
TaskRouter.route('/')
.get(TasksController.getTasks)
.post( TasksController.addTask)

TaskRouter.route('/:elementId')
.get(TasksController.getTask)
.patch(TasksController.updateTask)
.delete(TasksController.deleteTask)
