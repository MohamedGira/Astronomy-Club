import listEndpoints from "express-list-endpoints";

import { Permession } from "../../models/Permession.mjs";
import * as factory from "../CRUDFactory.mjs";

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

// GET permessions/
export const  getPermessions= factory.getAll(Permession)

// POST permessions/
export const  addPermession= factory.CreateOne(Permession)

// GET permessions/:elementId 
export const  getPermession= factory.getOne(Permession)

// PATCH permessions/:elementId 
export const  updatePermession= factory.updateOne(Permession)

// DELETE permessions/:elementId
export const  deletePermession= factory.deleteOne(Permession)
