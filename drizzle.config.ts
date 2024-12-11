import "dotenv/config";

import { defineConfig } from "drizzle-kit";
import { safeConfig } from "./src/lib/env";

export default defineConfig({
  schema: "./src/db/*",
  out: "./src/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: safeConfig.DATABASE_URL,
  },
});
