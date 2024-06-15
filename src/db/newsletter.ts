import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";
import { relations } from "drizzle-orm";
import { usersNewsletters } from "./usersNewsletter";

export const newsletter = pgTable("newsletter", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  redactor: text("redactor").references(() => company.id, {
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
  redactor: one(company, {
    fields: [newsletter.redactor],
    references: [company.id],
  }),
}));
