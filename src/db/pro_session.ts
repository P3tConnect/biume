import {
  boolean,
  date,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { company } from "./company";
import { user } from "./user";

export const sessionType = pgEnum("session_type", ["oneToOne", "multiple"]);

export const sessionStatusType = pgEnum("session_status_type", [
  "PAYED",
  "IN PROGRESS",
  "WAITING FROM CLIENT",
  "REFUND",
]);

export const pro_session = pgTable("pro_session", {
  id: serial("id").primaryKey(),
  proId: text("proId").references(() => company.id, { onDelete: "cascade" }),
  clientId: text("clientId").references(() => user.id, { onDelete: "cascade" }),
  beginAt: date("beginAt").notNull(),
  endAt: date("endAt").notNull(),
  status: sessionStatusType("status").default("IN PROGRESS").notNull(),
  atHome: boolean("atHome").default(false).notNull(),
  type: sessionType("type").default("oneToOne").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" })
    .default(new Date())
    .notNull(),
  updated: timestamp("updatedAt", { mode: "date" }),
});
