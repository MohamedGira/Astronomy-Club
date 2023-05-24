export const getToken=(req)=>{
    if(!req.headers.authorization)
        return undefined
        
    let t=req.headers.authorization.split(' ')[1]
    if(['null','undefined','0'].includes(t))
        return undefined
    else
        return t

}