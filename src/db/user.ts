import { relations } from "drizzle-orm";
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { pets } from "./pets";
import { employeeCompany } from "./employeeCompany";
import { ratings } from "./ratings";
import { projectsInvitees } from "./projectsInvitees";
import { allergies } from "./allergies";
import { intolerences } from "./intolerences";
import { createInsertSchema } from "drizzle-zod";

export const role = pgEnum("role", [
  "CLIENT",
  "COMMUNICATION",
  "VETERINARY",
  "OSTEOPATH",
  "NATUROPATH",
  "EDUCATOR",
  "COMPORTEMENTALIST",
  "GROOMER",
  "MASSAGER",
]);

export type Role = typeof role;

export const plan = pgEnum("plan", ["BASIC", "PREMIUM", "ULTIMATE", "NONE"]);

export type Plan = typeof plan;

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified"),
  image: text("image"),
  phone: text("phone"),
  stripeId: text("stripeId"),
  address: text("address").notNull(),
  plan: plan("plan").default("NONE"),
  role: role("role").default("CLIENT"),
  isPro: boolean("isPro").default(false),
});

export const userRelations = relations(user, ({ many }) => ({
  pets: many(pets),
  employeeOf: many(employeeCompany),
  ratingsAuthor: many(ratings),
  projectInvitees: many(projectsInvitees),
  allergies: many(allergies),
  intolerences: many(intolerences),
}));

export type User = typeof user.$inferSelect;
export type CreateUser = typeof user.$inferInsert;

export const CreateUserSchema = createInsertSchema(user);
