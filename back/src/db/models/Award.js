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
        const awards = await AwardModel.find({ user_id })
        return awards
    }
}

export { Award }