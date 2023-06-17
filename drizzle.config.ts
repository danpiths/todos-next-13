import "dotenv/config";
import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema/*",
  out: "./drizzle",
  connectionString: process.env.DATABASE_URL,
  tablesFilter: ["todos-next-13_*"],
} satisfies Config;
