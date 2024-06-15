import { pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./user";
import { project } from "./project";
import { relations } from "drizzle-orm";

export const projectsInvitees = pgTable("projects_invitees", {
  userId: text("userId").references(() => user.id, { onDelete: "cascade" }),
  projectId: text("projectId").references(() => project.id, {
    onDelete: "cascade",
  }),
});

export const projectInviteesRelations = relations(
  projectsInvitees,
  ({ one }) => ({
    user: one(user, {
      fields: [projectsInvitees.userId],
      references: [user.id],
    }),
    project: one(project, {
      fields: [projectsInvitees.projectId],
      references: [project.id],
    }),
  }),
);
