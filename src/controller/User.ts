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
    return await UserRepository.findOne({ where: { id } });
  }

  public static async findOneByEmail(email: string) {
    return await UserRepository.findOne({ where: { email } });
  }

  public static async create(req: Request, res: Response) {
    try {
      const userData = req.body;
      const user = UserRepository.create(userData);
      await UserRepository.save(user);
      return res.status(201).json({ data: user });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ error: "Failed to create user" });
    }
  }

  public static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const userData = req.body;
      await UserRepository.update(id, userData);
      const updatedUser = await UserController.findById(id);
      return res.status(200).json({ data: updatedUser });
    } catch (error) {
      console.error("Error updating user:", error);
      return res.status(500).json({ error: "Failed to update user" });
    }
  }

  public static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await UserRepository.delete(id);
      if (result.affected === 0) {
        return res.status(404).json({ error: "User not found" });
      }
      return res.status(204).send();
    } catch (error) {
      console.error("Error deleting user:", error);
      return res.status(500).json({ error: "Failed to delete user" });
    }
  }

  static async getUsers(req: Request, res: Response) {
    try {
      const users = await UserController.all();
      return res.status(200).json({ data: users });
    } catch (error) {
      console.error("Error retrieving users:", error);
      return res.status(500).json({ error: "Failed to retrieve users" });
    }
  }
}
