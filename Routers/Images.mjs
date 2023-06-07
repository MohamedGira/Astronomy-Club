import express from "express";
import { RBACAutorizerMw, isAuthorizedMw } from "../controllers/Authentication/authorizationMw/Authorizer.mjs";
import { getImage, getImages, no_really__deleteImage } from "../controllers/Image/RDImage.mjs";
import { createImage } from "../controllers/Image/CreateImage.mjs";
import { updateImage } from "../controllers/Image/UpdateImage.mjs";


export const ImagesRouter=express.Router()


ImagesRouter.use(RBACAutorizerMw)
ImagesRouter.route('/')
.get(getImages)
.post(createImage)

ImagesRouter.route('/:elementId')
.get(getImage)
.patch(updateImage)
.delete(no_really__deleteImage)
