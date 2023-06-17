import {
  serial,
  varchar,
  timestamp,
  index,
  char,
} from "drizzle-orm/mysql-core";
import { todosSqlTable } from "../todosSqlTable";

export const categories = todosSqlTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    nanoid: char("nanoid", { length: 21 }).notNull(),
    name: varchar("name", { length: 200 }).notNull(),
    userId: char("userId", { length: 32 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow().defaultNow(),
  },
  (categoriesTable) => ({
    nanoidIdx: index("nanoidIdx").on(categoriesTable.nanoid),
    nameIdx: index("nameIdx").on(categoriesTable.name),
    userIdIdx: index("userIdIdx").on(categoriesTable.userId),
  })
);
