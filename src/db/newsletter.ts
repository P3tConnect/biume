import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { usersNewsletters } from "./usersNewsletter";
import { createInsertSchema } from "drizzle-zod";
import { organization } from "./organization";

export const newsletter = pgTable("newsletter", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  redactor: text("redactor").references(() => organization.id, {
    onDelete: "cascade",
  }),
  images: text("images").array(),
  title: text("title"),
  content: text("content"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const newsletterRelations = relations(newsletter, ({ one, many }) => ({
  usersNewsletters: many(usersNewsletters),
  redactor: one(organization, {
    fields: [newsletter.redactor],
    references: [organization.id],
  }),
}));

export type Newsletter = InferSelectModel<typeof newsletter> & {
  redactor: InferSelectModel<typeof organization>;
};
export type CreateNewsletter = typeof newsletter.$inferInsert;

export const CreateNewsletterSchema = createInsertSchema(newsletter);
