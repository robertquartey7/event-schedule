import { NextFunction, Request, Response } from "express";
import { UserRepository } from "@controller/User";

export async function userExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const foundUser = await UserRepository.findOne({
    where: {
      email: req.body.email,
    },
  });
  if (foundUser) {
    return next();
  }

  return res.status(409).json({
    message: "User already exist",
  });
}
