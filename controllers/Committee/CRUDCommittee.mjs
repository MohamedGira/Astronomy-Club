import { Committee } from "../../models/Committees/Committee.mjs";
import {factory} from "../CRUDFactory/package.mjs";

// GET tasks/
export const  getCommittees= factory.getAll(Committee)

// POST tasks/
export const  addCommittee= factory.createOne(Committee)

// GET tasks/:elementId 
export const  getCommittee= factory.getOne(Committee)

// PATCH tasks/:elementId 
export const  updateCommittee= factory.updateOne(Committee)

// DELETE tasks/:elementId
export const  deleteCommittee= factory.deleteOne(Committee)
