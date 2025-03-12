"use server"

import { z } from "zod"
import { ActionError, createServerAction, db, requireAuth } from "../lib"
import { petDocuments } from "../db"
import { eq } from "drizzle-orm"

export const getPetDocumentsByPetId = createServerAction(
  z.object({
    petId: z.string(),
  }),
  async ({ petId }, ctx) => {
    const documents = await db.query.petDocuments.findMany({
      where: eq(petDocuments.petId, petId),
      columns: {
        title: true,
        documentType: true,
        documentUrl: true,
        createdAt: true,
      },
      with: {
        pet: {
          columns: {
            name: true,
            image: true,
            type: true,
            breed: true,
          },
        },
      },
    })

    if (!documents) {
      throw new ActionError("Documents not found")
    }

    return documents
  },
  [requireAuth]
)
