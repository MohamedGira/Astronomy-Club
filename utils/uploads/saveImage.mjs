import { writeFileSync } from "fs";
import { imageHandler } from "../../utils/uploads/ImageCompression/compressor.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs'
export const  imgdir=(__dirname+'/../../upload/images/').replace(/\\/g, "/")

export const saveImage = async function (image,options={subfolder:'',compress:false,maxHeight:1080,maxWidth:1920})
 {

  //uploaded file is not image
  if (image && !/^image/.test(image.mimetype))
    {
      console.log(image)
      throw new AppError("400","the provided file's extension is not a supported image type");
    }
  let fdir=imgdir
  if(options.subfolder)
    fdir= path.join(imgdir,options.subfolder)

  if (!fs.existsSync(fdir)){
    fs.mkdirSync(fdir,{ recursive: true });
  }
  
  const imgname = `${Date.now()}${parseInt(Math.random() * 1000).toString()}.jpeg`;
  await imageHandler.saveImage(image.data,options).toFile(path.join(imgdir,imgname));
  return imgname;
};

