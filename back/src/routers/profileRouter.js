import { Router } from 'express'
import { login_required } from "../middlewares/login_required";
import { dir_init, fileHandler  } from "../middlewares/fileUpload";
import { profileService } from "../services/profileService";

const profileRouter = Router()
profileRouter.use(login_required)

profileRouter.post('/profile/create',
    dir_init,
    (req, res, next)=>{
    fileHandler(req, res, async (err)  => {
        try{
            if(!req.file){
                throw new Error('파일이 전송되지 않았습니다.')
            }

            console.log('req.file>>>', req.file)
            const { destination, filename } = req.file
            const { user_id } = req.body

            const newProfile = await profileService.addProfile({user_id, path_name: destination, file_name: filename})

            if(newProfile.errorMessage){
                throw new Error(newProfile.errorMessage)
            }
            res.status(201).json(newProfile)
        }catch (e) {
            next(e)
        }

    })
})

profileRouter.get('/profile/:user_id', async(req, res, next) => {
    try{
        const { user_id } = req.params
        const profile = await profileService.getProfile({user_id})
        console.log(profile)
        if(profile.errorMessage){
            throw new Error(profile.errorMessage)
        }

        const response = {success: 'ok', path: profile.path_name + profile.file_name}
        res.status(200).json(response)
    }catch (e) {
        next(e)
    }
})

profileRouter.put('/profile/:user_id',
    (req, res, next) => {
        fileHandler(req, res, async (err)  => {
            try{
                if(!req.file){
                    throw new Error('파일이 전송되지 않았습니다.')
                }

                console.log('req.file>>>', req.file)
                const { user_id } = req.params
                const toUpdate = { file_name: req.file.filename, path_name: req.file.destination }

                const updatedProfile = await profileService.setProfile({user_id, toUpdate})

                if(updatedProfile.errorMessage){
                    throw new Error(updatedProfile.errorMessage)
                }
                res.status(200).json(updatedProfile)
            }catch (e) {
                next(e)
            }

        })

})

profileRouter.delete('/profile/:user_id', async (req, res, next) => {
    const { user_id } = req.params
    const result = await profileService.deleteProfile({user_id})
    if(result.errorMessage){
        throw new Error(result.errorMessage)
    }

    res.status(200).json(result)
})

export { profileRouter }