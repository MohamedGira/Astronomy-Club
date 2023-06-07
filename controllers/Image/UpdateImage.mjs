import { Image } from "../../models/Image.mjs";
import { AppError } from "../../utils/AppError.mjs";
import { catchAsync } from "../../utils/catchAsync.mjs";
import { filterObj } from "../../utils/objOp.mjs";
import { deleteFile } from "../../utils/uploads/cleanDir.mjs";
import { saveImage } from "../../utils/uploads/saveImage.mjs";

// PATCH ImageObjs/:elementId 
export const updateImage= catchAsync(async (req, res, next) => {
    let newimage=req.files?.image;
    let image=await Image.findById(req.params.elementId);

    if(!newimage)
        return next(new AppError(400,"No image provided, if you want to remove the image, use the delete route"))
    
    if (!image) 
        return next(new AppError(400,"Invalid Image Id provided"))

    Object.assign(image,filterObj(req.body,['filename']))
    
    
    let oldimgname=image.filename;
    try{
        image.filename=await saveImage(newimage);
        image.save()
        deleteFile(oldimgname,'images')
    }catch(e){
        console.log('imgerror: ',e.message)
        return next(new AppError(500,"couldn't save Image, check images extension"))
    }
    return res.status(200).json({
        message: "Image updated (removed) successfully",
    })
})