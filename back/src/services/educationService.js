import {Award, Education} from "../db"
import { v4 as uuidv4 } from "uuid";

class educationService {
    static async create({ user_id, school, major, position }){
        const id = uuidv4()
        const newInformation = {id, user_id, school, major, position}
        console.log(newInformation)

        const newEducation = await Education.create({ newInformation })
        return newEducation
    }

    static async getOneEducation(id){
        const found = await Education.findByPostId(id)
        if(!found){
            const errorMessage = '학력을 조회할 수 없습니다. 다시 한 번 확인해 주세요.'
            return { errorMessage }
        }
        return found
    }

    static async deleteEducation(id){
        const result = await Education.deleteEducationById(id)
        if(!result){
            const errorMessage = '수상 내역을 삭제할 수 없습니다. 다시 한 번 확인해 주세요.'
            return {errorMessage}
        }

        return result
    }

    static async setEducation({ id, toUpdate }){
        let education = await Education.findByPostId(id)
        if(!education){
            const errorMessage = '수정할 학력이 존재하지 않습니다. 다시 한 번 확인해 주세요.'
            return { errorMessage }
        }
        if(!toUpdate.school || !toUpdate.major || !toUpdate.position){
            throw new Error('학교, 전공, 학력을 확인해 주세요.')
        }
        education = await Education.updateByPostId({ id, toUpdate })

        return education
    }

    static async getEducationByUserId({user_id}){
        console.log(user_id)
        let education = await Education.findByUserId(user_id)
        if(!education){
            const errorMessage = '학력이 등록되지 않았습니다.'
            return { errorMessage }
        }

        return education
    }
}

export { educationService }