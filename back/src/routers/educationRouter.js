import { Router } from 'express'
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";

const educationRouter = Router()
educationRouter.use(login_required)

educationRouter.post('/education/create', async (req, res, next) => {

    try{
        const {user_id, school, major, position} = req.body
        const newEducation = await educationService.create(
            user_id,
            school,
            major,
            position
        )
        res.status(201).json(newEducation)
    }catch (e) {
        next(e)
    }
})

educationRouter.get('/education/:post_id', async (req, res, next) => {
    try {
        const { post_id } = req.params
        const post = await educationService.getOneEducation(post_id)

        if(post.errorMessage){
            throw new Error(post.errorMessage)
        }

        res.status(200).send(post)
    }catch (e) {
        next(e)
    }
})

educationRouter.put('/education/:post_id', async (req, res, next) => {
    try{
        const {post_id} = req.params
        const toUpdate = {
            school: req.body?.school,
            major: req.body?.major,
            position: req.body?.position,
        }
        const updated = await educationService.setEducation({ post_id, toUpdate })

        if(updated.errorMessage){
            throw new Error(updated.errorMessage)
        }

        res.status(200).send(updated)
    }catch (e) {
        next(e)
    }
})

educationRouter.get('/education/:user_id', async (req, res, next) => {
    try{
        const {user_id} = req.params
        const educationList = await educationService.getEducationByUserId({user_id})

        if(educationList.errorMessage){
            throw new Error(educationList.errorMessage)
        }

    }catch (e) {
        next(e)
    }
})

export { educationRouter }