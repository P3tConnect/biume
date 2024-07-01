import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { proSession } from "./pro_session";
import { relations } from "drizzle-orm";
import { reportTopic } from "./reportTopics";
import { createInsertSchema } from "drizzle-zod";

export const report = pgTable("report", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  image: text("image"),
  title: text("title").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const reportRelations = relations(report, ({ one, many }) => ({
  session: one(proSession),
  topics: many(reportTopic),
}));

export type Report = typeof report.$inferSelect;
export type CreateReport = typeof report.$inferInsert;

export const CreateReportSchema = createInsertSchema(report);
