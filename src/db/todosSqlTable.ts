import { mysqlTableCreator } from "drizzle-orm/mysql-core";

export const todosSqlTable = mysqlTableCreator(
  (name) => `todos-next-13_${name}`
);
