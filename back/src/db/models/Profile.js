import { ImageModel } from "../schemas/profile";
import {AwardModel} from "../schemas/award";

class Profile {

    static async create({ newImage }){
        const createNewImage = await ImageModel.create(newImage)
        return createNewImage
    }

    static async findImageByUserId({user_id}){
        const image = await ImageModel.find({ user_id })
        return image
    }

    static async deleteImage(id){
        return await ImageModel.deleteOne({id});
    }

    static async updateImage({ id, toUpdate }){
        //
    }


}

export { Profile }