import crypto from 'crypto'
import jwt from "jsonwebtoken";
import appConfig from "../config/app";

const secretKey = appConfig.environment.dev.SECRET_KEY;
export class TokenService {
  static generateToken(): string {
    return crypto.randomBytes(64).toString("hex");
  }

  static generateAccessToken(accessInfo: any): string {
    return jwt.sign({ ...accessInfo }, secretKey);
  }
  static generateIdToken(id: string) {
    return jwt.sign({ id: id }, secretKey);
  }
  static generateRefreshToken(): void {}

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, secretKey);
    } catch (error) {
      throw new Error("Token is invalid");
    }
  }
}