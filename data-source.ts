
import { DataSource } from "typeorm"
import { User } from "./src/entity/User"

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: "db.sqlite",
    // synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.{ts,js}'],
    migrations: ['src/migrations/**/*.{ts,js}'],
    subscribers: [],
})
