import { ChatRoomModel } from "../schemas/chatRoom";

class ChatRoom {
  static async create(newChatRoom) {
    return await ChatRoomModel.create(newChatRoom);
  }
  
  static async participate(id, userId) {
    return await ChatRoomModel.create();
  }

  static async leave(id, userId) {
    return await ChatRoomModel.create();
  }

  static async findById(id) {
    return await ChatRoomModel.findOne({ id });
  }

  static async deleteById(id) {
    return await ChatRoomModel.deleteOne({ id });
  }

  static async findAllByUserId(owner_user_id) {
    return await ChatRoomModel.find({ owner_user_id });
  }

  static async findAll() {
    return await ChatRoomModel.find({});
  }

  static async updateById({ id, toUpdate }) {
    const filter = { id };
    const update = { "$set": toUpdate }
    const option = { returnOriginal: false };

    return await ChatRoomModel.findOneAndUpdate(
      filter,
      update,
      option
    );
  }

  static async deleteByUserId(user_id) {
    return await ChatRoomModel.deleteMany({ user_id });
  }
}

export { ChatRoom };
