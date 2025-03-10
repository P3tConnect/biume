import { InferSelectModel, relations } from "drizzle-orm"
import { pgTable, text } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

import { Job, job } from "./job"
import { Member, member } from "./member"

export const membersJobs = pgTable("members_jobs", {
  memberId: text("memberId").references(() => member.id, { onDelete: "cascade" }),
  jobId: text("jobId").references(() => job.id, { onDelete: "cascade" }),
})

export const membersJobsRelations = relations(membersJobs, ({ one }) => ({
  job: one(job, {
    fields: [membersJobs.jobId],
    references: [job.id],
  }),
  member: one(member, {
    fields: [membersJobs.memberId],
    references: [member.id],
  }),
}))

export type MembersJobs = InferSelectModel<typeof membersJobs> & {
  job: Job
  member: Member
}
export type CreateMembersJobs = typeof membersJobs.$inferInsert

export const CreateMembersJobsSchema = createInsertSchema(membersJobs)
