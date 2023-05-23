import { json } from "express"
import { filterObj, jsonifyObj } from "../utils/objOp.mjs"
import { catchAsync } from "../utils/catchAsync.mjs"
import { AppError } from "../utils/AppError.mjs"
import { ResultsManager } from "../utils/ResultsManager.mjs"
//crud factory for BASIC classes : no childReferencing Docs

//!!!!!!! if used model has images, then images must be saved on model file not controller

/*
*this is only for plain endpoints : for example api/v1/events/:elementId
*this is not intended for nested endpoints :api/v1/events/:id/checkpoint/:elementId

*the CRUD for any object can be done using only its id, so no need for other params,
 and any other params needed by the model can be submitted in the request body
*the only function that doesnt need the elementId is the getAll function, it has an optional filter parameter for more dynamic use
*/


export const CreateOne=(Model,populate=undefined)=>{
    return catchAsync( async (req,res,next)=>{
        var filteredBody=filterObj(jsonifyObj(req.body),Model.schema.paths) 
        var filteredFiles;
        if (req.files)
            filteredFiles=filterObj(jsonifyObj(req.files),Model.schema.paths) 
            var newModelObject=await Model.create({...filteredBody,...filteredFiles})
        if (populate)
            await newModelObject.populate(populate.join(' '))
        return res.status(201).json({
            message:`${Model.collection.collectionName} created`,
            newModelObject
        })
        }
)}

/** params req.params: elementId -> referes to the requested document */
export const getOne=(Model,populate=[])=>{
    return catchAsync(  async (req,res,next)=>{
        const elementId=req.params.elementId
        var modelObject=Model.findOne({_id:elementId})
        populate.forEach(el=>{console.log(el);modelObject.populate(el)})
        modelObject=await modelObject

        if(!modelObject)
            return next(new AppError(404,`requested ${Model.collection.collectionName} of id ${elementId} doesn\'t exitst`))
    
        return res.status(200).json({
            message:`${Model.collection.collectionName} found`,
            modelObject
        })
})}

/** params req.params: elementId -> referes to the  document to be updated */
export const updateOne=(Model)=>{
    return catchAsync( async (req,res,next)=>{
        jsonifyObj(req.body)
        
        var filteredFiles;
        if (req.files)
            filteredFiles=filterObj(jsonifyObj(req.files),Model.schema.paths) 
        var update={...filterObj(req.body,Model.schema.paths),...filteredFiles}
        const elementId=req.params.elementId
        let newModelObject= await Model.findByIdAndUpdate(elementId,update,{
            new:true,
            runValidators :true
        })
        if(newModelObject)
            newModelObject=await newModelObject.save()
    if(!newModelObject){
        return next( new AppError(400,`requested ${Model.collection.collectionName} of id ${elementId} doesn\'t exitst`))
    }
    return res.status(200).json({
        message:'updated succesfully',
        newModelObject
    })
}
)}
/** params req.params: elementId -> referes to the  document to be deleted */
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

/** params None, filter: filteres the resources for requested id */

export const getAll=(Model,populate=[])=>{
    return catchAsync( async (req,res,next)=>{
        
        const elementId=req.params.elementId
        var results;
            results = new ResultsManager(Model.find(),req.query).filter().select().paginate().query
        if (populate)
            results.populate(populate.join(' '))
        results=await results
        if(!results)
            return next(new AppError(404,`requested ${Model.collection.collectionName} of id ${elementId} doesn\'t exitst`))
        return res.status(200).json({
            message:`${results.length} ${Model.collection.collectionName} found`,
            results
        })
})}

/** params req.params: elementId -> referes to the  document to be deleted */
export const no_Really__DeleteIt=(Model)=>{
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