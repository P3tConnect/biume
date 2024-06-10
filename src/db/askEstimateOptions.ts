import { pgTable, text } from "drizzle-orm/pg-core";
import { askEstimate } from "./askEstimate";
import { options } from "./options";

export const askEstimateOptions = pgTable("ask_estimate_options", {
  askEstimateId: text("askEstimateId").references(() => askEstimate.id, {
    onDelete: "cascade",
  }),
  optionId: text("optionId").references(() => options.id, {
    onDelete: "cascade",
  }),
});
