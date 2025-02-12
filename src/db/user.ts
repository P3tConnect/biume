import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { account } from "./account";
import { allergies, Allergy } from "./allergies";
import { createInsertSchema } from "drizzle-zod";
import { Desease, deseases } from "./deseases";
import { Intolerence, intolerences } from "./intolerences";
import { invitation } from "./invitation";
import { Member, member } from "./member";
import { notification } from "./notifications";
import { Pet, pets } from "./pets";
import { Appointment, appointments } from "./appointments";
import { projectsInvitees } from "./projectsInvitees";
import { InferSelectModel, relations } from "drizzle-orm";
import { session } from "./session";
import { usersJobs, UsersJobs } from "./usersJobs";
import { usersNewsletters, UserNewsletter } from "./usersNewsletter";
import { Account } from "better-auth";
import { Address, address } from "./addresses";

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
  addresses: many(address),
}));

export type User = InferSelectModel<typeof user> & {
  pets: Pet[];
  jobs: UsersJobs[];
  newsletter: UserNewsletter[];
  allergies: Allergy[];
  deseases: Desease[];
  intolerences: Intolerence[];
  appointments: Appointment[];
  accounts: Account[];
  memberships: Member[];
  addresses: Address[];
};

export const CreateUserSchema = createInsertSchema(user);
