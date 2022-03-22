import multer from 'multer'
import fs from 'fs'
import path from 'path'

const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            const path = __dirname.substring(0, __dirname.indexOf('back'))
            cb(null, path.join(path,'uploads/'))
        },
        filename: (req, file, cb) => {
            const ext = path.extname(file.originalname)
            const time = new Date().getTime() + ( Math.floor(Math.random() * 9999) + 1000 )
            const fileName = time + path.basename(file.originalname, ext) + ext
            cb(null, fileName)
        },

})



const dir_init = (req, res, next) => {
    console.log('dir',__dirname)
    const test = __dirname
    const test2 = test.substring(0, test.indexOf('back'))
    console.log(test2)

    fs.readdir(test2+'uploads', (err)=> {
        if(err){
            fs.mkdirSync(test2 + 'uploads')
            console.log('if문 안쪽')
            next()
        }
        next()
    })
}

export { dir_init, storage }
