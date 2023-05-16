import { Assignment } from "../../models/Assignments/Assignment.mjs";
import {filterObj,jsonifyObj} from "../../utils/objOp.mjs"
import * as factory from "../CRUDFactory.mjs";

// GET assignments/
export const  getAssignments= factory.getAll(Assignment)

// POST assignments/
export const  addAssignment= factory.CreateOne(Assignment,['userID'])

// GET assignments/:elementId 
export const  getAssignment= factory.getOne(Assignment)

// PATCH assignments/:elementId 
export const  updateAssignment= factory.updateOne(Assignment)

// DELETE assignments/:elementId
export const  deleteAssignment= factory.deleteOne(Assignment)
