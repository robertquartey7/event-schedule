import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "../data-source";
import setupJWTStrategy from "./config/auth";
import passport from "passport";
import authRoute from "./routes/auth";

export const app = express();

app.use(cors());
// app.use(session(appConfig.session));

setupJWTStrategy(passport);
AppDataSource.initialize();

app.use("/", authRoute);
app.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "success",
  });
});
