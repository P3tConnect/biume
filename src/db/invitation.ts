import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organization } from "./organization";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const invitation = pgTable("invitations", {
  id: text("id").primaryKey(),
	organizationId: text('organizationId').notNull().references(()=> organization.id),
  email: text('email').notNull(),
  role: text('role'),
  status: text('status').notNull(),
  expiresAt: timestamp('expiresAt').notNull(),
  inviterId: text('inviterId').notNull().references(()=> user.id)
});

export const invitationRelations = relations(invitation, ({ one }) => ({
  organization: one(organization, {
    fields: [invitation.organizationId],
    references: [organization.id],
  }),
  inviter: one(user, {
    fields: [invitation.inviterId],
    references: [user.id],
  }),
}));
