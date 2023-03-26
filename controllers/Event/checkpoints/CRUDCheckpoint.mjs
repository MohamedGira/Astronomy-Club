import { Checkpoint } from "../../../models/Events/subSchemas/checkpoint.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";
import { saveImage } from "../../../utils/image/saveImage.mjs";

import {createSpeaker} from "../speakers/CRUDSpeaker.mjs"
import {filterObj,jsonifyObj} from "../../../utils/objOp.mjs"
import { Speaker } from "../../../models/Events/subSchemas/Speaker.mjs";


export const createCheckpoint= async(unfilteredBody,eventid,reqfiles=undefined)=>{
    //check if checkpoint has a speaker    
    var newSpeaker={}
    if(unfilteredBody.speaker){
        newSpeaker=await createSpeaker(unfilteredBody.speaker,reqfiles)
    }   
    unfilteredBody=jsonifyObj(unfilteredBody)
    var checkpointBody=filterObj(unfilteredBody,Checkpoint.schema.paths,['speaker']) 
    var newCheckpoint=await Checkpoint.create({...checkpointBody,event:eventid,speaker:newSpeaker._id})
    return newCheckpoint
        
    }

//events/:id POST
export const  addCheckpoint= catchAsync( async (req,res,next)=>{
    const id=req.params.id
    const newCheckpoint=await createCheckpoint(req.body,id,req.files)
  
    return res.status(201).json({
        message:'Checkpoint created',
        newCheckpoint
    })
})
//events/:id/checkpoints/:checkPointId get
export const  getCheckpoint= catchAsync( async (req,res,next)=>{
    const eventid=req.params.id
    const checkpointid=req.params.checkpointId
    const checkpoint =await Checkpoint.findOne({_id:checkpointid,event:eventid}).populate('speaker')
    if(!checkpoint)
        return next(new AppError(404,`requested Checkpoint ${checkpointid} doesn\'t exitst`))

    return res.status(200).json({
        message:'checkpoint found',
        checkpoint
    })
})


//events/:id/checkpoints/:checkPointId patch
export const  updateCheckpoint= catchAsync( async (req,res,next)=>{
    jsonifyObj(req.body)
    var update=filterObj(req.body,Checkpoint.schema.paths,['speaker'])

    const checkpointid=req.params.checkpointId
    const newCheckpoint= await Checkpoint.findByIdAndUpdate(checkpointid,update,{
        new:true,
        runValidators:true
    })
    if(!newCheckpoint){
        return next( new AppError(400,'requested checkpoint does\'t exits'))
    }
    
    // speaker was edited
    var newSpeaker={}
    if(req.body.speaker){
        newSpeaker=await createSpeaker(req.body.speaker,req.body.files)
        Speaker.findByIdAndDelete(newCheckpoint.speaker)
        newCheckpoint.speaker=newSpeaker
    } 
    newCheckpoint.save()
    return res.status(200).json({
        message:'Updated succesfully',
        newCheckpoint
    })
})

//events/:id/checkpoints/:checkPointId delete
export const  deleteCheckpoint= catchAsync( async (req,res,next)=>{
    const eventid=req.params.id
    const checkpointid=req.params.checkpointId
    const checkpoint = await Checkpoint.findOneAndDelete({_id:checkpointid,event:eventid})
    if(!checkpoint)
        return next(new AppError(404,'requested Checkpoint doesn\'t exitst'))
    console.log('deleted checkpoint',checkpoint)

    return res.status(204).json({
        message:'deleted succesfully',
        checkpoint
    })
})
