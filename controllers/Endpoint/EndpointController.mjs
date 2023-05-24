import listEndpoints from "express-list-endpoints";

import { Endpoint } from "../../models/Endpoints/Endpoint.mjs";
import * as factory from "../CRUDFactory.mjs";
import { Database } from "../../models/DbConnection.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { Permission } from "../../models/Permissions/Permission.mjs";


export const InitializeEndpoints=async (app)=>{
    const routes = listEndpoints(app);
    let actualEndpoints={}
    for (let i in routes){
        if(routes[i].path!='*')
        {
        let baseurl=routes[i].path.split('/').filter(el=>el[0]!=':').join('/')
        let baseurlMethods=[ ... new Set(routes.filter(el=>el.path.includes(baseurl)).map(el=>el.methods).flat())]
        actualEndpoints[baseurl]=baseurlMethods
        }
    }
    actualEndpoints=Object.entries(actualEndpoints).map(el=>{return {url:el[0],methods:el[1]}})

    let fullactualEndpoints=[]
    actualEndpoints.forEach(el=>{
        for (let i in el.methods){
            fullactualEndpoints.push({url:el.url,method:el.methods[i]})
        }
    })
    
  /*       for (let i in fullactualEndpoints ){
        try{
        await Endpoint.create(fullactualEndpoints[i])
        console.log('created endpoint for '+fullactualEndpoints[i])
        }catch(err){ console.log(err.message)  }
    } */
    Database.updateEndpointsInstance()
    await InitaizeAdminPermissions('64239bae801a4599ad1a0335',routes)
    return actualEndpoints
}

// GET endpoints/
export const  getEndpoints= catchAsync(async (req,res,next)=>{
    let endpoints=await Database.getEndpointsInstance()
    return res.status(200).json({
        "message": `${endpoints.length} endpoints found`,
        "results":endpoints
    })
})

// GET endpoints/:elementId 
export const  getEndpoint= factory.getOne(Endpoint)

async function InitaizeAdminPermissions(roleid){
    
        let endpoints=await Database.getEndpointsInstance()
        for (let i in endpoints){
        try{let exist=await Permission.findOne({role:roleid,endpoint:endpoints[i]})
        if(!exist)
         { 
            await Permission.create({role:roleid,endpoint:endpoints[i]})
            console.log('created permissions for '+endpoints[i].url)
        }else{
            console.log('permissions already exist for '+endpoints[i].url)
        }}
        catch(err){ console.log(err.message)
        }
        }
    Database.updatePermissionsInstance()
    
}
