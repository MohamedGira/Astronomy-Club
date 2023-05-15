import { Kanban } from "../../models/Kanban/Kanban.mjs"
import { catchAsync } from "../../utils/catchAsync.mjs"

export const getCommiteeKanban=catchAsync( async (req,res,next)=>{
    let kanban=await Kanban.findOne({committee:req.params.elementId})
    let tasks=[];
    for (let i in kanban.boardColumns){
        let t=kanban.boardColumns[i].tasks
        tasks=tasks.concat(t)
        kanban.boardColumns[i].tasks=t.map(el=>el._id)
    }
    kanban._doc.tasks=tasks
    
    return res.status(200).json({
        message:`${Kanban.collection.collectionName} created`,
        kanban
    })
})