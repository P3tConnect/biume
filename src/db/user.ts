import { relations } from "drizzle-orm";
import {
  boolean,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { pets } from "./pets";
import { ratings } from "./ratings";
import { projectsInvitees } from "./projectsInvitees";
import { allergies } from "./allergies";
import { intolerences } from "./intolerences";
import { createInsertSchema } from "drizzle-zod";
import { usersJobs } from "./usersJobs";
import { deseases } from "./deseases";
import { address } from "./addresses";
import { bgJobs } from "./bgJobs";
import { transaction } from "./transactions";
import { authenticator } from "./authenticator";
import { notification } from "./notifications";
import { companyMembership } from "./company_membership";

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: text("name"),
  email: text("email").unique().notNull(),
  emailVerified: timestamp("emailVerified"),
  image: text("image"),
  phone: text("phone"),
  password: text("password"),
  stripeId: text("stripeId"),
  addressId: text("address").references(() => address.id, {
    onDelete: "cascade",
  }),
  isPro: boolean("isPro").default(false),
  isAdmin: boolean("isAdmin").default(false),
  locked: boolean("locked").default(false),
  lang: text("lang").default("fr"),
  createdAt: timestamp("createdAt").default(new Date()),
  updatedAt: timestamp("updateAt"),
});

export const userRelations = relations(user, ({ one, many }) => ({
  pets: many(pets),
  memberships: many(companyMembership),
  ratingsAuthor: many(ratings),
  projectInvitees: many(projectsInvitees),
  allergies: many(allergies),
  intolerences: many(intolerences),
  jobs: many(usersJobs),
  deseases: many(deseases),
  address: one(address, {
    fields: [user.addressId],
    references: [address.id],
  }),
  bgJobs: many(bgJobs),
  transactions: many(transaction),
  authenticators: many(authenticator),
  notifications: many(notification),
}));

export type User = typeof user.$inferSelect;
export type CreateUser = typeof user.$inferInsert;

export const CreateUserSchema = createInsertSchema(user);
