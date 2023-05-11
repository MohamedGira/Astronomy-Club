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
        required: [true, "Description is required"],
    },
    dueDate: {
        type: Date,
        required: [true, "Due date is required"],
        validate: {
            validator: function (value) {
                return value > Date.now();
            }
        }
    },
    boardColumn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BoardColumn",
        required: [true, "Board column is required"],
    },
}, { timestamps: true });


taskSchema.pre('save',async function(next){
    if(! await BoardColumn.findById(this.boardColumn)){
        return next(new AppError('400',`this event doesn't exist`))
    }
    next()
})

export const Task = mongoose.model("Task", taskSchema);

