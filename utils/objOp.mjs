
export const  filterObj =(obj,filter,filterout=[])=>{
    var filteredObj={}
    for( var key in filter){
        if (key in obj && ! filterout.includes(key)){
            filteredObj[key]=obj[key]
        }
    }
    return filteredObj
}
export const jsonifyObj=(obj)=>{
    try{
        obj=JSON.parse(obj)
    }catch(err){}
    for( var key in obj){
        try{
            obj[key]=JSON.parse(obj[key])
            jsonifyObj(obj[key])
        }catch(err){}
    }
    return obj
}