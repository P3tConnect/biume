import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { reportTopic } from "./reportTopics";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { organization } from "./organization";

export const topic = pgTable("topic", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  organizationId: text("organizationId").references(() => organization.id, {
    onDelete: "cascade",
  }),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const topicRelations = relations(topic, ({ one, many }) => ({
  reports: many(reportTopic),
  organization: one(organization, {
    fields: [topic.organizationId],
    references: [organization.id],
  }),
}));

export type Topic = typeof topic.$inferSelect;
export type CreateTopic = typeof topic.$inferInsert;

export const TopicSchema = createSelectSchema(topic);
export const CreateTopicSchema = createInsertSchema(topic);
