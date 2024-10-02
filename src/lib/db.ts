import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db";
import { safeConfig } from "./env";

const sql = neon(safeConfig.DATABASE_URL);
export const db = drizzle(sql, { schema });
