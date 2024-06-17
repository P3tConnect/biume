import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { proSession } from "./pro_session";
import { relations } from "drizzle-orm";

export const report = pgTable("report", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const reportRelations = relations(report, ({ one, many }) => ({
  session: one(proSession),
}));

export type Report = typeof report.$inferSelect;
export type CreateReport = typeof report.$inferInsert;
