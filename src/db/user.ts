import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { account } from "./account";
import { allergies } from "./allergies";
import { createInsertSchema } from "drizzle-zod";
import { deseases } from "./deseases";
import { intolerences } from "./intolerences";
import { invitation } from "./invitation";
import { member } from "./member";
import { notification } from "./notifications";
import { pets } from "./pets";
import { appointments } from "./appointments";
import { projectsInvitees } from "./projectsInvitees";
import { InferSelectModel, relations } from "drizzle-orm";
import { session } from "./session";
import { usersJobs } from "./usersJobs";
import { usersNewsletters } from "./usersNewsletter";

export const user = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull(),
  updatedAt: timestamp("updatedAt").notNull(),
  twoFactorEnabled: boolean("twoFactorEnabled"),
  isPro: boolean("isPro").notNull(),
  onBoardingComplete: boolean("onBoardingComplete").notNull().default(false),
  stripeId: text("stripeId"),
  address: text("address"),
  zipCode: text("zipCode"),
  city: text("city"),
  country: text("country"),
  lang: text("lang").default("fr"),
  phoneNumber: text("phoneNumber"),
  emailNotifications: boolean("emailNotifications").notNull().default(false),
  smsNotifications: boolean("smsNotifications").notNull().default(false),
});

export const userRelations = relations(user, ({ one, many }) => ({
  pets: many(pets),
  jobs: many(usersJobs),
  appointments: many(appointments),
  newsletter: many(usersNewsletters),
  allergies: many(allergies),
  deseases: many(deseases),
  intolerences: many(intolerences),
  sessions: many(session),
  accounts: many(account),
  memberships: many(member),
  notifications: many(notification),
  projects: many(projectsInvitees),
  invitations: many(invitation),
}));

export type User = InferSelectModel<typeof user> & {
  pets: InferSelectModel<typeof pets>[];
  jobs: InferSelectModel<typeof usersJobs>[];
  appointments: InferSelectModel<typeof appointments>[];
  newsletter: InferSelectModel<typeof usersNewsletters>[];
  allergies: InferSelectModel<typeof allergies>[];
  deseases: InferSelectModel<typeof deseases>[];
  intolerences: InferSelectModel<typeof intolerences>[];
  sessions: InferSelectModel<typeof session>[];
  accounts: InferSelectModel<typeof account>[];
  memberships: InferSelectModel<typeof member>[];
};

export const CreateUserSchema = createInsertSchema(user);
