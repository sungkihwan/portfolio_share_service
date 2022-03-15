import { ProjectModel } from "../schemas/project";

class Project {
    static async create(newProject) {
        return await ProjectModel.create(newProject);
    }

    static async findById(id) {
        return await ProjectModel.findOne({ id });
    }

    static async update({ id , toUpdate }) {
        const filter = { id };
        const update = { "$set": toUpdate }
        const option = { returnOriginal: false };

        return await ProjectModel.findOneAndUpdate(
            filter,
            update,
            option
        );
    }

    static async findAllByUserId(user_id) {
        return await ProjectModel.find({ user_id });
    }
}

export { Project };