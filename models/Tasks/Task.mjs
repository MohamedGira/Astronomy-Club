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
    attachments: {
        type: [String],
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
    assignee : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
    },
}, { timestamps: true });


taskSchema.pre('save',async function(next){
    if(! await BoardColumn.findById(this.boardColumn)){
        return next(new AppError('400',`this boardColumn doesn't exist`))
    }
    next()
})

export const Task = mongoose.model("Task", taskSchema);

