import { AppDataSource } from "src/data-source";
import { Business as BusinessEntity } from "../entity/Business";
import { FindOneOptions } from "typeorm/find-options/FindOneOptions";

export const BusinessRepository = AppDataSource.getRepository(BusinessEntity);

class BusinessController {
  static async all() {
    return BusinessRepository.find();
  }
  static async findOne(options: FindOneOptions) {
    return BusinessRepository.findOne(options);
  }
  static async updateOne() {}
  static async deleteAll() {}
  static async deleteOne() {}
}
