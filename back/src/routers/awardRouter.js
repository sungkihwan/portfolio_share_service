import is from "@sindresorhus/is";
import { Router } from 'express'
import { login_required } from "../middlewares/login_required";
import { awardService } from "../services/awardService";


const awardRouter = Router()
awardRouter.use(login_required)

awardRouter.post('/award/create', async (req, res, next) => {
    try{
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

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

awardRouter.get('/awards/:id', async (req, res, next) => {
    try{
        const {id} = req.params
        const award = await awardService.getAward({id})

        if(award.errorMessage){
            throw new Error(award.errorMessage)
        }
        res.status(200).send(award)
    }catch (e) {
        next(e)
    }
})

awardRouter.delete('/awards/:id', async (req, res, next) => {
    try{
        const {id} = req.params
        const award = await awardService.deleteAward(id)

        if(award.errorMessage){
            throw new Error(award.errorMessage)
        }

        res.status(200).json(award)
    }catch (e) {
        next(e)
    }
})

awardRouter.put('/awards/:id', async (req, res, next) => {
    try{
        const {id} = req.params
        const toUpdate = {
            title: req.body?.title,
            description: req.body?.description,
        }

        const updatedAward = await awardService.setAward({ id, toUpdate })

        if(updatedAward.errorMessage){
            throw new Error(updatedAward.errorMessage)
        }

        res.status(200).json(updatedAward)
    }catch (e) {
        next(e)
    }
})

awardRouter.get('/awardlist/:user_id', async (req, res, next) => {
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