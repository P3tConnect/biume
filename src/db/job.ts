import { InferSelectModel, relations } from "drizzle-orm"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

import { Member } from "./member"
import { membersJobs } from "./membersJob"

export const job = pgTable("job", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
})

export const jobRelations = relations(job, ({ many }) => ({
  members: many(membersJobs),
}))

export type Job = InferSelectModel<typeof job> & {
  members: Member[]
}
export type CreateJob = typeof job.$inferInsert

export const SelectJobSchema = createSelectSchema(job)
export const CreateJobSchema = createInsertSchema(job)
