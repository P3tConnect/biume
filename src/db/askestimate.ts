import {
  boolean,
  date,
  pgEnum,
  pgTable,
  serial,
  timestamp,
} from "drizzle-orm/pg-core";
import { sessionType } from "./pro_session";

export const askEstimateStatus = pgEnum("ask_estimate_status", [
  "PENDING",
  "ACCEPTED",
  "REFUSED",
]);

export const askEstimate = pgTable("ask_estimate", {
  id: serial("id").primaryKey(),
  status: askEstimateStatus("status").default("PENDING"),
  beginAt: date("beginAt").notNull(),
  endAt: date("endAt").notNull(),
  atHome: boolean("atHome").default(false).notNull(),
  type: sessionType("type").default("oneToOne").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});
