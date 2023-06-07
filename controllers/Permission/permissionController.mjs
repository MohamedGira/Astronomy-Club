import listEndpoints from "express-list-endpoints";

import { Permission } from "../../models/Permissions/Permission.mjs";
import {factory} from "../CRUDFactory/package.mjs";
import { Database } from "../../models/DbConnection.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { filterObj, jsonifyObj } from "../../utils/objOp.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";



// GET permissions/
export const  getPermissions= factory.getAll(Permission,undefined,{
    executePre:[async(req,res,next)=>{
        if(req.query.refreshDBInstance)
            await Database.updatePermissionsInstance()
    }]
})
// POST permissions/
export const  addPermission= factory.createOne(Permission,undefined,{
    executePre:[
        async(req,res,next)=>{
        let filteredBody=filterObj(jsonifyObj(req.body),Permission.schema.paths,['allowed']) 
        if(!filteredBody.url || ! filteredBody.role)
            throw new AppError(400, `url and role are required`);

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
            console.log('reached here0')
        }catch(err){
            console.log(err)
        }
    },executePre:[(req,res,next)=>{


    }]
})

// DELETE permissions/:elementId
export const  deletePermission= factory.deleteOne(Permission)
