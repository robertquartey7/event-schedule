import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  logging: false,
  entities: [__dirname + '/entity/*.ts'],
  migrations: [__dirname + '/migrations/*.ts'],
  subscribers: [],
  logger: 'debug',
});
