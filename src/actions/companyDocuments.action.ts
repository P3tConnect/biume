"use server";

import { z } from "zod";
import { ownerAction, db, authedAction, ActionError } from "../lib";
import { organizationDocuments } from "../db";
import { eq } from "drizzle-orm";
import { proDocumentsSchema } from "@/components/onboarding/types/onboarding-schemas";
import { auth } from "../lib/auth";
import { organization as organizationTable } from "../db";
import { progression as progressionTable } from "../db";
import { headers } from "next/headers";

export const createDocumentsStepAction = authedAction
  .schema(proDocumentsSchema)
  .action(async ({ parsedInput }) => {
    const organization = await auth.api.getFullOrganization({
      headers: await headers(),
    });

    if (!organization) return;
    const documents = parsedInput.documents;
    if (!documents || !organization.id) return;
    const documentsResult = await db
      .insert(organizationDocuments)
      .values(
        documents.map((file) => ({
          file: file ?? "",
          organizationId: organization.id,
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
        siret: parsedInput.siret,
        siren: parsedInput.siren,
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
  });
