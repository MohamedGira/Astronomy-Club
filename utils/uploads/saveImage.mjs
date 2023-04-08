import { writeFileSync } from "fs";
import { bufferCompressor } from "../../utils/uploads/ImageCompression/compressor.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { fileURLToPath } from "url";
import path from "path";
import { Image } from "../../models/image.mjs";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const  imgdir=(__dirname+'/../../upload/images/').replace(/\\/g, "/")
export const saveImage = async function (image,subfolder='',compress = false)
 {
  
  if(subfolder)
    imgdir+=`/${subfolder.replace(/\\|\//g,'')}/`
  //uploaded file is not image
  if (image && !/^image/.test(image.mimetype))
    throw new AppError("400","the provided file's extension is not a supported image type");

  const imgname = `${Date.now()}${parseInt(Math.random() * 1000).toString()}${image.mimetype.replace("image/", ".")}`;

  //compressing the image
  if (compress == true) {
    const compressedImg = await bufferCompressor.compressImageBuffer(image.data);
    writeFileSync(imgdir+ imgname, compressedImg, "binary");
  }else{
    writeFileSync(imgdir+ imgname, image.data, "binary");
  }


  return imgname;

};

export const createImageObject = async function (image,compress = false)
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
};