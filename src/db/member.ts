import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { organization } from "./organization";
import { InferSelectModel, relations } from "drizzle-orm";
import { user } from "./user";

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
});

export const memberRelations = relations(member, ({ one }) => ({
  organization: one(organization, {
    fields: [member.organizationId],
    references: [organization.id],
  }),
  user: one(user, {
    fields: [member.userId],
    references: [user.id],
  }),
}));

export type Member = InferSelectModel<typeof member> & {
  organization: InferSelectModel<typeof organization>;
  user: InferSelectModel<typeof user>;
};
