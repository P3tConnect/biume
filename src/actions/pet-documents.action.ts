"use server"

import { NewPetDocument, petDocuments } from "@/src/db/petDocuments"
import { db } from "@/src/lib"
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { eq } from "drizzle-orm"

const savePetDocumentSchema = z.object({
  petId: z.string(),
  title: z.string(),
  documentType: z.enum(["prescription", "report", "other"]),
  documentUrl: z.string(),
  description: z.string().optional(),
})

export type SavePetDocumentInput = z.infer<typeof savePetDocumentSchema>

export async function savePetDocument(data: SavePetDocumentInput) {
  try {
    // Valider les données
    const validatedData = savePetDocumentSchema.parse(data)

    // Créer un nouveau document
    const newDocument: NewPetDocument = {
      petId: validatedData.petId,
      title: validatedData.title,
      documentType: validatedData.documentType,
      documentUrl: validatedData.documentUrl,
      description: validatedData.description || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    // Insérer dans la base de données
    const [insertedDocument] = await db.insert(petDocuments).values(newDocument).returning()

    // Révalidation des pages concernées
    revalidatePath(`/dashboard/organization/[orgId]/pets/${validatedData.petId}`)

    return {
      data: insertedDocument,
      message: "Document enregistré avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du document:", error)
    return {
      error: "Erreur lors de l'enregistrement du document",
    }
  }
}

export async function getPetDocumentsByPetId(petId: string) {
  try {
    const documents = await db.query.petDocuments.findMany({
      where: eq(petDocuments.petId, petId),
      orderBy: (petDocuments, { desc }) => [desc(petDocuments.createdAt)],
    })

    return {
      data: documents,
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des documents:", error)
    return {
      error: "Erreur lors de la récupération des documents",
    }
  }
}

export async function deletePetDocument(documentId: string) {
  try {
    const [deletedDocument] = await db.delete(petDocuments).where(eq(petDocuments.id, documentId)).returning()

    if (!deletedDocument) {
      return {
        error: "Document introuvable",
      }
    }

    // Révalidation des pages concernées
    revalidatePath(`/dashboard/organization/[orgId]/pets/${deletedDocument.petId}`)

    return {
      data: deletedDocument,
      message: "Document supprimé avec succès",
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du document:", error)
    return {
      error: "Erreur lors de la suppression du document",
    }
  }
}
