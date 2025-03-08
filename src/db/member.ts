import { InferSelectModel, relations } from "drizzle-orm"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import { createSelectSchema } from "drizzle-zod"

import { MembersJobs, membersJobs } from "./membersJob"
import { Organization, organization } from "./organization"
import { User, user } from "./user"

export const member = pgTable("members", {
  id: text("id").primaryKey(),
  organizationId: text("organizationId")
    .notNull()
    .references(() => organization.id),
  userId: text("userId")
    .notNull()
    .references(() => user.id),
  role: text("role").notNull(),
  createdAt: timestamp("createdAt").notNull(),
})

export const memberRelations = relations(member, ({ one, many }) => ({
  organization: one(organization, {
    fields: [member.organizationId],
    references: [organization.id],
  }),
  user: one(user, {
    fields: [member.userId],
    references: [user.id],
  }),
  jobs: many(membersJobs),
}))

export type Member = InferSelectModel<typeof member> & {
  organization: Organization
  user: User
  jobs: MembersJobs[]
}
export type CreateMember = typeof member.$inferInsert

export const MemberSchema = createSelectSchema(member)
export const CreateMemberSchema = createInsertSchema(member)
