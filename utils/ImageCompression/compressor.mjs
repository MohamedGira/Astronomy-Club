

import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';
import fs from 'fs';
import imageminMozjpeg from 'imagemin-mozjpeg';
import util from 'util';



class Compressor{
    constructor(){
        this.MaximumSize=80;
    }

    getImageSize(imagepath){
    var fileSizeInKiloBytes = fs.statSync(imagepath).size/1024.0;
    return fileSizeInKiloBytes;
    }
    
    async compressImage(source){
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
        destination: './output/',
        plugins: [
            imageminMozjpeg({quality:Math.max(ratio*100,5)}),
            imageminPngquant({
                quality: [.1,math.max(ratio,.3)]
            })
        ]
    });
    
    return file[0].data;
}
}

