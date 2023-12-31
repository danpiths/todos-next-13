import { varchar, timestamp, index, char } from "drizzle-orm/mysql-core";
import { todosSqlTable } from "../todosSqlTable";

export const users = todosSqlTable(
  "users",
  {
    id: char("id", { length: 32 }).primaryKey(),
    name: varchar("name", { length: 200 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow().defaultNow(),
  },
  (usersTable) => ({
    nameIdx: index("nameIdx").on(usersTable.name),
  })
);
