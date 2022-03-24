import { AwardModel } from "../schemas/award";

class Award {
    static async create({ newAward }){
        const createdNewAward = await AwardModel.create(newAward)
        return createdNewAward
    }

    static async findAwardById({ id }){
        const award = await AwardModel.findOne({ id })
        return award
    }

    static async deleteAwardById(id){
        return await AwardModel.deleteOne({ id })
    }

    static async update({ id, toUpdate }){
        const filter = { id: id }
        const update = { '$set': toUpdate }
        const option = { returnOriginal: false }

        const updatedAward = await AwardModel.findOneAndUpdate(
            filter,
            update,
            option
        )

        return updatedAward
    }

    static async findByUserId({ user_id }){
        return await AwardModel.find({ user_id })
    }

    static async deleteByUserId( user_id ){
        return await AwardModel.deleteMany({ user_id })
    }
}

export { Award }