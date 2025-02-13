import { InferSelectModel, relations } from "drizzle-orm";
import {
  boolean,
  date,
  pgEnum,
  pgTable,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import { AskAppointmentOption, askAppointmentOptions } from "./askAppointmentOptions";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { organization } from "./organization";

export const askAppointmentStatus = pgEnum("askAppointmentStatus", [
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

export const askAppointment = pgTable("ask_appointment", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  status: askAppointmentStatus("status").default("USER PENDING"),
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

export const askAppointmentRelations = relations(askAppointment, ({ one, many }) => ({
  askAppointmentOptions: many(askAppointmentOptions),
}));

export type AskAppointment = InferSelectModel<typeof askAppointment> & {
  askAppointmentOptions: AskAppointmentOption[];
};
export type CreateAskAppointment = typeof askAppointment.$inferInsert;
export const AskAppointmentStatusEnum = z.enum(
  askAppointmentStatus.enumValues
);

export const CreateAskAppointmentSchema = createInsertSchema(askAppointment);
