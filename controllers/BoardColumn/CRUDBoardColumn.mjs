import { BoardColumn } from "../../models/BoardColumns/BoardColumn.mjs";
import * as factory from "../CRUDFactory.mjs";

// GET BoardColumns/
export const  getBoardColumns= factory.getAll(BoardColumn)

// POST BoardColumns/
export const  addBoardColumn= factory.CreateOne(BoardColumn)

// GET BoardColumns/:elementId 
export const  getBoardColumn= factory.getOne(BoardColumn)

// PATCH BoardColumns/:elementId 
export const  updateBoardColumn= factory.updateOne(BoardColumn)

// DELETE BoardColumns/:elementId
export const  deleteBoardColumn= factory.deleteOne(BoardColumn)
