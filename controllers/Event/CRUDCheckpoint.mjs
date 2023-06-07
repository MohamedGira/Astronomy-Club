import { Checkpoint } from "../../models/Events/subSchemas/checkpoint.mjs";
import {factory} from "../CRUDFactory/package.mjs";


export const getCheckpoints=factory.getAll(Checkpoint)
// POST events/:id/checkpoints 
export const  addCheckpoint= factory.createOne(Checkpoint)

// GET checkpoints/:elementId
// GET events/:id/checkpoints/:elementId
export const  getCheckpoint= factory.getOne(Checkpoint,['speaker'])

// PATCH /checkpoints/:elementId
export const  updateCheckpoint= factory.updateOne(Checkpoint)

// DELETE /checkpoints/:checkPointId 
export const  deleteCheckpoint=factory.deleteOne(Checkpoint)