import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";
import { relations } from "drizzle-orm";
import { askEstimateOptions } from "./askEstimateOptions";
import { invoiceOptions } from "./invoiceOptions";
import { estimateOptions } from "./estimateOptions";
import { sessionOptions } from "./sessionOptions";
import { createInsertSchema } from "drizzle-zod";

export const options = pgTable("options", {
    id: text("id")
        .primaryKey()
        .$defaultFn(() => crypto.randomUUID()),
    title: text("title").notNull(),
    description: text("description"),
    price: integer("price").notNull(),
    companyId: text("companyId").references(() => company.id, {
        onDelete: "cascade",
    }),
    createdAt: timestamp("createdAt", { mode: "date" })
        .default(new Date())
        .notNull(),
    updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const optionsRelations = relations(options, ({ one, many }) => ({
    askEstimateOptions: many(askEstimateOptions),
    invoiceOptions: many(invoiceOptions),
    estimateOptions: many(estimateOptions),
    sessions: many(sessionOptions),
    company: one(company, {
        fields: [options.companyId],
        references: [company.id],
    }),
}));

export type Option = typeof options.$inferSelect;
export type CreateOption = typeof options.$inferInsert;

export const CreateOptionSchema = createInsertSchema(options);
