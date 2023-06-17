import {
  serial,
  varchar,
  boolean,
  timestamp,
  index,
  char,
} from "drizzle-orm/mysql-core";
import { todosSqlTable } from "../todosSqlTable";

export const todos = todosSqlTable(
  "todos",
  {
    id: serial("id").primaryKey(),
    nanoid: char("nanoid", { length: 21 }).notNull(),
    title: varchar("title", { length: 50 }).notNull(),
    description: varchar("description", { length: 250 }),
    completed: boolean("completed").default(false),
    categoryId: char("categoryId", { length: 21 }),
    userId: char("userId", { length: 32 }).notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").onUpdateNow().defaultNow(),
  },
  (todosTable) => ({
    nanoidIdx: index("nanoidIdx").on(todosTable.nanoid),
    userIdIdx: index("userIdIdx").on(todosTable.userId),
    categoryIdIdx: index("categoryIdIdx").on(todosTable.categoryId),
  })
);
