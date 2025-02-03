"use server";

import {
  db,
  ActionError,
  createServerAction,
  requireAuth,
  requireOwner,
} from "../lib";
import { organization, organizationDocuments } from "../db";
import { eq } from "drizzle-orm";
import { proDocumentsSchema } from "@/components/onboarding/types/onboarding-schemas";
import { organization as organizationTable } from "../db";
import { progression as progressionTable } from "../db";
import { z } from "zod";

export const createDocumentsStepAction = createServerAction(
  proDocumentsSchema,
  async (input, ctx) => {
    if (!ctx.organization) return;
    const documents = input.documents;
    if (!documents || !ctx.organization.id) return;
    const documentsResult = await db
      .insert(organizationDocuments)
      .values(
        documents.map((file) => ({
          file: file ?? "",
          organizationId: ctx.organization?.id ?? "",
        })),
      )
      .returning()
      .execute();

    if (!documentsResult) {
      throw new ActionError("Documents not created");
    }

    const organizationResult = await db
      .update(organizationTable)
      .set({
        siret: input.siret,
        siren: input.siren,
      })
      .where(eq(organizationTable.id, organization.id))
      .returning()
      .execute();

    if (!organizationResult) {
      throw new ActionError("Organization not updated");
    }

    const [org] = await db
      .select()
      .from(organizationTable)
      .where(eq(organizationTable.id, organization.id))
      .execute();

    const progressionResult = await db
      .update(progressionTable)
      .set({
        docs: true,
      })
      .where(eq(progressionTable.id, org.progressionId as string))
      .returning()
      .execute();

    if (!progressionResult) {
      throw new ActionError("Progression not updated");
    }

    return {
      organization: organizationResult,
      progression: progressionResult,
    };
  },
  [requireAuth, requireOwner],
);

export const getCompanyDocuments = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const documents = await db
      .select()
      .from(organizationDocuments)
      .where(
        eq(organizationDocuments.organizationId, ctx.organization?.id || ""),
      );

    if (!documents) {
      throw new ActionError("Documents not found");
    }

    return documents;
  },
  [requireAuth, requireOwner],
);
