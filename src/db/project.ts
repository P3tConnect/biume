import { boolean, date, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { projectsInvitees } from "./projectsInvitees";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { organization } from "./organization";

export const project = pgTable("project", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  title: text("title").notNull(),
  ownerId: text("ownerId").references(() => organization.id, {
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
  owner: one(organization, {
    fields: [project.ownerId],
    references: [organization.id],
  }),
  invitees: many(projectsInvitees),
}));

export type Project = InferSelectModel<typeof project> & {
  owner: InferSelectModel<typeof organization>;
};
export type CreateProject = typeof project.$inferInsert;

export const ProjectSchema = createSelectSchema(project);
export const CreateProjectSchema = createInsertSchema(project);
