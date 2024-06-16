import express from "express";
import session from "express-session";
import cors from "cors";
import { appConfig } from "./config/app";
export const app = express();

app.use(cors());
app.use(session(appConfig.session));
