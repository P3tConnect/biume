"use server";

import { createServerAction, requireAuth, requireOwner } from "@/src/lib";
import { db } from "@/src/lib/db";
import { anatomicalIssue, AnatomicalIssueSchema, CreateAnatomicalIssueSchema } from "@/src/db/anatomicalIssue";
import { z } from "zod";
import { eq } from "drizzle-orm";

// Action pour récupérer tous les problèmes anatomiques
export const getAnatomicalIssuesAction = createServerAction(
  z.object({
    organizationId: z.string().optional(),
  }),
  async (input, ctx) => {
    const { organizationId } = input;

    try {
      if (organizationId) {
        const issues = await db.query.anatomicalIssue.findMany({
          where: eq(anatomicalIssue.organizationId, organizationId),
        });
        return issues;
      } else {
        const issues = await db.select().from(anatomicalIssue).execute();
        return issues;
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des problèmes anatomiques:", error);
      throw new Error("Une erreur s'est produite lors de la récupération des problèmes anatomiques");
    }
  },
  [requireAuth]
);

// Action pour créer un nouveau problème anatomique
export const createAnatomicalIssueAction = createServerAction(
  CreateAnatomicalIssueSchema,
  async (input, ctx) => {
    try {
      const [newIssue] = await db.insert(anatomicalIssue).values({
        ...input,
        organizationId: ctx.organization?.id,
      }).returning();
      
      return newIssue;
    } catch (error) {
      console.error("Erreur lors de la création du problème anatomique:", error);
      throw new Error("Une erreur s'est produite lors de la création du problème anatomique");
    }
  },
  [requireAuth, requireOwner]
);

// Action pour mettre à jour un problème anatomique
export const updateAnatomicalIssueAction = createServerAction(
  AnatomicalIssueSchema.extend({
    id: z.string(),
  }),
  async (input, ctx) => {
    const { id, ...data } = input;
    
    try {
      const [updatedIssue] = await db.update(anatomicalIssue)
        .set({
          ...data,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(anatomicalIssue.id, id))
        .returning();
      
      if (!updatedIssue) {
        throw new Error("Problème anatomique non trouvé");
      }
      
      return updatedIssue;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du problème anatomique:", error);
      throw new Error("Une erreur s'est produite lors de la mise à jour du problème anatomique");
    }
  },
  [requireAuth, requireOwner]
);

// Action pour supprimer un problème anatomique
export const deleteAnatomicalIssueAction = createServerAction(
  z.object({
    id: z.string(),
  }),
  async (input, ctx) => {
    const { id } = input;
    
    try {
      const [deletedIssue] = await db.delete(anatomicalIssue)
        .where(eq(anatomicalIssue.id, id))
        .returning();
      
      if (!deletedIssue) {
        throw new Error("Problème anatomique non trouvé");
      }
      
      return deletedIssue;
    } catch (error) {
      console.error("Erreur lors de la suppression du problème anatomique:", error);
      throw new Error("Une erreur s'est produite lors de la suppression du problème anatomique");
    }
  },
  [requireAuth, requireOwner]
); 