import { json } from "express"
import { filterObj, jsonifyObj } from "../utils/objOp.mjs"
import { catchAsync } from "../utils/catchAsync.mjs"
import { AppError } from "../utils/AppError.mjs"
import { createImageObject } from "../utils/uploads/saveImage.mjs"
//crud factory for BASIC classes : No images or sub Images
//screw it .dont use
//extrass[{paramName,nameInModel},...]
//files[{fileName,nameInModel},...] : not implemented yet

function createExtrasObj(req,extras){
    let obj={}
    for(let i in extras){
        obj[extras[i].nameInModel]=req.params[extras[i].paramName]
    }
    console.log(obj)
    if (obj=={})
        return undefined
    return obj
 }
/*
async function ExtractImage(req,filesMap){
    let obj={}
    for (i in filesMap){
        if(!req.files.filesMap[i].fileName)
            throw new AppError(400.`field ${filesMap[i].fileName} wasn't provided `)
    }
    for (i in filesMap){
        obj[req.files.filesMap[i].nameInModel]=await createImageObject(req.files.filesMap[i].fileName)
            
    }
} */
export const CreateOne=(Model,extrasMap=[],hasFiles=false,filesMap=[])=>{
    /* extras: [{paramName,nameInthisModel},...] */
    return catchAsync( async (req,res,next)=>{
        var filteredBody=filterObj(jsonifyObj(req.body),Model.schema.paths) 
        const extraFields=createExtrasObj(req,extrasMap)      
        var newModelObject=await Model.create({...filteredBody,...extraFields})
        return res.status(201).json({
            message:'GatheringPoint created',
            newModelObject
        })
        }
)}

export const getAll=(Model,filter=undefined)=>{
    return catchAsync(  async (req,res,next)=>{
        const elementId=req.params.elementId
        var modelObject;
        if(!filter)
        modelObject =await Model.findById(elementId)
        else
        modelObject=await Model.find({_id:elementId,...filterObj(filter,Model.schema.paths)})

        if(!modelObject)
            return next(new AppError(404,`requested ${Model.collection.collectionName} of id ${elementId} doesn\'t exitst`))
    
        return res.status(200).json({
            message:`${Model.collection.collectionName} found`,
            modelObject
        })
})}

export const updateOne=(Model)=>{
return catchAsync( async (req,res,next)=>{
    jsonifyObj(req.body)
    var update=filterObj(req.body,Model.schema.paths)

    const elementId=req.params.elementId
    const newModelObject= await Model.findByIdAndUpdate(elementId,update,{
        new:true,
        runValidators:true
    })
    if(!newModelObject){
        return next( new AppError(400,`requested ${Model.collection.collectionName} of id ${elementId} doesn\'t exitst`))
    }
    return res.status(201).json({
        message:'updated succesfully',
        newModelObject
    })
}
)}

export const deleteOne=(Model)=>{
    return catchAsync( async (req,res,next)=>{
         const id=req.params.elementId
         const doc = await Model.findByIdAndDelete(id)
         if(!doc)
             return next(new AppError(404,`requested document ${id} doesn't exitst`))
         return res.status(204).json({
             message:'deleted succesfully',
             doc
         })
        }
)}
