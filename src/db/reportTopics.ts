import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { topic } from "./topic";
import { report } from "./report";
import { createInsertSchema } from "drizzle-zod";

export const reportTopic = pgTable("report_topic", {
  reportId: text("reportId").references(() => report.id, {
    onDelete: "cascade",
  }),
  topicId: text("topicId").references(() => topic.id, {
    onDelete: "cascade",
  }),
});

export const reportTopicRelations = relations(reportTopic, ({ one }) => ({
  report: one(report, {
    fields: [reportTopic.reportId],
    references: [report.id],
  }),
  topic: one(topic, {
    fields: [reportTopic.topicId],
    references: [topic.id],
  }),
}));

export type ReportTopic = typeof reportTopic.$inferSelect;
export type CreateReportTopic = typeof reportTopic.$inferInsert;

export const CreateReportTopicSchema = createInsertSchema(reportTopic);
