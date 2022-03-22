import multer from 'multer'
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const newPath = path.join(path.parse(__dirname).dir, 'uploads/')
            console.log(newPath)
            cb(null, newPath)
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const time = new Date().getTime() + ( Math.floor(Math.random() * 9999) + 1000 )
            const fileName = time + path.basename(file.originalname, ext) + ext
            cb(null, fileName)
        },

})

const fileFilter =  (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if(ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
        return cb(new Error(
            '이미지 파일만 보내실 수 있습니다. e.g).png, .jpg, .jpeg'
        ))
    }
    cb(null, true)
}

const upload = multer({
    storage : storage,
    fileFilter: fileFilter,
    limits:{
        fileSize: 1024 * 1024 * 20
    }
})

const fileHandler = upload.single('uploadImage')

const dir_init = (req, res, next) => {
    const newPath = path.join(path.parse(__dirname).dir, 'uploads')
    fs.readdir(newPath, (err)=> {
        if(err){
            fs.mkdirSync(newPath)
            console.log('if문 안쪽')
            next()
        }
        next()
    })
}



export { dir_init, storage, fileFilter, fileHandler }
