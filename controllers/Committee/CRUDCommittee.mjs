import { Committee } from "../../models/Committees/Committee.mjs";
import * as factory from "../CRUDFactory.mjs";

// GET tasks/
export const  getCommittees= factory.getAll(Committee)

// POST tasks/
export const  addCommittee= factory.CreateOne(Committee)

// GET tasks/:elementId 
export const  getCommittee= factory.getOne(Committee,['kanban'])

// PATCH tasks/:elementId 
export const  updateCommittee= factory.updateOne(Committee)

// DELETE tasks/:elementId
export const  deleteCommittee= factory.deleteOne(Committee)
