import { Business as BusinessEntity } from "../entity/Business";
import { AppDataSource } from "../data-source"; // Adjust the import based on your structure

export const BusinessRepository = AppDataSource.getRepository(BusinessEntity);

class BusinessController {
  static async all(): Promise<BusinessEntity[]> {
    return BusinessRepository.find();
  }

  static async findById(id: string): Promise<BusinessEntity | null> {
    try {
      return await BusinessRepository.findOne({ where: { id } });
    } catch (error) {
      console.error("Error finding business:", error);
      throw new Error("Business not found");
    }
  }

  static async updateOne(id: string, updateData: Partial<BusinessEntity>): Promise<BusinessEntity | null> {
    try {
      await BusinessRepository.update(id, updateData);
      return this.findById(id);
    } catch (error) {
      console.error("Error updating business:", error);
      throw new Error("Update failed");
    }
  }

  static async deleteAll(): Promise<void> {
    try {
      await BusinessRepository.clear();
    } catch (error) {
      console.error("Error deleting all businesses:", error);
      throw new Error("Delete all failed");
    }
  }

  static async deleteOne(id: string): Promise<void> {
    try {
      const result = await BusinessRepository.delete(id);
      if (result.affected === 0) {
        throw new Error("Business not found");
      }
    } catch (error) {
      console.error("Error deleting business:", error);
      throw new Error("Delete failed");
    }
  }
}

export default BusinessController;
