import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const session = pgTable("sessions", {
  id: text("id").primaryKey(),
	expiresAt: timestamp('expiresAt').notNull(),
  token: text('token').notNull().unique(),
  createdAt: timestamp('createdAt').notNull(),
  updatedAt: timestamp('updatedAt').notNull(),
  ipAddress: text('ipAddress'),
  userAgent: text('userAgent'),
  userId: text('userId').notNull().references(()=> user.id),
  activeOrganizationId: text('activeOrganizationId')
});

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));
