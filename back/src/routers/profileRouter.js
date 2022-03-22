import { Router } from 'express'
import { login_required } from "../middlewares/login_required";
import { storage, dir_init } from "../middlewares/fileUpload";
import is from "@sindresorhus/is";
import multer from "multer";


const upload = multer({ storage : storage})

const profileRouter = Router()
profileRouter.use(login_required)

profileRouter.post('/profile/create',
    dir_init,
    upload.single('uploadImage'),
    async (req, res, next)=>{
    try{
        console.log('file Uploaded', req.file)
        res.send('upload완료')
    }catch (e) {
        next(e)
    }
})

export { profileRouter }