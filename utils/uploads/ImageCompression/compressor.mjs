

import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';
import imageminMozjpeg from 'imagemin-mozjpeg';
import util, { promisify } from 'util';
import exp from 'constants';
import sharp from 'sharp';




class BufferCompressor{
    constructor(){
    }
    getbufferSize(imgbuffer){
        return Buffer.byteLength(imgbuffer)/1024;
    }
        
    async compressImageBuffer(buffer){
    var inputImgSize=this.getbufferSize(buffer)
    if(inputImgSize==0){
        throw Error('0 file size!')
    }
    if(inputImgSize<=this.MaximumSize){
        return buffer
    }
    var ratio=1;
    
    ratio=this.MaximumSize/inputImgSize
    const file = await imagemin.buffer(buffer, {
        plugins: [
            imageminMozjpeg(),
            imageminPngquant()
        ]
    });
    return file;
    }
}

class ImageResizer  {
    constructor(){
        
    }
    async resizeImage(image,maxHeight=1080,maxWidth=1920){    
        return await sharp(image)
        .resize(maxWidth, maxHeight, {
            fit: sharp.fit.inside,
            withoutEnlargement: true
        })
        .toBuffer()
    }
}


export const bufferCompressor=new BufferCompressor()
export const imageResizer=new ImageResizer()
