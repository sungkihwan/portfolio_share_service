import { Schema, model } from 'mongoose'

const ChatRoomSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    roomname: {
        type: String,
        required: true,
    },
    owner_user_id: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    participating_users: {
        type: [User],
        required: false,
    },
    access_count: {
        type: Number,
        required: false,
    },
},{
    timestamps: true,
})
participation_count
const ChatRoomModel = model('ChatRoom', ChatRoomSchema)

export { ChatRoomModel }
