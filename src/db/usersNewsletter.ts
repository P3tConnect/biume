import { pgTable, text } from "drizzle-orm/pg-core";
import { newsletter } from "./newsletter";
import { InferSelectModel, relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { user } from "./user";

export const usersNewsletters = pgTable("users_newsletters", {
  userId: text("userId").references(() => user.id, {
    onDelete: "cascade",
  }),
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
    user: one(user, {
      fields: [usersNewsletters.userId],
      references: [user.id],
    }),
  }),
);

export type UserNewsletter = InferSelectModel<typeof usersNewsletters> & {
  newsletter: InferSelectModel<typeof newsletter>;
  user: InferSelectModel<typeof user>;
};
export type CreateUserNewsletter = typeof usersNewsletters.$inferInsert;

export const CreateUserNewsletterSchema = createInsertSchema(usersNewsletters);
