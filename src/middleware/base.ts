import { Request, Response, NextFunction } from "express";
import { UserController } from "../controller/User";

export class BaseMiddleware {
  static async isUserExist(req: Request, res: Response, next: NextFunction) {
    try {
      const foundUser = UserController.findOneByEmail(req.body.email);
      if (!foundUser) {
        return res.status(404).json({ message: "User not found" });
      }
      next();
    } catch (error) {
      return;
    }
  }
  static async userExist(req: Request, res: Response, next: NextFunction) {
    try {
      const foundUser = await UserController.findOneByEmail(req.body.email);
      if (foundUser) {
        return res.status(409).json({
          message: "User already exist",
        });
      }

      return next();
    } catch (error) {
      return;
    }
  }
}
