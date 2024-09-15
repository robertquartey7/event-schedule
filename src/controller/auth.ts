import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { z } from "zod";
import { User } from "../entity/User";
import { loginRequestValidate } from "../libs/requestValidation";
import {  UserController } from "./User";
import { TokenService } from "../service/tokenService";
import { AuthService } from "src/service/authService";

/* Sign up new users */

export class Auth {
  static async register(req: Request, res: Response) {
    try {
      const user = AuthService.login(req.body);
      
      
    } catch (error: any) {
     
    }
  }

  static async login(req: Request, res: Response) {
    try {
      res.cookie("id_token", TokenService.generateIdToken(user.id));
      res.cookie("access_token", TokenService.generateAccessToken(user));
      res.cookie("refresh_token", TokenService.generateRefreshToken());
    } catch (error: any) {
      
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      
    } catch (err: any) {
    
    }
  }
}
