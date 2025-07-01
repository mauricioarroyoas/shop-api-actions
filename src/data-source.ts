import "dotenv/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { Product } from "./entities/Product";

export const AppDataSource = new DataSource({
  // type: "postgres",
  // host: "localhost",
  // port: 5432,
  // username: "postgres",
  // password: "postgres",
  // database: "mydblocal",

  type: "postgres",
  host: process.env.PGHOST,
  port: parseInt(process.env.PGPORT || "5432"),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,

  synchronize: true,
  logging: false,
  entities: [Product],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});
