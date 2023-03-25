import { Checkpoint } from "../../../models/Events/subSchemas/checkpoint.mjs";
import { catchAsync } from "../../../utils/catchAsync.mjs";


export const getCheckpoints=  catchAsync(async (req,res,next)=>{
const id= req.params.id
const checkpoints=await Checkpoint.find({event:id})
return res.status(200).json({checkpoints})

})