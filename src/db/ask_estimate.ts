import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { askEstimateOptions } from "./askEstimateOptions";
import { sessionType } from "./pro_session";
import { user } from "./user";

export const askEstimateStatus = pgEnum("askEstimateStatus", [
  "PENDING",
  "PAYED",
  "CANCELLED",
  "REVOKED",
]);

export const askEstimate = pgTable("ask_estimate", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  status: askEstimateStatus("status").default("PENDING"),
  beginAt: date("beginAt").notNull(),
  endAt: date("endAt").notNull(),
  creator: text("creator").references(() => user.id, {
    onDelete: "cascade",
  }),
  atHome: boolean("atHome").default(false),
  sessionType: sessionType("sessionType").default("oneToOne"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updateAt: timestamp("updatedAt", { mode: "date" }),
});

export const askEstimateRelations = relations(askEstimate, ({ one, many }) => ({
  askEstimateOptions: many(askEstimateOptions),
}));

export type AskEstimate = typeof askEstimate.$inferSelect;
export type CreateAskEstimate = typeof askEstimate.$inferInsert;
