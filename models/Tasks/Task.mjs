import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

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
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);

