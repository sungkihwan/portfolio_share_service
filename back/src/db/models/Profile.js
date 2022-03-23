import { ProfileModel } from "../schemas/profile";


class Profile {

    static async create({ newProfile }){
        const createNewImage = await ProfileModel.create(newProfile)
        return createNewImage
    }

    static async findProfileById({id}){
        const profile = await ProfileModel.findOne({ id })
        return profile
    }

    static async findProfileByUserId({user_id}){
        const image = await ProfileModel.find({ user_id })
        return image
    }

    static async deleteProfile(user_id){
        return await ProfileModel.deleteOne({user_id});
    }

    static async updateProfile({ user_id, toUpdate }){
        const filter = { user_id }
        const update = { '$set' : toUpdate }
        const option = { returnOriginal: false }

        const updatedProfile = await ProfileModel.findOneAndUpdate(
            filter,
            update,
            option
        )
        return updatedProfile
    }


}

export { Profile }