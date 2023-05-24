import listEndpoints from "express-list-endpoints";

import { Permission } from "../../models/Permissions/Permission.mjs";
import * as factory from "../CRUDFactory.mjs";
import { Database } from "../../models/DbConnection.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { filterObj, jsonifyObj } from "../../utils/objOp.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";



// GET permissions/
export const  getPermissions= factory.getAll(Permission)
// POST permissions/
export const  addPermission= factory.CreateOne(Permission,undefined,{
    executePre:[
        async(req,res,next)=>{
        let filteredBody=filterObj(jsonifyObj(req.body),Permission.schema.paths,['allowed']) 
        if(await Permission.findOne(filteredBody))
            throw new AppError(400, `This permission already exists, update it instead`);
        }
    ],
    executePost:async()=>{
        await Database.updatePermissionsInstance()
    }
})

// GET permissions/:elementId 
export const  getPermission= factory.getOne(Permission)

// PATCH permissions/:elementId 
export const  updatePermission= factory.updateOne(Permission,{
    executePost:async()=>{
        try{
            await Database.updatePermissionsInstance()
        }catch(err){
            console.log(err)
        }
    },executePre:[(req,res,next)=>{


    }]
})

// DELETE permissions/:elementId
export const  deletePermission= factory.deleteOne(Permission)
