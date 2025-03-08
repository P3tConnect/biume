import { InferSelectModel, relations } from "drizzle-orm"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { Organization, organization } from "./organization"
import { ReportTopic, reportTopic } from "./reportTopics"

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
})

export const topicRelations = relations(topic, ({ one, many }) => ({
  reports: many(reportTopic),
  organization: one(organization, {
    fields: [topic.organizationId],
    references: [organization.id],
  }),
}))

export type Topic = InferSelectModel<typeof topic> & {
  reports: ReportTopic[]
  organization: Organization
}
export type CreateTopic = typeof topic.$inferInsert

export const TopicSchema = createSelectSchema(topic)
export const CreateTopicSchema = createInsertSchema(topic)
