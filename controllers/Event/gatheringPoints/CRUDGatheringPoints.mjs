import { GatheringPoint } from "../../../models/Events/subSchemas/gatheringPoint.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";

import {createSpeaker} from "../speakers/CRUDSpeaker.mjs"
import {filterObj,jsonifyObj} from "../../../utils/objOp.mjs"
import { Speaker } from "../../../models/Events/subSchemas/Speaker.mjs";
import * as factory from "../../CRUDFactory.mjs";


export const createGatheringPoint= async(unfilteredBody,eventid)=>{
    
    unfilteredBody=jsonifyObj(unfilteredBody)
    var gatheringPointBody=filterObj(unfilteredBody,GatheringPoint.schema.paths) 
    var newGatheringPoint=await GatheringPoint.create({...gatheringPointBody,event:eventid})
    return newGatheringPoint
}


// GET gatheringPoints/
export const  getGatheringPoints= factory.getAll(GatheringPoint)

// POST gatheringPoints/
export const  addGatheringPoint= factory.CreateOne(GatheringPoint)

// GET gatheringPoints/:elementId 
export const  getGatheringPoint= factory.getOne(GatheringPoint)

// PATCH gatheringPoints/:elementId 
export const  updateGatheringPoint= factory.updateOne(GatheringPoint)

// DELETE gatheringPoints/:elementId
export const  deleteGatheringPoint= factory.deleteOne(GatheringPoint)
