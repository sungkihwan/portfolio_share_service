import { Project } from "../db";
import { v4 as uuidv4 } from "uuid";

class projectService {
    static async create(newProject) {

        // id로 유니크 값 사용
        const id = uuidv4();
        newProject.id = id;
        return await Project.create(newProject);
    }

    static async findById(id) {
        const project = await Project.findById(id);

        if (!project) {
            const errorMessage =
              "해당 프로젝트가 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        return project
    }

    static async update({ id, toUpdate }) {
        
        const project = await Project.findById(id);

        // db에서 찾지 못한 경우, 에러 메시지 반환
        if (!project) {
            const errorMessage = "프로젝트가 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        if (!toUpdate.title) {
            delete toUpdate.title
        }

        if (!toUpdate.description) {
            delete toUpdate.description
        }

        if (!toUpdate.from_date) {
            delete toUpdate.from_date
        }

        if (!toUpdate.to_date) {
            delete toUpdate.to_date
        }

        return await Project.update({ id, toUpdate });
    }

    static async findAllByUserId(user_id) {
        return await Project.findAllByUserId(user_id);
    }
}

export { projectService };