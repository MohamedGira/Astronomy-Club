import mongoose from "mongoose";
import dotenv from "dotenv";
import { Task } from "../Tasks/Task.mjs";

dotenv.config()
import { elementStatusSchema } from '../elementsStatus.mjs'

export const boardColumnSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    kanban:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Kanban",
        required:true
    },
    elementStatus: {type:elementStatusSchema,default:{}},

}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
});

boardColumnSchema.virtual('tasks', { ref: 'Task', foreignField: 'boardColumn', localField: '_id',match:{'elementStatus.isDeleted':{$ne:true}} });
boardColumnSchema.pre(/^find/,function(){
    this.populate('tasks')
})
boardColumnSchema.pre(/delete|remove/i,async function(next){
    const doc = await this.model.findOne(this.getFilter()).populate('tasks')
    if(doc?.tasks){
        doc.tasks.forEach(async el=>await Task.findByIdAndDelete(el._id))
        
    next()
}}

)

export const BoardColumn = mongoose.model("BoardColumn", boardColumnSchema);

