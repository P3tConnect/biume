import { pgTable, text } from "drizzle-orm/pg-core";
import { estimate } from "./estimate";
import { options } from "./options";

export const estimateOptions = pgTable("estimate_options", {
  estimateId: text("estimateId").references(() => estimate.id, {
    onDelete: "cascade",
  }),
  optionId: text("optionId").references(() => options.id, {
    onDelete: "cascade",
  }),
});
