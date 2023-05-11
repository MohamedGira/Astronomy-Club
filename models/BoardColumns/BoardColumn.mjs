import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const boardColumnSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
});

boardColumnSchema.virtual('tasks', { ref: 'Task', foreignField: 'boardColumn', localField: '_id' });

export const BoardColumn = mongoose.model("BoardColumn", boardColumnSchema);

