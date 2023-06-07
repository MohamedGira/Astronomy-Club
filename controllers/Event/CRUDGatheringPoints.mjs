import { GatheringPoint } from "../../models/Events/subSchemas/gatheringPoint.mjs";
import {factory} from "../CRUDFactory/package.mjs";



// GET gatheringPoints/
export const  getGatheringPoints= factory.getAll(GatheringPoint)

// POST gatheringPoints/
export const  addGatheringPoint= factory.createOne(GatheringPoint)

// GET gatheringPoints/:elementId 
export const  getGatheringPoint= factory.getOne(GatheringPoint)

// PATCH gatheringPoints/:elementId 
export const  updateGatheringPoint= factory.updateOne(GatheringPoint)

// DELETE gatheringPoints/:elementId
export const  deleteGatheringPoint= factory.deleteOne(GatheringPoint)
