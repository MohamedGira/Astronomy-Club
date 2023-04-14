import { Checkpoint } from "../../models/Events/subSchemas/checkpoint.mjs";
import {filterObj} from "../../utils/objOp.mjs"
import * as factory from "../CRUDFactory.mjs";


export const createCheckpoint= async(unfilteredBody,eventid)=>{
    //check if checkpoint has a speaker    
    var checkpointBody=filterObj(unfilteredBody,Checkpoint.schema.paths) 
    var newCheckpoint=await Checkpoint.create({...checkpointBody,event:eventid})
    return newCheckpoint
    }

export const getCheckpoints=factory.getAll(Checkpoint)
// POST events/:id/checkpoints 
export const  addCheckpoint= factory.CreateOne(Checkpoint)

// GET checkpoints/:elementId
// GET events/:id/checkpoints/:elementId
export const  getCheckpoint= factory.getOne(Checkpoint,['speaker'])

// PATCH /checkpoints/:elementId
export const  updateCheckpoint= factory.updateOne(Checkpoint)

// DELETE /checkpoints/:checkPointId 
export const  deleteCheckpoint=factory.deleteOne(Checkpoint)