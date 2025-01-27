"use server";

import { z } from "zod";
import { ownerAction, db, authedAction } from "../lib";
import {
  organizationDocuments,
  CreateOrganizationDocumentsSchema,
} from "../db";
import { eq } from "drizzle-orm";
import { ZSAError } from "zsa";
import { proDocumentsSchema } from "@/components/onboarding/types/onboarding-schemas";
import { auth } from "../lib/auth";
import { organization as organizationTable } from "../db";
import { progression as progressionTable } from "../db";

export const createDocumentsStepAction = authedAction
  .input(proDocumentsSchema)
  .handler(async ({ input, request }) => {
    const organization = await auth.api.getFullOrganization({
      headers: request?.headers!,
    });

    if (!organization) return;
    const documents = input.documents;
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
      throw new ZSAError("ERROR", "Documents not created");
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
      throw new ZSAError("ERROR", "Organization not updated");
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
      throw new ZSAError("ERROR", "Progression not updated");
    }
  });
