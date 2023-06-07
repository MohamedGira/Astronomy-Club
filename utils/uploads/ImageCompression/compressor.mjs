

import fs from 'fs';
import util, { promisify } from 'util';
import exp from 'constants';
import sharp from 'sharp';



class ImageHandler  {
    constructor(){
        
    }
     saveImage(image,options={compress:false,maxHeight:1080,maxWidth:1920}){
         
         let img=sharp(image)
        .toFormat('jpeg')
        if(options.compress)
        {
        options.maxHeight=options.maxHeight||1080
        options.maxWidth=options.maxWidth||1920
        img.resize(options.maxWidth, options.maxHeight, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        }
        return img
    }
    async resizeImage(image,maxHeight=1080,maxWidth=1920){    
        return await sharp(image)
        .resize(maxWidth, maxHeight, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .toFormat('jpeg')
        .toBuffer()
        
    }
}


//export const bufferCompressor=new BufferCompressor()
export const imageHandler=new ImageHandler()
