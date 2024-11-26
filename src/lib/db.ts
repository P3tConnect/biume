import { neon, Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import * as schema from "../db";
import { safeConfig } from "./env";

const pool = new Pool({ connectionString: safeConfig.DATABASE_URL });
export const db = drizzle({ client: pool, schema: schema });
