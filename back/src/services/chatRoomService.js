import { ChatRoom } from "../db";
import { v4 as uuidv4 } from "uuid";

class chatRoomService {
    static async create(newChatRoom) {

        // id로 유니크 값 사용
        const id = uuidv4();
        newChatRoom.id = id;
        return await ChatRoom.create(newChatRoom);
    }

    static async findById(id) {
        const chatRoom = await ChatRoom.findById(id);

        if (!chatRoom) {
            const errorMessage =
              "해당 채팅방이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return chatRoom
    }

    static async participate(id, userId) {
        const chatRoom = await ChatRoom.participate(id, userId);

        if (!chatRoom) {
            const errorMessage =
              "해당 채팅방이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return chatRoom
    }

    static async leave(id, userId) {
        const chatRoom = await ChatRoom.leave(id, userId);

        if (!chatRoom) {
            const errorMessage =
              "해당 채팅방이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return chatRoom
    }

    static async deleteById(id) {
        return await ChatRoom.deleteById(id);
    }

    static async updateById({ id, toUpdate }) {
        
        const chatRoom = await ChatRoom.findById(id);

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!chatRoom) {
            const errorMessage = "채팅방이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        if (toUpdate.access_count) {
            if (chatRoom.participating_users.length > toUpdate.access_count) {
                const errorMessage = "현재 인원보다 변경하려는 참가 제한 수가 작습니다.";
                return { errorMessage };
            }
        }

        return await ChatRoom.updateById({ id, toUpdate });
    }

    static async findAllByUserId(user_id) {
        return await ChatRoom.findAllByUserId(user_id);
    }

    static async findAll() {
        return await ChatRoom.findAll();
    }
}

export { chatRoomService };