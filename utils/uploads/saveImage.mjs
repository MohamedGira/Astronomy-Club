import { writeFileSync } from "fs";
import { imageHandler } from "../../utils/uploads/ImageCompression/compressor.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { fileURLToPath } from "url";
import path from "path";
import { Image } from "../../models/image.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs'
export const  imgdir=(__dirname+'/../../upload/images/').replace(/\\/g, "/")
/** options :{subfolder:String,compress:boolean} */
export const saveImageOld = async function (image,options={subfolder:'',compress:false})
 {

  if (!fs.existsSync(imgdir)){
    fs.mkdirSync(imgdir,{ recursive: true });
  }
  if(options.subfolder)
    imgdir+=`/${subfolder.replace(/\\|\//g,'')}/`
  //uploaded file is not image
  if (image && !/^image/.test(image.mimetype))
    throw new AppError("400","the provided file's extension is not a supported image type");

  const imgname = `${Date.now()}${parseInt(Math.random() * 1000).toString()}${image.mimetype.replace("image/", ".")}`;

  //compressing the image
  if (options.compress  == true) {
    const compressedImg = await ImageHandler.resizeImage(image.data);
    writeFileSync(imgdir+ imgname, compressedImg, "binary");
  }else{
    writeFileSync(imgdir+ imgname, image.data, "binary");
  }


  return imgname;

};


export const saveImage = async function (image,options={subfolder:'',compress:false,maxHeight:1080,maxWidth:1920})
 {

  //uploaded file is not image
  if (image && !/^image/.test(image.mimetype))
    throw new AppError("400","the provided file's extension is not a supported image type");
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


/* export const createImageObject = async function (image,compress = false)
 {
  //uploaded file is not image
  if (image && !/^image/.test(image.mimetype))
    throw new AppError("400","the provided file's extension is not a supported image type");

  const imgname = `${Date.now()}${parseInt(Math.random() * 1000).toString()}${image.mimetype.replace("image/", ".")}`;
  var img=undefined
  //compressing the image
  if (compress == true) {
    const compressedImg = await bufferCompressor.compressImageBuffer(image.data);
    img= new Image({name:imgname,img:compressedImg})
  }else{
    img= new Image({name:imgname,img:{data:image.data,contentType:image.mimetype}})
  }
  return img;
}; */