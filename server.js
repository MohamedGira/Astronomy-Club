import { Compressor } from "./utils/ImageCompression/compressor.mjs";

const compressor=new Compressor();

console.log(await compressor.compressImage('./SamplePNGImage_10mbmb.png'))