import { InferSelectModel, relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { askEstimate } from "./ask_estimate";
import { options } from "./options";
import { createInsertSchema } from "drizzle-zod";

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

export type AskEstimateOption = InferSelectModel<typeof askEstimateOptions> & {
  askEstimate: InferSelectModel<typeof askEstimate>;
  option: InferSelectModel<typeof options>;
};
export type CreateAskEstimateOption = typeof askEstimateOptions.$inferInsert;

export const CreateAskEstimateOptionSchema =
  createInsertSchema(askEstimateOptions);
