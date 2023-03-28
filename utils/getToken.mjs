export const getToken=(req)=>{
    if(!req.headers.authorization)
        if(!req.cookies)  
            return null
        else
            return req.cookies.jwt
    else
        return req.headers.authorization.split(' ')[1]
}