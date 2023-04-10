import { Checkpoint } from "../../../models/Events/subSchemas/checkpoint.mjs";
import { GatheringPoint } from "../../../models/Events/subSchemas/gatheringPoint.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";



export const getGatheringpointsbyId= async (id)=>{
    return GatheringPoint.find({event:id})
}

export const getGatheringpoints=  catchAsync(async (req,res,next)=>{
const Gatheringpoints =await getGatheringpointsbyId(req.params.id)
if (!Gatheringpoints)
    return res.status(200).json({count:0,Gatheringpoints})
return res.status(200).json({count:Gatheringpoints.length,Gatheringpoints})

})