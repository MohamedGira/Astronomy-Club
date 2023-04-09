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

//events/:id/gatheringPoints POST
export const  addGatheringPoint= factory.CreateOne(GatheringPoint,[{paramName:'id',nameInModel:'event'}])
// GET events/:id/gatheringPoints/:elementId 
// GET gatheringPoints/:elementId 
export const  getGatheringPoint= factory.getAll(GatheringPoint)

// PATCH events/:id/gatheringPoints/:elementId 
// PATCH gatheringPoints/:elementId 
export const  updateGatheringPoint= factory.updateOne(GatheringPoint)

// DELETE events/:id/gatheringPoints/:elementId
// DELETE gatheringPoints/:elementId
export const  deleteGatheringPoint= factory.deleteOne(GatheringPoint)