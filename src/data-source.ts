import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "123",
  database: "booking",
  logging: false,
  entities: [__dirname + "/entity/*.ts"],
  migrations: [__dirname + "/migrations/*.ts"],
  subscribers: [],
  logger: "debug",
});
