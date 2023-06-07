import { Image } from "../../models/Image.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { filterObj } from "../../utils/objOp.mjs";
import { deleteFile } from "../../utils/uploads/cleanDir.mjs";
import { saveImage } from "../../utils/uploads/saveImage.mjs";

// PATCH ImageObjs/:elementId 
export const createImage= catchAsync(async (req, res, next) => {
    let newimage=req.files?.image;
    if(!newimage)
        return next(new AppError(400,"No image provided"))
    let image= await Image(filterObj(req.body,Image.schema.paths,['filename']))
    
    try{
        image._doc.filename=await saveImage(newimage);
        console.log(image)
        image.save()
    }catch(e){
        console.log('imgerror: ',e.message)
        return next(new AppError(500,"couldn't save Image, check if the image extension"))
    }
    
    return res.status(200).json({
        message: "Image added successfully",
    })
})