import listEndpoints from "express-list-endpoints";

import { Permission } from "../../models/Permissions/Permission.mjs";
import * as factory from "../CRUDFactory.mjs";
import { Database } from "../../models/DbConnection.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { filterObj, jsonifyObj } from "../../utils/objOp.mjs";

// Extract and display routes
export const getEndpoints=(app)=>{
    const routes = listEndpoints(app);
    let defroutes=[]
    for (let i in routes){
    routes[i].middlewares=undefined
    }

    for (let i in routes){
    for(let j in routes[i].methods){
        let things=routes[i].path.split('/').filter(el=>el!=''&& el[0]!=':' &&el!='*')
        defroutes.push({"endpoint":things.join('/'),method:routes[i].methods[j].toLocaleLowerCase()})
    }
    }
    defroutes=defroutes.filter(el=>el.endpoint!='')
    return defroutes
    console.table(defroutes)
}

// GET permissions/
export const  getPermissions= catchAsync(async (req,res,next)=>{
    let permissions=await Database.getPermissionsInstance()
    return res.status(200).json({
        "message": `${permissions.length} permissions found`,
        "results":permissions
    })
})

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
export const  updatePermission= factory.updateOne(Permission,['role','endpoint'],{
    executePost:async()=>{
        try{
            await Database.updatePermissionsInstance()
        }catch(err){
            console.log(err)
        }
    },executePre:[(req,res,next)=>{
        console.log(req.params)
    }]
})

// DELETE permissions/:elementId
export const  deletePermission= factory.deleteOne(Permission)
