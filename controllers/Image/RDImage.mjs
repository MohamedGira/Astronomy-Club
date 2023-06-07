import { Image } from "../../models/Image.mjs";
import {factory} from "../CRUDFactory/package.mjs";

// GET ImageObjs/
export const  getImages= factory.getAll(Image)

// GET ImageObjs/:elementId 
export const  getImage= factory.getOne(Image)


export const  no_really__deleteImage= factory.no_really__deleteIt(Image)
