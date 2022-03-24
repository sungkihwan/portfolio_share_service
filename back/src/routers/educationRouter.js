import { Router } from 'express'
import { login_required } from "../middlewares/login_required";
import { educationService } from "../services/educationService";
import is from "@sindresorhus/is";

const educationRouter = Router()
educationRouter.use(login_required)

educationRouter.post('/education/create', async (req, res, next) => {

    try{
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
        const {user_id, school, major, position} = req.body
        const newEducation = await educationService.create({
                user_id,
                school,
                major,
                position
        })
        res.status(201).json(newEducation)
    }catch (e) {
        next(e)
    }
})

educationRouter.get('/educations/:id', async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await educationService.getOneEducation(id)

        if(post.errorMessage){
            throw new Error(post.errorMessage)
        }

        res.status(200).send(post)
    }catch (e) {
        next(e)
    }
})

educationRouter.delete('/educations/:id', async(req, res, next) => {
    try{
        const {id} = req.params
        const education = await educationService.deleteEducation(id)

        if(education.errorMessage){
            throw new Error(education.errorMessage)
        }

        res.status(200).json(education)
    }catch (e) {
        next(e)
    }
})

educationRouter.put('/educations/:id', async (req, res, next) => {
    try{
        const {id} = req.params
        const toUpdate = {
            school: req.body?.school,
            major: req.body?.major,
            position: req.body?.position,
        }
        const updated = await educationService.setEducation({ id, toUpdate })

        if(updated.errorMessage){
            throw new Error(updated.errorMessage)
        }

        res.status(200).send(updated)
    }catch (e) {
        next(e)
    }
})

educationRouter.get('/educationlist/:user_id', async (req, res, next) => {
    try{

        const {user_id} = req.params
        console.log(user_id)
        const educationList = await educationService.getEducationByUserId({user_id})

        if(educationList.errorMessage){
            throw new Error(educationList.errorMessage)
        }
        res.status(200).send(educationList)
    }catch (e) {
        next(e)
    }
})

export { educationRouter }