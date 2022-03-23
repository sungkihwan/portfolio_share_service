import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { chatRoomService } from "../services/chatRoomService";
import moment from 'moment';

const chatRoomRouter = Router();

// token 검사
chatRoomRouter.use(login_required);

// 룸 생성
chatRoomRouter.post("/chatRoom/create", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }

        const newChatRoom = {
            owner_user_id: req.body.user_id,
            password: req.body.password,
            roomname: req.body.roomname,
            description: req.body.description,
            access_count: req.body.access_count,
        }

        if (!newChatRoom.access_count) delete newChatRoom.access_count;

        const createdChatRoom = await chatRoomService.create(newChatRoom);

        res.status(201).json(createdChatRoom);
    } catch (error) {
        next(error);
    }
});

// 룸 참가
chatRoomRouter.post("/chatRoom/:id", async (req, res, next) => {
    try {
        const userId = req.body.user_id;
        const id = req.params.id;
        const createdChatRoom = await chatRoomService.participate(id, userId);
        res.status(201).json(createdChatRoom);
    } catch (error) {
        next(error);
    }
});

// 룸 떠나기
chatRoomRouter.delete("/chatRoom/:id", async (req, res, next) => {
    try {
        const deletedCount = await chatRoomService.deleteById(req.params.id);
        res.status(200).send(deletedCount);
    } catch (error) {
        next(error);
    }
});

// 룸 조회
chatRoomRouter.get("/chatRoom/:id", async (req, res, next) => {
    try {
        const chatRoom = await chatRoomService.findById(req.params.id);

        if (chatRoom.errorMessage) {
            throw new Error(chatRoom.errorMessage);
        }

        res.status(200).send(chatRoom);
    } catch (error) {
        next(error);
    }
});

// 룸 리스트 조회
chatRoomRouter.get("/chatRoomlist", async (req, res, next) => {
    try {
        const projectList = await chatRoomService.findAll();
        res.status(200).send(projectList);
    } catch (error) {
        next(error);
    }
});


// 룸 수정
chatRoomRouter.put("/chatRoom/:id", async (req, res, next) => {
    try {
        // URI로부터 chatRoom id를 추출함.
        const id = req.params.id;
        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const description = req.body.description ?? null;
        const roomname = req.body.roomname ?? null;
        const password = req.body.password ?? null;
        const access_count = req.body.accessCount ?? null;

        const toUpdate = { roomname, description, password, access_count };

        if (!toUpdate.roomname) delete toUpdate.roomname
        if (!toUpdate.description) delete toUpdate.description
        if (!toUpdate.password) delete toUpdate.password
        if (!toUpdate.access_count) delete toUpdate.access_count

        // 해당 프로젝트 아이디로 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
        const updatedChatRoom = await chatRoomService.updateById({ id, toUpdate });

        if (updatedChatRoom.errorMessage) {
            throw new Error(updatedChatRoom.errorMessage);
        }

        res.status(200).json(updatedChatRoom);
    } catch (error) {
        next(error);
    }
});

export { chatRoomRouter };