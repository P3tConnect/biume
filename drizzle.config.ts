import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "./src/utils/env";

export default defineConfig({
  schema: "./src/db/*.ts",
  out: "./src/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
});
