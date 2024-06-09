import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { pro_session } from "./pro_session";

export const invoice = pgTable("invoice", {
  id: serial("id").primaryKey(),
  sessionId: text("sessionId").references(() => pro_session.id, {
    onDelete: "cascade",
  }),
});
