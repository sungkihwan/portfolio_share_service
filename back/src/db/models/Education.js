import { EducationModel } from "../schemas/education";
import {AwardModel} from "../schemas/award";

class Education {
    static async create({ newInformation }){
        const createdNewEducation = await EducationModel.create(newInformation)
        return createdNewEducation
    }

    static async findByPostId(id){
        const posts = await EducationModel.findOne({ id })
        return posts
    }

    static async deleteEducationById(id){
        return await EducationModel.deleteOne({ id })
    }

    static async updateByPostId({ id ,toUpdate }){
        const filter = { id }
        const update = { '$set' : toUpdate }
        const option = { returnOriginal: false }

        const updatePost = await EducationModel.findOneAndUpdate(
            filter,
            update,
            option
        )
        return updatePost
    }

    static async findByUserId(user_id){
        const posts = await EducationModel.find({ user_id })
        return posts
    }
}

export { Education }