import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../db";

const sql = neon(
  "postgresql://pawthera_db_owner:P8OQM9LHxlUp@ep-misty-firefly-a2bm78th.eu-central-1.aws.neon.tech/pawthera_db?sslmode=require",
);
export const db = drizzle(sql, { schema });
