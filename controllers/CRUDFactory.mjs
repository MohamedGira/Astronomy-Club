import { json } from "express"
import { filterObj, jsonifyObj } from "../utils/objOp.mjs"
import { catchAsync } from "../utils/catchAsync.mjs"
import { AppError } from "../utils/AppError.mjs"
import { ResultsManager } from "../utils/ResultsManager.mjs"
import { saveImage } from "../utils/uploads/saveImage.mjs"
import { deleteFile } from "../utils/uploads/cleanDir.mjs"
//crud factory for BASIC classes : no childReferencing Docs


/*
*this is only for plain endpoints : for example api/v1/events/:elementId
*this is not intended for nested endpoints :api/v1/events/:id/checkpoint/:elementId

*the CRUD for any object can be done using only its id, so no need for other params,
 and any other params needed by the model can be submitted in the request body
*the only function that doesnt need the elementId is the getAll function, it has an optional filter parameter for more dynamic use
*/


export const CreateOne=(Model,populate=undefined,options={executePost:()=>{},
executePre:[async()=>{}]})=>{
    return catchAsync( async (req,res,next)=>{
        var filteredBody=filterObj(jsonifyObj(req.body),Model.schema.paths) 
        if(options.executePre)
            for (let i in options.executePre)
                try{
                    await options.executePre[i](req,res,next) }
                catch(err){
                    return next(err)
                }
        
        //creating the model
        var newModelObject=await Model(filteredBody)
                 
         //Handling images saving    
         let imgslist=[]
         try{
             for (let key in req.files){
                 //case1: model has an array of images
                 if(Model.schema.paths[key].instance=='Array'){
                    if(!Array.isArray(req.files[key]))
                         req.files[key]=[req.files[key]]
                    for (let img in req.files[key]){
                        let imgname=await saveImage(req.files[key][img])
                        newModelObject[key].push(imgname)
                        imgslist.push(imgname)
                        }
                 //case2: model has a single image
                 }else if(Model.schema.paths[key].instance=='String'){
                    let imgname=await saveImage(req.files[key])
                     newModelObject[key]=imgname
                     imgslist.push(imgname)
                 }
            }
         }catch(err){
             try{
                await Model.findByIdAndDelete(newModelObject._id)
                imgslist.forEach(el=>deleteFile(el,'images'))
             }catch(e){}
             console.log(`couldn\'t create ${Model.collection.collectionName}, imgs issue`)
             return next(new AppError(400,'image saving issue: '+err.message))
         }
        await newModelObject.save()

        //populating the model
        if (populate.length>0)
            await newModelObject.populate(populate.join(' '))
        if(options.executePost)
            options.executePost()
        return res.status(201).json({
            message:`${Model.collection.collectionName} created`,
            newModelObject
        })
        }
)}

/** params req.params: elementId -> referes to the requested document */
export const getOne=(Model,populate=[],options={executePost:()=>{},
executePre:[()=>{}],showDeleted:false},name=undefined)=>{

    return catchAsync(  async (req,res,next)=>{
        //fetching the element
        
        const elementId=req.params.elementId
        var modelObject=Model.findOne({_id:elementId}).select('-__v -elementStatus')
        //populating the element
        if (populate)
            modelObject.populate(populate.join(' '))
        //checking if must show deleted
        if(options.showDeleted)
            modelObject.where({'elementStatus.isDeleted':true})
        else
            modelObject.where({'elementStatus.isDeleted':{$ne:true}})

        //executing the query
        modelObject=await modelObject

        if(!modelObject)
            return next(new AppError(404,`requested ${Model.collection.collectionName} of id ${elementId} doesn\'t exitst`))
        if(!name)
            name=Model.collection.collectionName
        return res.status(200).json({
            message:`${name} found`,
            modelObject
        })
})}

/** params req.params: elementId -> referes to the  document to be updated */
/** Image saving must be handled in executePres */
export const updateOne=(Model,filterout=[],options={executePost:()=>{},
executePre:[async()=>{}]})=>{
    return catchAsync( async (req,res,next)=>{
        if(options.executePre)
            for (let i in options.executePre)     
                    await options.executePre[i](req,res,next)
        
        console.log(jsonifyObj(req.body))

        var update={...filterObj(jsonifyObj(req.body),Model.schema.paths,...filterout)}
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
    if(options.executePost)
        options.executePost()
        
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
        const doc = await Model.findById(id)
        
        if(!doc)
            return next(new AppError(404,`requested document ${id} doesn't exitst`))
        doc.elementStatus.isDeleted=true
        doc.elementStatus.deletedBy=req.user._id
        await doc.save()
        return res.status(204).json({
            message:'deleted succesfully',
            doc
        })
    }
)}

/** params None, filter: filteres the resources for requested id */
export const getAll=(Model,populate=[], 
    options={executePost:()=>{},executePre:[()=>{}],showDeleted:false,onlyOne:false},name=undefined)=>{
    return catchAsync( async (req,res,next)=>{
        if(options.executePre)
            for (let i in options.executePre)    
                await options.executePre[i](req,res,next)
                
        
        const elementId=req.params.elementId
        var results;
            results = new ResultsManager(Model.find().select('-__v -elementStatus'),req.query).filter().select().paginate().query
        //checking if must show deleted
        if(options.showDeleted)
            results.where({'elementStatus.isDeleted':true})
        else
            results.where({'elementStatus.isDeleted':{$ne:true}})
        //populating requested fields
        if (populate)
            results.populate(populate.join(' '))

        results=await results
        if(!name)
            name=Model.collection.collectionName
        if(!results)
            return next(new AppError(404,`requested ${name} of id ${elementId} doesn\'t exitst`))
        if(options.onlyOne && results.length==1)
            results=results[0]
        return res.status(200).json({
            message:`${results.length} ${name} found`,
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