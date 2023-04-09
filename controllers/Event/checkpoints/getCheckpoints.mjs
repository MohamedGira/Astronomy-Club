import { Checkpoint } from "../../../models/Events/subSchemas/checkpoint.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";



export const getCheckpointsbyId= async (id)=>{
    return Checkpoint.find({event:id}).populate('speaker').sort('startsAt')
}

export const getCheckpoints=  catchAsync(async (req,res,next)=>{

const checkpoints =await getCheckpointsbyId(req.params.id)
if (!checkpoints)
    return res.status(200).json({count:0,checkpoints})
return res.status(200).json({count:checkpoints.length,checkpoints})

})