const fs = require('fs')
const Path = require('path')
const sharp = require('sharp')

const path = {
    photosDir: './photos',
    thumbsDir: './thumbs',
    carouselsDir: './carousels',
    productsFile: './produits.json'
}

const resizeTo = {
    thumbs: {
        width: 446,
        height: 297
    },
    carousels: {
        width: 926,
        height: 612
    }
}

function checkPath(path) {
    if (!fs.existsSync(path)) {
        throw `Non-existent ${path}`
    }
}

function convert(path, resizeTo) {
    sharp(path.source)
        .resize(resizeTo.width, resizeTo.height)
        .toFile(path.target, (error, info) => {
            if (error) {
                console.log('error', `${error.message} - file: ${path.source}`)
            }
            console.log('optimize:', path.target)
        })
}

function initDirectory(path) {
    try {
        fs.rmdirSync(path, {
            recursive: true
        })
    } catch (err) {}

    fs.mkdirSync(path, {
        recursive: true
    })
}

checkPath(path.productsFile)
checkPath(path.photosDir)

const productsFile = fs.readFileSync(path.productsFile)
const products = JSON.parse(productsFile)
const allPhotos = products.map(products => products.photos).filter(photos => photos.length)

initDirectory(path.thumbsDir)
initDirectory(path.carouselsDir)

allPhotos.forEach((productPhotos) => {
    productPhotos.forEach((photo, index) => {
        const source = Path.join(path.photosDir, photo)
        const carouselPath = {
                source: source,
                target: Path.join(path.carouselsDir, photo)
            }
            // creates thumbs
        if (index === 0) {
            const thumbPaths = {
                source: source,
                target: Path.join(path.thumbsDir, photo)
            }
            convert(thumbPaths, resizeTo.thumbs)
        }

        convert(carouselPath, resizeTo.carousels)
    })
})