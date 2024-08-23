import { Request, Response, NextFunction } from "express";
import { User } from "../controller/User";

export class BaseMiddleware {
  static async isUserExist(req: Request, res: Response, next: NextFunction) {
    try {
      const foundUser = User.findOneByEmail(req.body.email);
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }
      next();
    } catch (error) {}
  }
  static async userExist(req: Request, res: Response, next: NextFunction) {
    try {
      const foundUser = await User.findOneByEmail(req.body.email);
      if (foundUser) {
        return res.status(409).json({
          message: "User already exist",
        });
      }
      
      return next();
    } catch (error) {}
  }
}
