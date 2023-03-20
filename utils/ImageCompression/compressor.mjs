

import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';
import imageminMozjpeg from 'imagemin-mozjpeg';
import util from 'util';



export class Compressor{
    constructor(){
        this.MaximumSize=80;
    }

    getImageSize(imagepath){
    var fileSizeInKiloBytes = fs.statSync(imagepath).size/1024.0;
    return fileSizeInKiloBytes;
    }
    
    async compressImage(source,destination=undefined){
    var inputImgSize=this.getImageSize(source)
    if(inputImgSize==0){
        throw Error('0 file size!')
    }
    if(inputImgSize<=this.MaximumSize){
        return await util.promisify(fs.readFile)(source)
    }
    var ratio=1;
    
    ratio=this.MaximumSize/inputImgSize
    const file = await imagemin([source], {
        destination: destination,
        plugins: [
            imageminMozjpeg({quality:Math.max(ratio*100,5)}),
            imageminPngquant({
                quality: [.1,Math.max(ratio,.3)]
            })
        ]
    });
    
    return file[0].data;
}
}

