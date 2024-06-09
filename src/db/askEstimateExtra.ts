import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { askEstimate } from "./askestimate";

export const askEstimateExtra = pgTable("ask_estimate_extra", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  price: integer("price").notNull(),
  estimateId: text("estimateId").references(() => askEstimate.id, {
    onDelete: "cascade",
  }),
});
