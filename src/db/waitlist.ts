import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const waitlist = pgTable("waitlist", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  name: text("name").notNull(),
  firstName: text("firstname").notNull(),
  email: text("email").notNull().unique(),
  organizationName: text("organization_name"),
  isPro: boolean("is_pro").notNull().default(false),
  comment: text("comment"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type WaitList = typeof waitlist.$inferSelect;
export type NewWaitList = typeof waitlist.$inferInsert;

export const waitlistSelectSchema = createSelectSchema(waitlist);
export const waitlistInsertSchema = createInsertSchema(waitlist);
