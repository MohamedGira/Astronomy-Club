import listEndpoints from "express-list-endpoints";

import { Endpoint } from "../../models/Endpoints/Endpoint.mjs";
import * as factory from "../CRUDFactory.mjs";
import { Database } from "../../models/DbConnection.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { Permission } from "../../models/Permissions/Permission.mjs";
import { Router } from "express";
import { User } from "../../models/Users/User.mjs";
import { UserRole } from "../../models/Users/UserRole.mjs";




// Extract and display routes
const getSystemEndpoints=(app)=>{
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

const InitializeEndpoints=async (app)=>{
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
    
    for (let i in fullactualEndpoints ){
        try{
        await Endpoint.create(fullactualEndpoints[i])
        console.log('created endpoint for '+fullactualEndpoints[i])
        }catch(err){ console.log(err.message)  }
    }
    Database.updateEndpointsInstance()
    await InitaizeAdminPermissions('64239bae801a4599ad1a0335',routes)
    return actualEndpoints
}

export const InitializeEndpoints2=async (app)=>{
    const routes = listEndpoints(app);
    let actualEndpoints={}
    
   
    let baseurls=[... new Set(routes.map(e=>e.path).filter(el=>{return el[0]!='*' && !el.includes('auth')}).map(el=>el.split('/').filter(el=>el[0]!=':').join('/')))].map(el=>{return {url:el}})
   console.log(baseurls)
    try{
        await Endpoint.insertMany(baseurls)
        Database.updateEndpointsInstance()
    }catch(err){
        console.log(err.message)
    }
    let rols=(await UserRole.find()).map(el=>el._id)
    for (let i in rols)
        await InitaizeAdminPermissions(rols[i],baseurls)
    return actualEndpoints
}


// GET endpoints/
export const  getEndpoints= factory.getAll(Endpoint)


// GET endpoints/:elementId 
export const  getEndpoint= factory.getOne(Endpoint)

async function InitaizeAdminPermissions(roleid,baseurl){
        let endpoints=await Database.getEndpointsInstance()
        endpoints=endpoints.map(el=>{return {role:roleid,url:el.url}})
        
        for (let i in endpoints){
        try{
            await Permission.create({role:roleid,url:endpoints[i].url})
            console.log('created permissions for '+endpoints[i].url)
        }
        catch(err){
            console.log(err.message)
        }
        }
    Database.updatePermissionsInstance()
    
}
