import { EducationModel } from "../schemas/education";

class Education {
    static async create({ newInformation }){
        const createdNewEducation = await EducationModel.create(newInformation)
        return createdNewEducation
    }

    static async findByPostId(post_id){
        const posts = await EducationModel.findOne({ id: post_id})
        return posts
    }

    static async updateByPostId({ post_id ,toUpdate }){
        const filter = { id: post_id }
        const update = { '$set' : toUpdate }
        const option = { returnOriginal: false }

        const updatePost = await EducationModel.findOneAndUpdate(
            filter,
            update,
            option
        )
        return updatePost
    }

    static async findByUserId({ user_id }){
        const posts = await EducationModel.find({ user_id: user_id})
        return posts
    }
}

export { Education }