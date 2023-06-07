import { AppError } from "../AppError.mjs";
import { filterObj, jsonifyObj } from "../objOp.mjs";
import { deleteFile } from "./cleanDir.mjs";
import { saveImage } from "./saveImage.mjs";


export const HandleImages = async (req,res,next,Model,object)=>{
let imgslist = [];
req.files=filterObj(jsonifyObj(req.files), Model.schema.paths);
try {
  for (let key in req.files) {
    //case1: model has an array of images
    if (Model.schema.paths[key].instance == "Array") {
        if (!Array.isArray(req.files[key])) 
            req.files[key] = [req.files[key]];
        for (let img in req.files[key]) {
            let imgname = await saveImage(req.files[key][img]);
            object[key].push(imgname);
            imgslist.push(imgname);
        }
      //case2: model has a single image :: shouldn't happen
    } else if (Model.schema.paths[key].instance == "String") {
        console.log('saving single image is not aglie!')
        let imgname = await saveImage(req.files[key]);
        object[key] = imgname;
        imgslist.push(imgname);
    }
  }
  return object;
} catch (err) {
  try {
    imgslist.forEach((el) => deleteFile(el, "images"));
  } catch (e) {}
  console.log(`couldn\'t create ${Model.collection.collectionName}, imgs issue`);
  throw new AppError(400, "image saving issue: " + err.message);
}
}
