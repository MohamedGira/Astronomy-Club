import { BoardColumn } from "../../models/BoardColumns/BoardColumn.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import * as factory from "../CRUDFactory.mjs";

// GET BoardColumns/
export const  getBoardColumns= catchAsync( async (req,res,next)=>{
    const boardColumns=await BoardColumn.find().select('id name').populate({path:"tasks", select:'_id'})
    boardColumns.forEach(el=>{el.tasks=el.tasks.map(el=>el._id)})
    if(!boardColumns)
        return res.status(404).json({
            message:"couldn't find any boardColumns",
        });
    return res.status(200).json({
        message:"sucess",
        count:boardColumns.length,
        boardColumns
    });
})

// POST BoardColumns/
export const  addBoardColumn= factory.CreateOne(BoardColumn)

// GET BoardColumns/:elementId 
export const getBoardColumn = catchAsync(  async (req,res,next)=>{
        const elementId=req.params.elementId
        const populate= ["tasks"]
        var modelObject=BoardColumn.findOne({_id:elementId})
        populate.forEach(el=>{console.log(el);modelObject.populate({path:el, select:'_id'})})
        modelObject=await modelObject
        modelObject.tasks=modelObject.tasks.map(el=>el._id)

        if(!modelObject)
            return next(new AppError(404,`requested ${BoardColumn.collection.collectionName} of id ${elementId} doesn\'t exitst`))
    
        return res.status(200).json({
            message:`${BoardColumn.collection.collectionName} found`,
            modelObject
        })
})

// PATCH BoardColumns/:elementId 
export const  updateBoardColumn= factory.updateOne(BoardColumn)

// DELETE BoardColumns/:elementId
export const  deleteBoardColumn= factory.deleteOne(BoardColumn)
