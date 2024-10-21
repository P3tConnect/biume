import { pgTable, text } from "drizzle-orm/pg-core";
import { newsletter } from "./newsletter";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

export const usersNewsletters = pgTable("users_newsletters", {
  userId: text("userId").primaryKey().notNull(),
  newsletterId: text("newsletterId").references(() => newsletter.id, {
    onDelete: "cascade",
  }),
});

export const userNewslettersRelations = relations(
  usersNewsletters,
  ({ one }) => ({
    newsletter: one(newsletter, {
      fields: [usersNewsletters.newsletterId],
      references: [newsletter.id],
    }),
  }),
);

export type UserNewsletter = typeof usersNewsletters.$inferSelect;
export type CreateUserNewsletter = typeof usersNewsletters.$inferInsert;

export const CreateUserNewsletterSchema = createInsertSchema(usersNewsletters);
