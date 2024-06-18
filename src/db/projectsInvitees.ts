import { relations } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { project } from "./project";
import { user } from "./user";
import { createInsertSchema } from "drizzle-zod";

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

export type ProjectInvitee = typeof projectsInvitees.$inferSelect;
export type CreateProjectInvitee = typeof projectsInvitees.$inferInsert;

export const CreateProjectInvitee = createInsertSchema(projectsInvitees);
