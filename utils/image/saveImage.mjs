import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { bufferCompressor } from "../../utils/image/ImageCompression/compressor.mjs";

export const saveImage = async function (image,fullSavePath,compress = false)
 {
  //uploaded file is not image
  if (image && !/^image/.test(image.mimetype))
    throw new AppError("400","the provided file's extension is not a supported image type");

  const imgdir = fullSavePath.replace(/\\/g, "/");
  const imgname = `${Date.now()}${parseInt(Math.random() * 1000).toString()}${image.mimetype.replace("image/", ".")}`;

  //compressing the image
  if (compress == true) {
    const compressedImg = await bufferCompressor.compressImageBuffer(image.data);
    writeFileSync(imgdir + imgname, compressedImg, "binary");
  }else{
    writeFileSync(imgdir + imgname, image.data, "binary");
  }


  return imgname;

};
