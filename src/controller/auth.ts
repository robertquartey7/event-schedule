import dotenv from "dotenv";
dotenv.config();
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";
import { loginRequestValidate } from "../libs/requestValidation";

/* Sign up new users */

export class Auth {
  async register(req: Request, res: Response) {
    try {
      const userData: z.infer<typeof loginRequestValidate> = req.body;
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(userData.password, salt);

      const user = new User();

      user.userData({
        ...userData,
        password: hashPassword
      })
      await user.save()
      
      if (user) {
        delete user.password;
        return res.status(201).json({
          success: true,
          data: user,
        });
      }
    } catch (error: any) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

