import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { User } from "../entity/User";
import { loginRequestValidate } from "../libs/requestValidation";
import { UserRepository } from "./User";
import app from "../../src/config/app";

/* Sign up new users */

export class Auth {
  static async register(req: Request, res: Response) {
    try {
      const userData: z.infer<typeof loginRequestValidate> = req.body;
      const foundUser = await UserRepository.findOne({
        where: {
          email: userData.email,
        },
      });
      if (foundUser)
        return res.status(409).json({ message: "User already exist" });

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
        return res.status(201).json({
          success: true,
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const userData: z.infer<typeof loginRequestValidate> = req.body;
      const user = await User.findOne({
        where: {
          email: userData.email,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const comparedPassword = bcrypt.compareSync(
        userData.password,
        user.password!
      );
      if (!comparedPassword) {
        return res.status(401).json({ message: "password does not match" });
      }

      const idToken = jwt.sign(
        {
          id: user.id,
        },
        app.environment.dev.SECRET_KEY
      );

      return res.status(200).json({ idToken });
    } catch (error: any) {
      return res.status(500).json({ messsage: error.message });
    }
  }
}
