//use only with routes that doesn't change oftenly
export const setCache=(req,res,next)=>{
    const maxAgeSecs=5*60
    if(req.method=="GET"){
        
        res.set("Cache-control",`public, max-age=${maxAgeSecs}`)
    }else{
        res.set("Cache-control",`no-store`)
    }
    next()
}