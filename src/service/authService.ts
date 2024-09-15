import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../entity/User";
import { loginRequestValidate } from "../libs/requestValidation";
import { UserController } from "../controller/User";
import { TokenService } from "../service/tokenService";
import jwt from "jsonwebtoken";
export class AuthService {
  static async registeruser(userInfo: any) {
    try {
      const userData: z.infer<typeof loginRequestValidate> = userInfo;
      const foundUser = await UserController.findOneByEmail(userData.email);

      if (foundUser) return null;

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(userData.password, salt);

      const user = new User();

      user.userData({
        ...userData,
        password: hashPassword,
      });
      await user.save();

      if (user) {
        delete user.password;
        return user;
      }
    } catch (error: any) {
      return null;
    }
  }

  static async login(userInfo: z.infer<typeof loginRequestValidate>) {
    try {
      const userData = userInfo;
      const user = await User.findOne({
        where: {
          email: userData.email,
        },
      });

      if (!user) {
        throw new Error("User not found");
      }

      const comparedPassword = bcrypt.compareSync(
        userData.password,
        user.password!
      );
      if (!comparedPassword) {
        throw new Error("password does not match");
      }
      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.params;
      const user = await UserController.findOneByEmail(email);
      if (!user) return res.status(404).json("Email does not exist");

      const token = TokenService.generateIdToken(user.id);

      return res.status(200).json({ token });
    } catch (err: any) {
      return res.status(500).json({ message: err.messsage });
    }
  }
}
