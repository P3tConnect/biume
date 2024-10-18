import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { project } from "./project";
import { createInsertSchema } from "drizzle-zod";

export const projectsInvitees = pgTable("projects_invitees", {
  userId: text("userId").primaryKey().notNull(),
  projectId: text("projectId").references(() => project.id, {
    onDelete: "cascade",
  }),
});

export const projectInviteesRelations = relations(
  projectsInvitees,
  ({ one }) => ({
    project: one(project, {
      fields: [projectsInvitees.projectId],
      references: [project.id],
    }),
  }),
);

export type ProjectInvitee = typeof projectsInvitees.$inferSelect;
export type CreateProjectInvitee = typeof projectsInvitees.$inferInsert;

export const CreateProjectInviteeSchema = createInsertSchema(projectsInvitees);
