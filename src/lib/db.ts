import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { schema } from "../db";
import { safeConfig } from "./env";

// const sql = neon(safeConfig.DATABASE_URL);
const client = new Pool({
  host: safeConfig.DATABASE_HOST,
  port: 5432,
  user: safeConfig.DATABASE_USER,
  password: safeConfig.DATABASE_PASSWORD,
  database: safeConfig.DATABASE_NAME,
  ssl: false,
});
export const db = drizzle(client, { schema });