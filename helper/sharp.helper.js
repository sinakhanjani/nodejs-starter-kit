const sharp = require('sharp')

const compressJPG = (file,bounds) => {
    const filename = file.filename
    const path = file.path 
    const [name, ext] = filename.split('.')
    
    sharp(`./${path}`)
    .jpeg({ compressionLevel: 1, adaptiveFiltering: true, force: true })
    .resize(bounds)
    .withMetadata()
    .toFile(`${process.env.UPLOAD_FILE_DIRECTORY}/${name}-micro.${ext}`, function(err) {
        if (err) {
            
        }
    })
    
    const dir = process.env.UPLOAD_FILE_DIRECTORY.substr(1)
    
    return `${dir}/${name}-micro.${ext}`
}

module.exports = compressJPG