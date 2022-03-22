import { Schema, model } from 'mongoose'

const ImageSchema = new Schema({
    id:{
        type: String,
        required: true,
    },
    user_id: {
        type: String,
        required: true,
    },
    path_name: {
        type: String,
        required: true,
    },
    file_name: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true,
    }
)

const ImageModel = model('Image', ImageSchema)

export { ImageModel }