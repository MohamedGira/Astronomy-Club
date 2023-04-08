import { writeFileSync } from "fs";
import { bufferCompressor } from "../../utils/image/ImageCompression/compressor.mjs";
import { fileURLToPath } from "url";
import { AppError } from "../../utils/AppError.mjs";
import path from "path";
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

export const  imgdir=(__dirname+'/../../upload/images/').replace(/\\/g, "/")
export const saveImage = async function (image,subfolder='',compress = false)
 {
  
  if(subfolder)
    imgdir+=`/${subfolder.replace(/\\|\//g,'')}`
  console.log(imgdir)
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
