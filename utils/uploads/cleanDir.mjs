import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {unlink}from 'fs'
export const  uploadsdir=(__dirname+'/../../upload/').replace(/\\/g, "/")

export const deleteFile=(fileName,subfolder='')=>{
    var imgdir=uploadsdir;
    if(subfolder)
        imgdir+=`/${subfolder.replace(/\\|\//g,'')}/`
    
    unlink(imgdir+fileName,(err)=>{
        if(err)
        console.log(err.message)
    })
}

