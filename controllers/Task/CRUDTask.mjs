import { Task } from "../../models/Tasks/Task.mjs";
import {factory} from "../CRUDFactory/package.mjs";

// GET tasks/
export const  getTasks= factory.getAll(Task)

// POST tasks/
export const  addTask= factory.createOne(Task)

// GET tasks/:elementId 
export const  getTask= factory.getOne(Task)

// PATCH tasks/:elementId 
export const  updateTask= factory.updateOne(Task)

// DELETE tasks/:elementId
export const  deleteTask= factory.deleteOne(Task)
