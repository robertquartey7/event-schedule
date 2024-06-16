import { Options } from "sequelize";

export const appConfig = {
  session: {
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  },
  database: {
    dialect: "sqlite",
    storage: "../db.sqlite",
  } as Options,
  
  database2: <Options>{
    dialect: "sqlite",
    storage: "../db.sqlite",
  },
  
};
