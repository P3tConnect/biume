import { pgTable, text } from "drizzle-orm/pg-core";
import { proSession } from "./pro_session";
import { options } from "./options";
import { relations } from "drizzle-orm";

export const sessionOptions = pgTable("session_options", {
  sessionId: text("sessionId").references(() => proSession.id, {
    onDelete: "cascade",
  }),
  optionId: text("optionId").references(() => options.id, {
    onDelete: "cascade",
  }),
});

export const sessionOptionsRelations = relations(sessionOptions, ({ one }) => ({
  session: one(proSession, {
    fields: [sessionOptions.sessionId],
    references: [proSession.id],
  }),
  option: one(options, {
    fields: [sessionOptions.optionId],
    references: [options.id],
  }),
}));
