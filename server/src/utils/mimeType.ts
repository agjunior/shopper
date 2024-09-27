const atob = require('atob')
const Buffer = require('buffer/').Buffer
const mimeTypes: { [key: string]: string } = {
    png: 'image/png',
    gif: 'image/gif',
    jpg: 'image/jpeg',
    svg: 'image/svg+xml',
    webp: 'image/webp',
    jpeg: 'image/jpeg',
    pjpeg: 'image/jpeg',
    pjp: 'image/jpeg',
    jfif: 'image/jpeg'
}

type MimeTypeObject = {
    mimeType: string,
    ext: string,
}

export const getMimeType = (base64Encoded: string): MimeTypeObject => {
    const prefix = atob(base64Encoded.slice(0, 60))
    const found = prefix.match(/(webp)|(png)|(gif)|(svg)|(jpg)|(jpeg)|(pjpeg)|(pjp)|(jfif)/gi)

    if (found) {
        const type = found[0].toLocaleLowerCase()
        return { mimeType: mimeTypes[type], ext: type }
    } else {
        return { mimeType: 'image/jpeg', ext: 'jpg'}
    }
};