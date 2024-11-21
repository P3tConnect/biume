import { relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { pets } from "./pets";
import { usersJobs } from "./usersJobs";
import { proSession } from "./pro_session";
import { usersNewsletters } from "./usersNewsletter";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  twoFactorEnabled: boolean("twoFactorEnabled"),
  isPro: boolean("isPro").notNull(),
  onBoardingComplete: boolean("onBoardingComplete").notNull(),
  stripeId: text("stripeId"),
});

export const userRelations = relations(user, ({ one, many }) => ({
  pets: many(pets),
  jobs: many(usersJobs),
  sessions: many(proSession),
  newsletter: many(usersNewsletters),
}));
