import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { User as UserEntity } from "../entity/User";

export const UserRepository = AppDataSource.getRepository(UserEntity);

export class UserController {
  public static async all() {
    return await UserRepository.find({
      select: { resetPasswords: true },
    });
  }

  public static async findById(id: string) {
    return await UserRepository.findOne({ where: { id: id } });
  }
  public static async findOneByEmail(email: string) {
    return await UserRepository.findOne({ where: { email } });
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const user = await UserController.all()
      return res.status(200).json({data: user})
    } catch (error) {
      return 
    }
  }
}
