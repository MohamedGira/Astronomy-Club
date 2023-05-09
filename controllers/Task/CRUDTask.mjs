import { Task } from "../../models/Tasks/Task.mjs";
import {filterObj,jsonifyObj} from "../../utils/objOp.mjs"
import * as factory from "../CRUDFactory.mjs";


export const createTask= async(unfilteredBody)=>{
    
    unfilteredBody=jsonifyObj(unfilteredBody)
    var taskBody=filterObj(unfilteredBody,Task.schema.paths) 
    var newTask=await Task.create({...taskBody})
    return newTask
}


// GET tasks/
export const  getTasks= factory.getAll(Task)

// POST tasks/
export const  addTask= factory.CreateOne(Task)

// GET tasks/:elementId 
export const  getTask= factory.getOne(Task)

// PATCH tasks/:elementId 
export const  updateTask= factory.updateOne(Task)

// DELETE tasks/:elementId
export const  deleteTask= factory.deleteOne(Task)
