import { relations } from "drizzle-orm"
import { pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { createInsertSchema } from "drizzle-zod"
import { createSelectSchema } from "drizzle-zod"

import { Organization, organization } from "./organization"
import { User, user } from "./user"

export const clientNote = pgTable("client_note", {
  id: text("id").$defaultFn(() => crypto.randomUUID()),
  organizationId: text("organization_id").references(() => organization.id),
  clientId: text("client_id").references(() => user.id),
  note: text("note"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
})

export const clientNoteRelations = relations(clientNote, ({ one }) => ({
  client: one(user, {
    fields: [clientNote.clientId],
    references: [user.id],
  }),
  organization: one(organization, {
    fields: [clientNote.organizationId],
    references: [organization.id],
  }),
}))

export type ClientNote = typeof clientNote.$inferSelect & {
  client: User
  organization: Organization
}
export const CreateClientNote = typeof clientNote.$inferInsert

export const ClientNoteSelectSchema = createSelectSchema(clientNote)
export const ClientNoteInsertSchema = createInsertSchema(clientNote)
