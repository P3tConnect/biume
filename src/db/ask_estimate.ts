import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { askEstimateOptions } from "./askEstimateOptions";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { organization } from "./organization";

export const askEstimateStatus = pgEnum("askEstimateStatus", [
  "USER PENDING",
  "USER ACCEPTED",
  "REJECTED BY USER",
  "CANCELED BY USER",
  "USER PAYED",
  "COMPANY PENDING",
  "COMPANY ACCEPTED",
  "REJECTED BY COMPANY",
  "POSTPONED BY COMPANY",
  "CANCELED BY COMPANY",
]);

export const askEstimate = pgTable("ask_estimate", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  status: askEstimateStatus("status").default("USER PENDING"),
  beginAt: date("beginAt").notNull(),
  endAt: date("endAt").notNull(),
  creator: text("creator").notNull(),
  for: text("for").references(() => organization.id, { onDelete: "cascade" }),
  atHome: boolean("atHome").default(false),
  message: text("message"),
  new: boolean("new").default(false),
  //sessionType: sessionType("sessionType").default("oneToOne"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updateAt: timestamp("updatedAt", { mode: "date" }),
});

export const askEstimateRelations = relations(askEstimate, ({ one, many }) => ({
  askEstimateOptions: many(askEstimateOptions),
}));

export type AskEstimate = InferSelectModel<typeof askEstimate> & {
  askEstimateOptions: InferSelectModel<typeof askEstimateOptions>[];
};
export type CreateAskEstimate = typeof askEstimate.$inferInsert;
export const AskEstimateStatusEnum = z.enum(askEstimateStatus.enumValues);

export const CreateAskEstimateSchema = createInsertSchema(askEstimate);
