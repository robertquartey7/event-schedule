import { Password as PasswordEntity } from "../entity/Password";
import { AppDataSource } from "../data-source";
import { ResetPasswordInferface } from "src/interface/password";


export const PasswordRepository = AppDataSource.getRepository(PasswordEntity);

export class PasswordController {
  public static async createOne(tokenInfo: ResetPasswordInferface) {
    return PasswordRepository.create({
      token: tokenInfo.token,
      is_expired: false,
      expiration_date: new Date(new Date().getTime() + 60 * 60 * 1000),
      user: tokenInfo.user,
    });
  }

  static async findOneById(id: string) {
    return PasswordRepository.findOne({
      where: {
        id,
      },
    });
  }
  static async findOneByToken(token: string) {
    return PasswordRepository.findOne({
      where: {
        token,
      },
    });
  }

  static async all() {
    return PasswordRepository.find();
  }

  static async deleteAll() {
    return PasswordRepository.clear();
  }
}
