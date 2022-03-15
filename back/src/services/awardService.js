import { Award } from "../db";
import { v4 as uuidv4 } from "uuid";

class awardService {

    static async addAward({ title, description, user_id }){

        const id = uuidv4()
        const newAward = { id, user_id, title, description }

        const createNewAward = await Award.create({ newAward })

        return createNewAward
    }

    static async getAward({ award_id }){
        const award = await Award.findAwardById({ id: award_id })
        if(!award){
            const errorMessage = '수상내역이 없습니다. 다시 한 번 확인해 주세요.'
            return { errorMessage }
        }

        return award
    }

    static async setAward({ award_id, title, description }){
        let award = await Award.findAwardById({id: award_id})
        if(!award){
            const errorMessage = '수정할 수상 내역이 존재하지 않습니다. 다시 한 번 확인해 주세요.'
            return { errorMessage }
        }

        if(!title || !description){
            throw new Error('수상 이력/상세 내용을 확인해주세요.')
        }

        award = await Award.update({award_id, title, description})
        return award
    }

    static async getAwards({ user_id }){
        const awards = await Award.findByUserId(user_id)
        if(!awards){
            const errorMessage = '수상 내역이 등록되지 않았습니다.'
            return {errorMessage}
        }
    }
}

export { awardService }