import { boolean, date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { company } from "./company";
import { relations } from "drizzle-orm";
import { projectsInvitees } from "./projectsInvitees";
import { createInsertSchema } from "drizzle-zod";

export const project = pgTable("project", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  ownerId: text("ownerId").references(() => company.id, {
    onDelete: "cascade",
  }),
  color: text("color"),
  location: text("location"),
  beginAt: date("beginAt").notNull(),
  endAt: date("endAt").notNull(),
  isImportant: boolean("isImportant").default(false),
  note: text("note"),
  link: text("link"),
  createdAt: timestamp("createdAt", { mode: "date" }).default(new Date()),
  updatedAt: timestamp("updatedAt", { mode: "date" }),
});

export const projectRelations = relations(project, ({ one, many }) => ({
  owner: one(company, {
    fields: [project.ownerId],
    references: [company.id],
  }),
  invitees: many(projectsInvitees),
}));

export type Project = typeof project.$inferSelect;
export type CreateProject = typeof project.$inferInsert;

export const CreateProjectSchema = createInsertSchema(project);
