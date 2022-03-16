import { Education } from "../db"
import { v4 as uuidv4 } from "uuid";

class educationService {
    static async create({ user_id, school, major, position }){
        const id = uuidv4()
        const newEducation = await Education.create({ id, user_id, school, major, position })

        return newEducation
    }

    static async getOneEducation({ post_id }){
        const found = await Education.findByPostId(post_id)
        if(!found){
            const errorMessage = '학력을 조회할 수 없습니다. 다시 한 번 확인해 주세요.'
            return { errorMessage }
        }
        return found
    }

    static async setEducation({ post_id, toUpdate }){
        let education = await Education.findByPostId(post_id)
        if(!education){
            const errorMessage = '수정할 학력이 존재하지 않습니다. 다시 한 번 확인해 주세요.'
            return { errorMessage }
        }
        if(!toUpdate.school || !toUpdate.major || !toUpdate.position){
            throw new Error('학교, 전공, 학력을 확인해 주세요.')
        }
        education = await Education.updateByPostId({ post_id, school, major, position })

        return education
    }

    static async getEducationByUserId({user_id}){
        let education = await Education.findByUserId(user_id)
        if(!education){
            const errorMessage = '학력이 등록되지 않았습니다.'
            return { errorMessage }
        }
        return education
    }
}

export { educationService }