import fs from 'fs'

const dir_init = (req, res, next) => {
    fs.readdir('uploads', (err)=> {
        if(err){
            fs.mkdirSync('uploads')
        }
    })
}

export { dir_init }