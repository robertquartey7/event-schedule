import bcrypt from "bcrypt";
import {  z } from "zod";
import { User } from "../entity/User";
import { loginRequestValidate } from "../request/requestValidation";
import { UserController } from "../controller/User";
import { TokenService } from "../service/tokenService";
import { PasswordController } from "../controller/Password";

export class AuthService {
  static async register(userInfo: any) {
    try {
      const userData: z.infer<typeof loginRequestValidate> = userInfo;

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
      throw new Error(error.message);
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

  static async requestForgotPassword(email: string) {
    try {
      const user = await UserController.findOneByEmail(email);
      if (!user) throw new Error("Email does not exist");
      const generateTokentoken = TokenService.generateIdToken(user.id);
      const resetPassword = await PasswordController.createOne({
        token: generateTokentoken,
        user: user,
      });
      if (!resetPassword) throw new Error("Something went wrong");
      await resetPassword.save();
      return resetPassword.token;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
  static async resetPassword(
    token: string,
    password: string,
    newPassword: string
  ) {
    try {
      const resetPassword = await PasswordController.findOneByToken(token);

      if (
        !resetPassword ||
        (resetPassword.expiration_date &&
          resetPassword.expiration_date < new Date())
      ) {
        throw new Error("Invalid or expired token");
      }

      if (resetPassword.user?.password === password)
        throw new Error("Password does not match");

      if (resetPassword.user) {
        resetPassword.user.password = newPassword;
      }
      return await resetPassword.save();
    } catch (error: unknown) {
      if (error instanceof Error) throw new Error(error.message);
    }
  }
}
