import "dotenv/config";

import { defineConfig } from "drizzle-kit";
import { safeConfig } from "./src/lib/env";

export default defineConfig({
  schema: "./src/db/*",
  out: "./src/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: safeConfig.DATABASE_HOST,
    port: 5432,
    user: safeConfig.DATABASE_USER,
    password: safeConfig.DATABASE_PASSWORD,
    database: safeConfig.DATABASE_NAME,
    ssl: false,
  },
});