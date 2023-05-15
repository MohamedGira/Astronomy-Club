import { Assignment } from "../../models/Assignments/Assignment.mjs";
import { BoardColumn } from "../../models/BoardColumns/BoardColumn.mjs";
import { Kanban } from "../../models/Kanban/Kanban.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"

export const getCommiteeKanban=catchAsync( async (req,res,next)=>{
    let kanban=await Kanban.findOne({committee:req.params.elementId})
    let tasks=[];
    
    kanban.boardColumns.forEach(col=>{
        tasks=tasks.concat(col.tasks)
        col.tasks=col.tasks.map(el=>el._id)
        }
    )
    kanban._doc.tasks=tasks    
    return res.status(200).json({
        message:`${Kanban.collection.collectionName} found`,
        kanban
    })
})