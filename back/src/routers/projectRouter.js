import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { projectService } from "../services/projectService";
import moment from 'moment';

const projectRouter = Router();

// token 검사
projectRouter.use(login_required);

projectRouter.post("/project/create", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요"
            );
        }
        
        const fromDateValidation = moment(req.body.from_date, 'YYYY-MM-DD', true).isValid();
        const toDateValidation = moment(req.body.to_date, 'YYYY-MM-DD', true).isValid();
        
        if (!fromDateValidation || !toDateValidation) {
            throw new Error(
                "날짜 형식은 YYYY-MM-DD 이어야 합니다."
            );
        }

        const from_date = new Date(req.body.from_date);
        const to_date = new Date(req.body.to_date);

        if (from_date > to_date) {
            throw new Error(
                "시작일보다 종료일이 빠릅니다."
            );
        }

        const newProject = await projectService.create({
            user_id: req.body.user_id,
            title: req.body.title,
            description: req.body.description,
            from_date: req.body.from_date,
            to_date: req.body.to_date,
        });

        res.status(201).json(newProject);
    } catch (error) {
        next(error);
    }
});

projectRouter.get("/projects/:id", async (req, res, next) => {
    try {
        const project = await projectService.findById(req.params.id);

        if (project.errorMessage) {
            throw new Error(project.errorMessage);
        }

        res.status(200).send(project);
    } catch (error) {
        next(error);
    }
});

projectRouter.get("/projectlist/:user_id", async (req, res, next) => {
    try {
        const projectList = await projectService.findAllByUserId(req.params.user_id);
        res.status(200).send(projectList);
    } catch (error) {
        next(error);
    }
});

projectRouter.delete("/projects/:id", async (req, res, next) => {
    try {
        const deletedCount = await projectService.deleteById(req.params.id);
        res.status(200).send(deletedCount);
    } catch (error) {
        next(error);
    }
});

projectRouter.put("/projects/:id", async (req, res, next) => {
    try {
        // URI로부터 사용자 id를 추출함.
        const id = req.params.id;
        // body data 로부터 업데이트할 사용자 정보를 추출함.
        const title = req.body.title ?? null;
        const description = req.body.description ?? null;
        const from_date = req.body.from_date ?? null;
        const to_date = req.body.to_date ?? null;

        if (from_date) {
            const fromDateValidation = moment(from_date, 'YYYY-MM-DD', true).isValid();
            if (!fromDateValidation) {
                throw new Error(
                    "날짜 형식은 YYYY-MM-DD 이어야 합니다."
                );
            }
        }

        if (to_date) {
            const toDateValidation = moment(to_date, 'YYYY-MM-DD', true).isValid();
            if (!toDateValidation) {
                throw new Error(
                    "날짜 형식은 YYYY-MM-DD 이어야 합니다."
                );
            }
        }

        if (from_date && to_date) {
            const from_dateValid = new Date(from_date);
            const to_dateValid = new Date(to_date);

            if (from_dateValid > to_dateValid) {
                throw new Error(
                    "시작일보다 종료일이 빠릅니다."
                );
            }
        }

        const toUpdate = { title, description, from_date, to_date };

        // 해당 프로젝트 아이디로 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
        const updatedProject = await projectService.updateById({ id, toUpdate });

        if (updatedProject.errorMessage) {
            throw new Error(updatedProject.errorMessage);
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        next(error);
    }
});

export { projectRouter };