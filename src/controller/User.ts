import { AppDataSource } from "../data-source";
import { User as UserEntity } from "@entity/User";

export const UserRepository = AppDataSource.getRepository(UserEntity);

export class User {
  public static all() {
    return UserRepository.find();
  }

  public static findById(id: string) {
    return UserRepository.findOne({ where: { id: id } });
  }
  public static findOne({}: User)
}
