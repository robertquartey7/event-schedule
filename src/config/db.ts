import { Sequelize } from "sequelize";
import { appConfig } from "./app";


export const sequelize = new Sequelize(appConfig.database);
