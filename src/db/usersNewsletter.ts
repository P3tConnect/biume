import { pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./user";
import { newsletter } from "./newsletter";

export const usersNewsletters = pgTable("users_newsletters", {
  userId: text("userId").references(() => user.id, { onDelete: "cascade" }),
  newsletterId: text("newsletterId").references(() => newsletter.id, {
    onDelete: "cascade",
  }),
});
