import { GatheringPoint } from "../../../models/Events/subSchemas/gatheringPoint.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";

import {createSpeaker} from "../speakers/CRUDSpeaker.mjs"
import {filterObj,jsonifyObj} from "../../../utils/objOp.mjs"
import { Speaker } from "../../../models/Events/subSchemas/Speaker.mjs";


export const createGatheringPoint= async(unfilteredBody,eventid)=>{
    
    unfilteredBody=jsonifyObj(unfilteredBody)
    var gatheringPointBody=filterObj(unfilteredBody,GatheringPoint.schema.paths) 
    var newGatheringPoint=await GatheringPoint.create({...gatheringPointBody,event:eventid})
    return newGatheringPoint
}

//events/:id/gatheringPoints POST
export const  addGatheringPoint= catchAsync( async (req,res,next)=>{
    const id=req.params.id
    const newGatheringPoint=await createGatheringPoint(req.body,id)
  
    return res.status(201).json({
        message:'GatheringPoint created',
        newGatheringPoint
    })
})
//events/:id/gatheringPoints/:gatheringPointId get
export const  getGatheringPoint= catchAsync( async (req,res,next)=>{
    const eventid=req.params.id
    const gatheringPointid=req.params.gatheringPointId
    const gatheringPoint =await GatheringPoint.findOne({_id:gatheringPointid,event:eventid})
    if(!gatheringPoint)
        return next(new AppError(404,`requested GatheringPoint ${gatheringPointid} doesn\'t exitst`))

    return res.status(200).json({
        message:'gatheringPoint found',
        gatheringPoint
    })
})


//events/:id/gatheringPoints/:checkPointId patch
export const  updateGatheringPoint= catchAsync( async (req,res,next)=>{
    jsonifyObj(req.body)
    var update=filterObj(req.body,GatheringPoint.schema.paths)

    const gatheringPointid=req.params.gatheringPointId
    const newGatheringPoint= await GatheringPoint.findByIdAndUpdate(gatheringPointid,update,{
        new:true,
        runValidators:true
    })
    if(!newGatheringPoint){
        return next( new AppError(400,'requested gatheringPoint does\'t exits'))
    }
    return res.status(201).json({
        message:'updated succesfully',
        newGatheringPoint
    })
})

//events/:id/gatheringPoints/:checkPointId delete
export const  deleteGatheringPoint= catchAsync( async (req,res,next)=>{
    const eventid=req.params.id
    const gatheringPointid=req.params.gatheringPointId
    const gatheringPoint = await GatheringPoint.findOneAndDelete({_id:gatheringPointid,event:eventid})
    if(!gatheringPoint)
        return next(new AppError(404,'requested GatheringPoint doesn\'t exitst'))
    console.log('deleted gatheringPoint',gatheringPoint)

    return res.status(204).json({
        message:'deleted succesfully',
        gatheringPoint
    })
})
