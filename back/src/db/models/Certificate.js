import { CertificateModel } from "../schemas/certificate";

class Certificate {
  static async create(newCertificate) {
    return await CertificateModel.create(newCertificate);
  }

  static async findByEmail({ email }) {
    const user = await CertificateModel.findOne({ email });
    return user;
  }

  static async findById(id) {
    return await CertificateModel.findOne({ id });
  }

  static async findAllByUserId(user_id) {
    return await CertificateModel.find({ user_id });
  }

  static async update({ id, fieldToUpdate, newValue }) {
    const filter = { id: id };
    const update = { [fieldToUpdate]: newValue };
    const option = { returnOriginal: false };

    return await CertificateModel.findOneAndUpdate(
      filter,
      update,
      option
    );
  }
}

export { Certificate };
