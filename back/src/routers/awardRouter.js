import { Router } from 'express'
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";

const awardRouter = Router()
awardRouter.use(login_required)

awardRouter.post('/award/create', async (req, res, next) => {
    try{
        const {user_id, title, description} = req.body

        const newAward = await awardService.addAward({
            user_id,
            title,
            description
        })

        res.status(201).json(newAward)
    }catch (e){
        next(e)
    }
})

awardRouter.get('/award/:post_id', async (req, res, next) => {
    try{
        const {post_id} = req.params
        const award = await awardService.getAward(post_id)

        if(award.errorMessage){
            throw new Error(award.errorMessage)
        }
        res.status(200).send(award)
    }catch (e) {
        next(e)
    }
})

awardRouter.put('/award/:id', async (req, res, next) => {
    try{
        const {award_id} = req.params
        const toUpdate = {
            title: req.body?.title,
            body: req.body?.body,
        }

        const updatedAward = await awardService.setAward({ award_id, toUpdate })

        if(updatedAward.errorMessage){
            throw new Error(updatedAward.errorMessage)
        }

        res.status(200).json(updatedAward)
    }catch (e) {
        next(e)
    }
})

awardRouter.get('/award/:id', async (req, res, next) => {
    try{
        const {user_id} = req.params
        const allAwards = await awardService.getAwardsByUserId({ user_id })

        if(allAwards.errorMessage){
            throw new Error(allAwards.errorMessage)
        }
        res.status(200).send(allAwards)

    }catch (e) {
        next(e)
    }
})

export { awardRouter }