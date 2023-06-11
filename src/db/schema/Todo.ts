import {
  mysqlTable,
  serial,
  varchar,
  text,
  boolean,
  int,
  timestamp,
  index,
  char,
} from "drizzle-orm/mysql-core";

export const todos = mysqlTable(
  "todos",
  {
    id: serial("id").primaryKey(),
    nanoid: char("nanoid", { length: 21 }).notNull(),
    title: varchar("title", { length: 200 }).notNull(),
    description: text("description"),
    completed: boolean("completed").default(false),
    categoryId: int("categoryId"),
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
