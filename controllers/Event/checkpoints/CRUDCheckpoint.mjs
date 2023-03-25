import { Checkpoint } from "../../../models/Events/subSchemas/checkpoint.mjs";
import { AppError } from "../../../utils/AppError.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";

//events/:id POST
export const  createCheckpoint= catchAsync( async (req,res,next)=>{
    var body={}
    for( var key in Checkpoint.schema.paths){
        if (key in req.body){
            body[key]=req.body[key]
        }
    }
    const id=req.params.id
    const newCheckpoint= await Checkpoint.create({...body,event:id})
    return res.status(201).json({
        message:'Checkpoint created',
        newCheckpoint
    })
})
//events/:id/checkpoints/:checkPointId get
export const  getCheckpoint= catchAsync( async (req,res,next)=>{
    const eventid=req.params.id
    const checkpointid=req.params.checkpointId
    const checkpoint =await Checkpoint.findOne({_id:checkpointid,event:eventid})
    if(!checkpoint)
        return next(new AppError(404,`requested Checkpoint ${checkpointid} doesn\'t exitst`))

    return res.status(200).json({
        message:'checkpoint found',
        checkpoint
    })
})


//events/:id/checkpoints/:checkPointId patch
export const  updateCheckpoint= catchAsync( async (req,res,next)=>{
    var update={}
    for( var key in Checkpoint.schema.paths){
        if (key in req.body){
            update[key]=req.body[key]
        }
    }
    const checkpointid=req.params.checkpointId
    const newCheckpoint= await Checkpoint.findByIdAndUpdate(checkpointid,update,{
        new:true,
        runValidators:true
    })
    if(!newCheckpoint){
        return next( new AppError(400,'requested checkpoint does\'t exits'))
    }
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
