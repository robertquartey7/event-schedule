import { User } from "./User";
import { Password as PasswordEntity } from "../entity/Password";
import { AppDataSource } from "../data-source";
import { Request, Response } from "express";

export const PasswordRepository = AppDataSource.getRepository(PasswordEntity);

export class Password {

  
  public static async resetPassword(req: Request, res: Response) {
    try {
      // const user = await User.findOneByEmail(email);
    } catch (error) {}
  }

  public static async resetPasswordToken(req: Request, res: Response) {
    try {
      const user = req?.user;
      console.log(res);
    } catch (error) {}
  }
}
