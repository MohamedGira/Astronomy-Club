import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";
import { getImage, getImages, no_really__deleteImage } from "../controllers/Image/RDImage.mjs";
import { createImage } from "../controllers/Image/CreateImage.mjs";
import { updateImage } from "../controllers/Image/UpdateImage.mjs";


export const ImagesRouter=express.Router()



ImagesRouter.route('/')
.get(getImages)
.post(RBACAutorizerMw,createImage)

ImagesRouter.route('/:elementId')
.get(getImage)
.patch(RBACAutorizerMw,updateImage)
.delete(RBACAutorizerMw,no_really__deleteImage)
