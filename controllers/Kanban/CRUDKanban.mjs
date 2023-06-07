import { Kanban } from "../../models/Kanban/Kanban.mjs";
import {factory} from "../CRUDFactory/package.mjs";


//YAGNI

// GET kanbans/
export const  getKanbans= factory.getAll(Kanban,[],
    {executePre:[async(req,res,next)=>{
        let kanban=await Kanban.findOne({committee:req.params.elementId})
        if(!kanban){
            kanban = await Kanban.create({committee:req.params.elementId}).populate('boardColumns')
        }
    }]}
    )

// POST kanbans/
export const  addKanban= factory.createOne(Kanban)

// GET kanbans/:elementId 
export const  getKanban= factory.getOne(Kanban)

// PATCH kanbans/:elementId 
export const  updateKanban= factory.updateOne(Kanban)

// DELETE kanbans/:elementId
export const  deleteKanban= factory.deleteOne(Kanban)
