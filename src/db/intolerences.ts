import { pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { createInsertSchema } from "drizzle-zod";

export const intolerences = pgTable("intolerences", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title"),
    description: text("description"),
    ownerId: text("ownerId").references(() => user.id, {
        onDelete: "cascade",
    }),
    createdAt: timestamp("createdAt", { mode: "date" })
        .default(new Date())
        .notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const intolerencesRelations = relations(intolerences, ({ one }) => ({
    owner: one(user),
}));

export type Intolerence = typeof intolerences.$inferSelect;
export type CreateIntolerence = typeof intolerences.$inferInsert;

export const CreateIntolerenceSchema = createInsertSchema(intolerences);
