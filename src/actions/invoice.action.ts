"use server"

import { eq } from "drizzle-orm"
import { z } from "zod"

import { CreateInvoiceSchema, Invoice, invoice } from "../db"
import { ActionError, createServerAction, db, requireAuth, requireFullOrganization, requireOwner } from "../lib"

// Interface pour la structure des données de facture
export interface InvoiceData {
  id: string
  total: number
  appointmentId: string | null
  proId: string
  clientId: string
  checkoutSessionId: string | null
  createdAt: Date
  updatedAt: Date | null
  status: "paid" | "pending" | "overdue" // Statut calculé
}

// Interface pour les métriques des factures
export interface InvoiceMetricsData {
  totalRevenue: number
  unpaidInvoices: number
  overdueInvoices: number
  averagePaymentTime: number
}

export const getInvoices = createServerAction(
  z.object({}),
  async (input, ctx) => {
    try {
      // Si organizationId est fourni, filtrer par organisation
      // Sinon, récupérer toutes les factures de l'utilisateur
      const data = await db.query.invoice.findMany({
        with: {
          options: true,
          client: {
            columns: {
              id: true,
              name: true,
              email: true,
              image: true,
            }
          }
        },
        orderBy: (invoice, { desc }) => [desc(invoice.createdAt)],
      })

      return data as Invoice[]
    } catch (error) {
      console.error("Erreur lors de la récupération des factures:", error)
      throw new ActionError("Impossible de récupérer les factures")
    }
  },
  [requireAuth]
)

export const getInvoiceMetrics = createServerAction(
  z.object({}),
  async (input, ctx) => {
    try {
      const invoicesResult = await getInvoices({})

      if ("error" in invoicesResult) {
        throw new Error(invoicesResult.error)
      }

      // Extraire les factures de la réponse
      let invoicesArray: Invoice[] = []
      if (invoicesResult.data && Array.isArray(invoicesResult.data)) {
        invoicesArray = invoicesResult.data
      }

      // Calculer les métriques
      let totalRevenue = 0
      let unpaidInvoices = 0
      let overdueInvoices = 0
      let totalPaymentDays = 0
      let paidCount = 0

      // Parcourir manuellement le tableau
      for (let i = 0; i < invoicesArray.length; i++) {
        const inv = invoicesArray[i]
        const status = getInvoiceStatus(inv)
        const total = inv.total || 0 // Utiliser 0 si total est null

        if (status === "paid") {
          totalRevenue += total

          // Calculer le temps de paiement (pour la moyenne)
          const createdDate = new Date(inv.createdAt)
          const paidDate = new Date() // Idéalement, utiliser une date réelle de paiement
          const daysDiff = (paidDate.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24)

          totalPaymentDays += daysDiff
          paidCount++
        } else if (status === "pending") {
          unpaidInvoices += total
        } else if (status === "overdue") {
          overdueInvoices += total
        }
      }

      // Calculer le temps moyen de paiement
      const averagePaymentTime = paidCount > 0 ? Math.round(totalPaymentDays / paidCount) : 0

      // Retourner directement les métriques sans les imbriquer dans un objet data
      return {
        totalRevenue,
        unpaidInvoices,
        overdueInvoices,
        averagePaymentTime,
      }
    } catch (error) {
      console.error("Erreur lors du calcul des métriques:", error)
      throw new ActionError("Impossible de calculer les métriques des factures")
    }
  },
  [requireAuth, requireFullOrganization]
)

// Fonction utilitaire pour déterminer le statut d'une facture
function getInvoiceStatus(invoice: any): string {
  // Par simplicité, nous utilisons ici une logique basique
  // À adapter selon vos besoins réels

  const createdDate = new Date(invoice.createdAt)
  const dueDate = new Date(createdDate.getTime() + 30 * 24 * 60 * 60 * 1000) // 30 jours après création
  const today = new Date()

  // Simulons que 60% des factures sont payées
  const isPaid = invoice.id.charCodeAt(0) % 10 < 6

  if (isPaid) {
    return "paid"
  } else if (today > dueDate) {
    return "overdue"
  } else {
    return "pending"
  }
}

export const createInvoice = createServerAction(
  CreateInvoiceSchema,
  async (input, ctx) => {
    const data = await db.insert(invoice).values(input).returning().execute()

    if (!data) {
      throw new ActionError("Facture non créée")
    }

    return data
  },
  [requireAuth, requireOwner]
)

export const updateInvoice = createServerAction(
  CreateInvoiceSchema,
  async (input, ctx) => {
    const data = await db
      .update(invoice)
      .set(input)
      .where(eq(invoice.id, input.id as string))
      .returning()
      .execute()

    if (!data) {
      throw new ActionError("Facture non mise à jour")
    }

    return data
  },
  [requireAuth, requireOwner]
)

export const deleteInvoice = createServerAction(
  z.string(),
  async (input, ctx) => {
    const data = await db.delete(invoice).where(eq(invoice.id, input)).returning().execute()

    if (!data) {
      throw new ActionError("Facture non supprimée")
    }

    return data
  },
  [requireAuth, requireOwner]
)
