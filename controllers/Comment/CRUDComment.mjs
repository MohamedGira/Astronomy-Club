import { Comment } from "../../models/Comment.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { filterObj, jsonifyObj } from "../../utils/objOp.mjs";
import * as factory from "../CRUDFactory.mjs";


export const  getCommentsTreeFor= async (id)=>{
let comments=await Comment.find({to:id}).populate('by','_id firstName lastName profileImage')
for (let commentid  in comments){
    comments[commentid]._doc.replies= await getCommentsTreeFor(comments[commentid]._id)
} 
return comments
}

export const isAuthorizedtoChangeMw= catchAsync( async (req,res,next)=>{
    var comment= await Comment.findById(req.params.elementId)
    if(!comment)
        return next( new AppError(400,`requested ${Comment.collection.collectionName} of id ${req.params.elementId} doesn\'t exitst`))
    console.log(Object.prototype.toString(comment.by))
    if (Object.prototype.toString(comment.by)!=Object.prototype.toString(req.user._id))
        return next( new AppError(401,`unauthorized to edit this comment`))
    req.comment=comment
    next()
})

// GET comments/for/:elementId 
export const  getCommentsFor= catchAsync(async (req,res,next)=>{
    console.log(req.params.elementId)
    var comments=await getCommentsTreeFor(req.params.elementId)
    return res.status(201).json({
        message:`${comments.length} ${Comment.collection.collectionName} found`,
        comments
    })
})

// POST comments

export const  addComment=catchAsync(  async (req,res,next)=>{
    var filteredBody=filterObj(jsonifyObj(req.body),Comment.schema.paths,['by']) 
    var comment=await Comment.create({...filteredBody,by:req.user._id})
    return res.status(201).json({
        message:`${Comment.collection.collectionName} created`,
        comment
    })
    }
    )

// GET comments/:elementId 
export const  getComment= factory.getOne(Comment)

// PATCH comments/:elementId 
export const  updateComment= catchAsync( async (req,res,next)=>{
    req.comment.history.push({'content':req.comment.content,'at':req.comment.updatedAt})
    req.comment.content=req.body.content
    await req.comment.save()
    return res.status(200).json({
        message:'updated succesfully',
        comment:req.comment
    })
}
)

// DELETE comments/:elementId
export const  deleteComment= catchAsync( async (req,res,next)=>{
    req.comment.deleted=true
    await req.comment.save()
    return res.status(204).json({
        message:'deleted succesfully',
        "comment":req.comment
    })
}
)
export const DELETEIT=factory.deleteOne(Comment)