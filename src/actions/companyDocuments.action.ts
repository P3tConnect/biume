"use server"

import { eq } from "drizzle-orm"
import { z } from "zod"

import { proDocumentsSchema } from "@/components/onboarding/types/onboarding-schemas"

import { organization, OrganizationDocuments, organizationDocuments } from "../db"
import { organization as organizationTable } from "../db"
import { progression as progressionTable } from "../db"
import { ActionError, createServerAction, db, requireAuth, requireOwner } from "../lib"

export const createDocumentsStepAction = createServerAction(
  proDocumentsSchema,
  async (input, ctx) => {
    if (!ctx.organization) return
    const documents = input.documents
    if (!documents || !ctx.organization.id) return
    const documentsResult = await db
      .insert(organizationDocuments)
      .values(
        documents.map(file => ({
          file: file.url ?? "",
          name: file.name ?? "",
          organizationId: ctx.organization?.id ?? "",
        }))
      )
      .returning()
      .execute()

    if (!documentsResult) {
      throw new ActionError("Documents not created")
    }

    const organizationResult = await db
      .update(organizationTable)
      .set({
        siret: input.siret,
        siren: input.siren,
      })
      .where(eq(organizationTable.id, organization.id))
      .returning()
      .execute()

    if (!organizationResult) {
      throw new ActionError("Organization not updated")
    }

    const [org] = await db.select().from(organizationTable).where(eq(organizationTable.id, organization.id)).execute()

    const progressionResult = await db
      .update(progressionTable)
      .set({
        docs: true,
      })
      .where(eq(progressionTable.id, org.progressionId as string))
      .returning()
      .execute()

    if (!progressionResult) {
      throw new ActionError("Progression not updated")
    }

    return {
      organization: organizationResult,
      progression: progressionResult,
    }
  },
  [requireAuth, requireOwner]
)

export const getCompanyDocuments = createServerAction(
  z.object({}),
  async (input, ctx) => {
    const documents = await db.query.organizationDocuments.findMany({
      where: eq(organizationDocuments.organizationId, ctx.organization?.id || ""),
      columns: {
        id: true,
        file: true,
        name: true,
        valid: true,
      },
    })

    if (!documents) {
      throw new ActionError("Documents not found")
    }

    return documents as unknown as OrganizationDocuments[]
  },
  [requireAuth, requireOwner]
)

export const createCompanyDocument = createServerAction(
  z.object({
    file: z.string(),
  }),
  async (input, ctx) => {
    const document = await db
      .insert(organizationDocuments)
      .values({
        file: input.file,
        organizationId: ctx.organization?.id ?? "",
      })
      .returning()
      .execute()

    if (!document) {
      throw new ActionError("Document not created")
    }

    return document
  },
  [requireAuth, requireOwner]
)
export const updateCompanyDocuments = createServerAction(
  proDocumentsSchema,
  async (input, ctx) => {
    if (!ctx.organization) {
      throw new ActionError("Organization not found")
    }

    const documents = input.documents
    if (!documents) {
      throw new ActionError("Documents are required")
    }

    // Insérer les nouveaux documents
    const documentsResult = await db
      .insert(organizationDocuments)
      .values(
        documents.map(file => ({
          file: file.url ?? "",
          name: file.name ?? "",
          organizationId: ctx.organization?.id ?? "",
          valid: true,
        }))
      )
      .returning()
      .execute()

    if (!documentsResult) {
      throw new ActionError("Documents not created")
    }

    return documentsResult
  },
  [requireAuth, requireOwner]
)

export const deleteCompanyDocument = createServerAction(
  z.object({
    id: z.string(),
  }),
  async (input, ctx) => {
    const document = await db.delete(organizationDocuments).where(eq(organizationDocuments.id, input.id)).execute()

    if (!document) {
      throw new ActionError("Document not deleted")
    }

    return document
  },
  [requireAuth, requireOwner]
)
