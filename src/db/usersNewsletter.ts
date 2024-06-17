import { pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./user";
import { newsletter } from "./newsletter";
import { relations } from "drizzle-orm";

export const usersNewsletters = pgTable("users_newsletters", {
    userId: text("userId").references(() => user.id, { onDelete: "cascade" }),
    newsletterId: text("newsletterId").references(() => newsletter.id, {
        onDelete: "cascade",
    }),
});

export const userNewslettersRelations = relations(
    usersNewsletters,
    ({ one }) => ({
        user: one(user, {
            fields: [usersNewsletters.userId],
            references: [user.id],
        }),
        newsletter: one(newsletter, {
            fields: [usersNewsletters.newsletterId],
            references: [newsletter.id],
        }),
    }),
);
