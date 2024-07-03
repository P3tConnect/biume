import { pgTable, text } from "drizzle-orm/pg-core";
import { proSession } from "./pro_session";
import { options } from "./options";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";

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

export type SessionOption = typeof sessionOptions.$inferSelect;
export type CreateSessionOption = typeof sessionOptions.$inferInsert;

export const CreateSessionOptionSchema = createInsertSchema(sessionOptions);
