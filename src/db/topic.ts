import { relations } from "drizzle-orm";
import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { reportTopic } from "./reportTopics";
import { company } from "./company";

export const topic = pgTable("topic", {
    id: text("")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    description: text("description").notNull(),
    companyId: text("companyId").references(() => company.id, {
        onDelete: "cascade",
    }),
    createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const topicRelations = relations(topic, ({ one, many }) => ({
    reports: many(reportTopic),
    company: one(company, {
        fields: [topic.companyId],
        references: [company.id],
    }),
}));

export type Topic = typeof topic.$inferSelect;
export type CreateTopic = typeof topic.$inferInsert;
