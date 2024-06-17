import { relations } from "drizzle-orm";
import { pgTable, primaryKey, text } from "drizzle-orm/pg-core";
import { estimate } from "./estimate";
import { options } from "./options";

export const estimateOptions = pgTable(
    "estimate_options",
    {
        estimateId: text("estimateId").references(() => estimate.id, {
            onDelete: "cascade",
        }),
        optionId: text("optionId").references(() => options.id, {
            onDelete: "cascade",
        }),
    },
    (t) => ({
        pk: primaryKey({ columns: [t.estimateId, t.optionId] }),
    }),
);

export const estimateOptionsRelations = relations(
    estimateOptions,
    ({ one }) => ({
        estimate: one(estimate, {
            fields: [estimateOptions.estimateId],
            references: [estimate.id],
        }),
        option: one(options, {
            fields: [estimateOptions.optionId],
            references: [options.id],
        }),
    }),
);
