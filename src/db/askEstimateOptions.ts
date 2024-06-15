import { pgTable, text } from "drizzle-orm/pg-core";
import { options } from "./options";
import { askEstimate } from "./ask_estimate";
import { relations } from "drizzle-orm";

export const askEstimateOptions = pgTable("ask_estimate_options", {
  askEstimateId: text("askEstimateId").references(() => askEstimate.id, {
    onDelete: "cascade",
  }),
  optionId: text("optionId").references(() => options.id, {
    onDelete: "cascade",
  }),
});

export const askEstimateOptionsRelations = relations(
  askEstimateOptions,
  ({ one }) => ({
    askEstimate: one(askEstimate, {
      fields: [askEstimateOptions.askEstimateId],
      references: [askEstimate.id],
    }),
    option: one(options, {
      fields: [askEstimateOptions.optionId],
      references: [options.id],
    }),
  }),
);
