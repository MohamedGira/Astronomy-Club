import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const boardColumnSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
}, { timestamps: true });

export const BoardColumn = mongoose.model("BoardColumn", boardColumnSchema);

