import { Request, Response } from "express";
import { TokenService } from "../service/tokenService";
import { AuthService } from "../service/authService";
import { PasswordController } from "./Password";

/* Sign up new users */

export class Auth {
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);
      if (!user)
        return res.status(500).json({ message: "something went wrong" });

      return res
        .status(200)
        .cookie("id_token", TokenService.generateIdToken(user.id))
        .cookie("access_token", TokenService.generateAccessToken(user))
        .cookie("refresh_token", TokenService.generateRefreshToken())
        .json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const user = await AuthService.login(req.body);
      if (!user) return res.status(404).json({ message: "User not found" });
      return res
        .status(200)
        .cookie("id_token", TokenService.generateIdToken(user.id))
        .cookie("access_token", TokenService.generateAccessToken(user))
        .cookie("refresh_token", TokenService.generateRefreshToken())
        .json({ success: true });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      const token = await AuthService.requestForgotPassword(req.params.email);
      if (!token) return res.status(404).json("Email does not exist");
      return res.status(200).json({ token });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }
  }

  static async logout(_req: Request, res: Response) {
    // return res.clearCookie('');
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { passwordA, passwordB, token } = req.body;
      await AuthService.resetPassword(token, passwordA, passwordB);
      return res.status(200).json({ message: "success" });
    } catch (err: any) {
      return res.status(500).json({ message: err.message });
    }

  }
}
