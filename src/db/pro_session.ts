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
import { relations } from "drizzle-orm";
import { estimate } from "./estimate";
import { invoice } from "./invoice";
import { sessionOptions } from "./sessionOptions";

export const sessionType = pgEnum("session_type", ["oneToOne", "multiple"]);

export const sessionStatusType = pgEnum("session_status_type", [
  "PAYED",
  "IN PROGRESS",
  "WAITING FROM CLIENT",
  "REFUND",
]);

export const proSession = pgTable("pro_session", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
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

export const proSessionRelations = relations(proSession, ({ one, many }) => ({
  estimate: one(estimate),
  invoice: one(invoice),
  options: many(sessionOptions),
}));
