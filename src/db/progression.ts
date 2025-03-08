import { InferSelectModel, relations } from "drizzle-orm"
import { boolean, pgTable, text } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"

import { Organization, organization } from "./organization"

export const progression = pgTable("progression", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  docs: boolean("docs").default(false),
  cancelPolicies: boolean("cancelPolicies").default(false),
  reminders: boolean("reminders").default(false),
  services: boolean("services").default(false),
})

export const progressionRelations = relations(progression, ({ one }) => ({
  organization: one(organization),
}))

export type Progression = InferSelectModel<typeof progression> & {
  organization: Organization
}
export type CreateProgression = typeof progression.$inferInsert

export const CreateProgressionSchema = createInsertSchema(progression)
