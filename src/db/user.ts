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
import { InferSelectModel, relations } from "drizzle-orm";
import { session } from "./session";
import { Account } from "better-auth";
import { Address, address } from "./addresses";
import { ClientNote, clientNote } from "./clientNote";

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
  appointments: many(appointments),
  allergies: many(allergies),
  deseases: many(deseases),
  intolerences: many(intolerences),
  sessions: many(session),
  accounts: many(account),
  memberships: many(member),
  notifications: many(notification),
  invitations: many(invitation),
  addresses: many(address),
  clientNotes: many(clientNote),
}));

export type User = InferSelectModel<typeof user> & {
  pets: Pet[];
  allergies: Allergy[];
  deseases: Desease[];
  intolerences: Intolerence[];
  appointments: Appointment[];
  accounts: Account[];
  memberships: Member[];
  addresses: Address[];
  clientNotes: ClientNote[];
};

export const CreateUserSchema = createInsertSchema(user);
