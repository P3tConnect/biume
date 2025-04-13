import { InferSelectModel, relations } from "drizzle-orm";
import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { Dysfunction, dysfunction } from "./dysfunction";

export const dysfunctionType = pgTable("dysfunction_type", {
  id: text("id").$defaultFn(() => crypto.randomUUID()).primaryKey(),
  name: text("name").notNull().default(""),
  precision: boolean("precision").notNull().default(false),
  dysfunctionId: text("dysfunction_id").notNull().references(() => dysfunction.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at"),
});

export const dysfunctionTypeRelations = relations(dysfunctionType, ({ one }) => ({
  dysfunction: one(dysfunction, {
    fields: [dysfunctionType.dysfunctionId],
    references: [dysfunction.id],
  }),
}));

export const dysfunctionTypeInsertSchema = createInsertSchema(dysfunctionType);
export const dysfunctionTypeSelectSchema = createSelectSchema(dysfunctionType);

export type DysfunctionType = InferSelectModel<typeof dysfunctionType> & {
  dysfunction: Dysfunction;
};
export type DysfunctionTypeInsert = typeof dysfunctionType.$inferInsert;
