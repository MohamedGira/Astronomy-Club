
export const  filterObj =(obj,filter,filterout=[])=>{
    var filteredObj={}
    
    
    for( var key in obj){
        let keyInitial=key.split('.')[0]
        if (!filterout.includes(key)&& keyInitial in filter){
            
            filteredObj[key]=obj[key]
        }
    }
    return filteredObj
}
export const jsonifyObj=(obj)=>{
    try{
        obj=JSON.parse(obj)
    }catch(err){
    }
    
    for( var key in obj){
        try{
            obj[key]=JSON.parse(obj[key])
            jsonifyObj(obj[key])
        }catch(err){}
    }
    return obj
}