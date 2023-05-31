import mongoose from "mongoose";
import dotenv from "dotenv";
import { boardColumnSchema } from "../BoardColumns/BoardColumn.mjs";

dotenv.config()
import { elementStatusSchema } from '../elementsStatus.mjs'

const kanbanSchema = mongoose.Schema({
    committee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Committee",
        required:true,
        unique:true
    },
    elementStatus: {type:elementStatusSchema,default:{}},
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
});

kanbanSchema.pre(/^find/,function(){
    this.populate('boardColumns')
})
kanbanSchema.virtual('boardColumns', { ref: 'BoardColumn', foreignField: 'kanban', localField: '_id' ,match:{'elementStatus.isDeleted':{$ne:true}}});


export const Kanban = mongoose.model("Kanban", kanbanSchema);

