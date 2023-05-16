import mongoose from "mongoose";
import dotenv from "dotenv";
import { BoardColumn } from "../BoardColumns/BoardColumn.mjs";


const taskSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    description: {
        type: String,
    },
    due: {
        type: [Date],
    },
    
    prioritize: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "low",
    },

    completed: {
        type: Boolean,
        default: false,
    },
    boardColumn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BoardColumn",
        required: [true, "Board column is required"],
    },


}, { timestamps: true ,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } });

taskSchema.virtual('comments', { ref: 'Comment', foreignField: 'to', localField: '_id'});
taskSchema.virtual('assignee', { ref: 'Assignment', foreignField: 'taskID', localField: '_id'});
taskSchema.pre(/^find/,function(){
    this.populate('comments assignee')
})
taskSchema.pre('save',async function(next){
    if(! await BoardColumn.findById(this.boardColumn)){
        return next(new AppError('400',`this boardColumn doesn't exist`))
    }
    next()
})

export const Task = mongoose.model("Task", taskSchema);

