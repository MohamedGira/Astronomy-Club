(async function main() {
    const Compressor=( await import('./utils/ImageCompression/compressor.mjs')).default
    console.log(typeof Compressor)
})()