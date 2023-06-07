
import mongoose from "mongoose";
import { deleteFile } from "../utils/uploads/cleanDir.mjs";

const imageSchema =  mongoose.Schema({
    for: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    filename: {
        type: String,
    },
});

imageSchema.pre(/delete|remove/, function (next) {
    deleteFile(this.filename, "images");
});

export const Image = mongoose.model('Image', imageSchema);



