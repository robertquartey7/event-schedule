import express, { Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./data-source";
import setupJWTStrategy from "./config/auth";
import passport from "passport";
import authRoute from "./routes/auth";

export const app = express();

app.use(express.json());
app.use(cors());

setupJWTStrategy(passport);
AppDataSource.initialize();

app.use("/api", authRoute);

app.get("/api", (req: Request, res: Response) => {
  return res.status(200).json({
    message: "success",
  });
});
