import { Kanban } from "../../models/Kanban/Kanban.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"

export const getCommiteeKanban=catchAsync( async (req,res,next)=>{
    let kanban=await Kanban.find({committee:req.params.elementId})
    return res.status(200).json({
        message:`${Committee.collection.collectionName} created`,
        kanban
    })
    
})