import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create(newCertificate) {
    return await CertificateModel.create(newCertificate);
  }

  static async findById(id) {
    return await CertificateModel.findOne({ id });
  }

  static async deleteById(id) {
    return await CertificateModel.deleteOne({ id });
  }

  static async findAllByUserId(user_id) {
    return await CertificateModel.find({ user_id });
  }

  static async updateById({ id, toUpdate }) {
    const filter = { id };
    const update = { "$set": toUpdate }
    const option = { returnOriginal: false };

    return await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
  }
}

export { Certificate };
