import { Kanban } from "../../models/Kanbans/Kanban.mjs";
import * as factory from "../CRUDFactory.mjs";


//YAGNI

// GET kanbans/
export const  getKanbans= factory.getAll(Kanban)

// POST kanbans/
export const  addKanban= factory.CreateOne(Kanban)

// GET kanbans/:elementId 
export const  getKanban= factory.getOne(Kanban)

// PATCH kanbans/:elementId 
export const  updateKanban= factory.updateOne(Kanban)

// DELETE kanbans/:elementId
export const  deleteKanban= factory.deleteOne(Kanban)
