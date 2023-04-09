import { readdirSync } from "fs"
import { deleteFile, uploadsdir } from "../../utils/uploads/cleanDir.mjs"
import path from "path"


export const getfiles=(req,res,next)=>{    
    console.log(readdirSync(path.join(uploadsdir,req.query.dirname.replace(',','/'))))
    return res.status(200).json()
}
export const removefile=(req,res,next)=>{
    deleteFile(req.query.filename,req.query.dirname)
    return res.status(200).json()
}

