
export const deactevatedEndpoint=(newEndpoint)=>{
    return(req,res,next)=>{
        return res.status(301).json({
            message:`this endpoint ${req.path} is deactivated and changed to ${newEndpoint}`
        })
    }
}