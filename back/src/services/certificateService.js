import { Certificate } from "../db"; // from을 폴더(db) 로 설정 시, 디폴트로 index.js 로부터 import함.
import { v4 as uuidv4 } from "uuid";

class certificateService {
  static async create(newCertificate) {
    const id = uuidv4();
    newCertificate.id = id;
    return await Certificate.create(newCertificate);
  }

  static async findById(id) {
    // 이메일 db에 존재 여부 확인
    const certificate = await Certificate.findById(id);
    if (!certificate) {
      const errorMessage = "수상내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }
    
    return certificate;
  }

  static async findAllByUserId(user_id) {    
    return await User.findAll(user_id);
  }

  static async update(id, toUpdate) {
    const certificate = await Certificate.findById(id);

    if (!certificate) {
      const errorMessage = "수상내역이 없습니다. 다시 한 번 확인해 주세요.";
      return { errorMessage };
    }

    return await Certificate.update({ id, toUpdate });
  }
}

export { certificateService };
