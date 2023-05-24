import mongoose from "mongoose";
import dotenv from "dotenv";
import { BoardColumn } from "../BoardColumns/BoardColumn.mjs";
import { UserRole } from "../Users/UserRole.mjs";


const mangmentPermissionSchema = mongoose.Schema({
    name: {
        type:String
    },
    whoCanDo:{
        type:[mongoose.Schema.Types.ObjectId]
    }

});


mangmentPermissionSchema.pre('save',async function(next){
    for (let type in this.whoCanDo){
    if(! await UserRole.findById(this.whoCanDo[type])){
        return next(new AppError('400',`${this.whoCanDo[type]} isn't valid RoldId `))
    }}
    return next()
})

export const ManagmentPermission = mongoose.model("ManagmentPermission", mangmentPermissionSchema);

