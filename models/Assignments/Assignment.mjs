import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const assignmentSchema = mongoose.Schema({
    taskID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: [true, "Task ID is required"],
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User ID is required"],
    },
}, { timestamps: true });

assignmentSchema.pre(/^find/,function(){
    this.populate('userID','firstName lastName email profileImage')
})
export const Assignment = mongoose.model("Assignment", assignmentSchema);

