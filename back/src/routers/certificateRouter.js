import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { certificateService } from "../services/certificateService";

const certificateRouter = Router();
certificateRouter.use(login_required);

certificateRouter.post("/certificate/create", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // 데이터를 db에 추가하기
    const newCertificate = await certificateService.create({
      user_id: req.body.user_id,
      title: req.body.title,
      description: req.body.description,
      when_date: req.body.when_date,
    });

    if (newCertificate.errorMessage) {
      throw new Error(newCertificate.errorMessage);
    }

    res.status(201).json(newCertificate);
  } catch (error) {
    next(error);
  }
});

certificateRouter.get("/certificates/:id", async (req, res, next) => {
  try {
    const certificate = await certificateService.findById(req.params.id);

    if (certificate.errorMessage) {
      throw new Error(certificate.errorMessage);
    }

    res.status(200).json(certificate);
  } catch (error) {
    next(error)
  }
})

certificateRouter.delete("/certificates/:id", async (req, res, next) => {
  try {
    const deletedCount = await certificateService.deleteById(req.params.id);
    res.status(200).json(deletedCount);
  } catch (error) {
    next(error)
  }
})

certificateRouter.put("/certificates/:id", async (req, res, next) => {
  try {

    const title = req.body.title ?? null;
    const description = req.body.description ?? null;
    const when_date = req.body.when_date ?? null;

    const updatedCertificate = await certificateService.update(req.params.id, {
      title,
      description,
      when_date,
    });

    if (updatedCertificate.errorMessage) {
      throw new Error(updatedCertificate.errorMessage);
    }

    res.status(200).json(updatedCertificate);
  } catch (error) {
    next(error)
  }
})

certificateRouter.get("/certificatelist/:user_id", async (req, res, next) => {
  try {
    const certificateList = await certificateService.findAllByUserId(req.params.user_id);
    res.status(200).json(certificateList);
  } catch (error) {
    next(error)
  }
})

export { certificateRouter };
