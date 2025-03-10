"use server"

import { z } from "zod"
import { createServerAction, ActionError, requireAuth } from "../lib"
import { stripe } from "../lib/stripe"
import { db } from "../lib"
import { transaction, service, options, organization, appointments, SelectOrganizationSlotsSchema } from "../db"
import { eq, inArray } from "drizzle-orm"

// Schéma de validation pour la création d'un Payment Intent
const createBookingPaymentSchema = z.object({
  serviceId: z.string(),
  professionalId: z.string(),
  petId: z.string(),
  isHomeVisit: z.boolean().default(false),
  additionalInfo: z.string().optional(),
  selectedOptions: z.array(z.string()).optional(),
  amount: z.number(),
  companyId: z.string(),
  slot: SelectOrganizationSlotsSchema,
})

/**
 * Action serveur pour créer un Payment Intent Stripe pour une réservation
 * Note: Cette fonction n'est pas utilisée actuellement, l'application utilise createBookingCheckoutSession à la place
 */
export const createBookingPaymentIntent = createServerAction(
  createBookingPaymentSchema,
  async (input, ctx) => {
    try {
      // Utiliser directement le customerId fourni
      const stripeCustomerId = ctx.user?.stripeId || ""

      // Générer un Intent ID unique pour Stripe
      const stripeIntentId = `pi_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

      // Créer une transaction dans la base de données
      const newTransaction = await db
        .insert(transaction)
        .values({
          intentId: stripeIntentId,
          amount: input.amount,
          status: "PENDING",
          from: ctx.user?.id,
          to: input.companyId,
          createdAt: new Date(),
        })
        .returning()

      if (!newTransaction || newTransaction.length === 0) {
        throw new ActionError("Impossible de créer la transaction")
      }

      const transactionId = newTransaction[0].id

      // Formatage des options sélectionnées pour les métadonnées
      const selectedOptionsJson = input.selectedOptions ? JSON.stringify(input.selectedOptions) : "[]"

      // Obtenir le nom du service pour l'afficher dans la page de paiement
      const serviceResult = await db.query.service.findFirst({
        where: eq(service.id, input.serviceId),
      })

      if (!serviceResult) {
        throw new ActionError("Service non trouvé")
      }

      const org = await db.query.organization.findFirst({
        where: eq(organization.id, input.companyId),
        columns: {
          companyStripeId: true,
        },
      })

      if (!org?.companyStripeId) {
        throw new ActionError("Impossible de récupérer le compte Stripe de l'entreprise")
      }

      // Récupérer les informations du service pour obtenir sa durée
      const selectedService = await db.query.service.findFirst({
        where: eq(service.id, input.serviceId),
      })

      if (!selectedService) {
        throw new ActionError("Service non trouvé")
      }

      const [appointment] = await db
        .insert(appointments)
        .values({
          serviceId: input.serviceId,
          proId: input.companyId,
          patientId: input.petId,
          clientId: ctx.user?.id ?? "",
          status: "PENDING PAYMENT",
          atHome: input.isHomeVisit,
          type: "oneToOne",
          slotId: input.slot.id,
        })
        .returning({ id: appointments.id })
        .execute()

      if (!stripeCustomerId) {
        throw new ActionError("Impossible de récupérer le customerId de l'utilisateur")
      }

      // Calculer le montant total en centimes
      const amountInCents = Math.round(input.amount * 100);

      // Créer un Payment Intent avec Stripe
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency: "eur",
        customer: stripeCustomerId,
        payment_method_types: ["card"],
        description: `Rendez-vous chez ${serviceResult.name} le ${input.slot.start}`,
        metadata: {
          transactionId,
          appointmentId: appointment.id,
          slotId: input.slot.id,
          serviceId: input.serviceId,
          professionalId: input.professionalId,
          petId: input.petId,
          isHomeVisit: input.isHomeVisit.toString(),
          additionalInfo: input.additionalInfo || "",
          selectedOptions: selectedOptionsJson,
          companyId: input.companyId,
        },
        transfer_data: {
          destination: org?.companyStripeId || "",
        },
      });

      // Mettre à jour la transaction avec l'ID du Payment Intent
      await db.update(transaction).set({ intentId: paymentIntent.id }).where(eq(transaction.id, transactionId))

      // Retourner les informations nécessaires du Payment Intent
      return {
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
        transactionId,
      }
    } catch (error) {
      console.error("Erreur lors de la création du Payment Intent:", error)
      throw new ActionError(`Une erreur est survenue lors de la création du Payment Intent, ${error}`)
    }
  },
  [requireAuth] // requireAuth est nécessaire ici car l'utilisateur doit être authentifié
)

/**
 * Action serveur pour créer une session de paiement Stripe pour une réservation (méthode existante maintenue pour compatibilité)
 */
export const createBookingCheckoutSession = createServerAction(
  createBookingPaymentSchema,
  async (input, ctx) => {
    try {
      // Utiliser directement le customerId fourni
      const stripeCustomerId = ctx.user?.stripeId || ""

      // Générer un Intent ID unique pour Stripe
      const stripeIntentId = `cs_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`

      // Créer une transaction dans la base de données
      const newTransaction = await db
        .insert(transaction)
        .values({
          intentId: stripeIntentId,
          amount: input.amount,
          status: "PENDING",
          from: ctx.user?.id,
          to: input.companyId,
          createdAt: new Date(),
        })
        .returning()

      if (!newTransaction || newTransaction.length === 0) {
        throw new ActionError("Impossible de créer la transaction")
      }

      const transactionId = newTransaction[0].id

      // Formatage des options sélectionnées pour les métadonnées
      const selectedOptionsJson = input.selectedOptions ? JSON.stringify(input.selectedOptions) : "[]"

      // Obtenir le nom du service pour l'afficher dans la page de paiement
      const serviceResult = await db.query.service.findFirst({
        where: eq(service.id, input.serviceId),
      })

      if (!serviceResult) {
        throw new ActionError("Service non trouvé")
      }

      // Préparer les line items pour Stripe
      const lineItems = []

      // 1. Ajouter le service principal
      lineItems.push({
        price_data: {
          currency: "eur",
          product_data: {
            name: `Service: ${serviceResult.name}`,
            description: `Rendez-vous le ${input.slot.start} à ${input.slot.end}`,
          },
          unit_amount: (serviceResult.price || 0) * 100, // Conversion en centimes, avec fallback à 0 si null
        },
        quantity: 1,
      })

      // 2. Ajouter les options sélectionnées si présentes
      if (input.selectedOptions && input.selectedOptions.length > 0) {
        // Récupérer les détails des options sélectionnées
        const selectedOptionsDetails = await db.query.options.findMany({
          where: inArray(options.id, input.selectedOptions),
        })

        selectedOptionsDetails.map(option => {
          lineItems.push({
            price_data: {
              currency: "eur",
              product_data: {
                name: `Option: ${option.title}`,
                description: option.description || "Option supplémentaire",
              },
              unit_amount: (option.price || 0) * 100, // Conversion en centimes, avec fallback à 0 si null
            },
            quantity: 1,
          })
        })
      }

      // 3. Ajouter le supplément pour visite à domicile si sélectionné
      if (input.isHomeVisit) {
        lineItems.push({
          price_data: {
            currency: "eur",
            product_data: {
              name: "Visite à domicile",
              description: "Supplément pour déplacement à domicile",
            },
            unit_amount: 1000, // 10€ en centimes
          },
          quantity: 1,
        })
      }

      const org = await db.query.organization.findFirst({
        where: eq(organization.id, input.companyId),
        columns: {
          companyStripeId: true,
        },
      })

      if (!org?.companyStripeId) {
        throw new ActionError("Impossible de récupérer le compte Stripe de l'entreprise")
      }

      // Récupérer les informations du service pour obtenir sa durée
      const selectedService = await db.query.service.findFirst({
        where: eq(service.id, input.serviceId),
      })

      if (!selectedService) {
        throw new ActionError("Service non trouvé")
      }

      const [appointment] = await db
        .insert(appointments)
        .values({
          serviceId: input.serviceId,
          proId: input.companyId,
          patientId: input.petId,
          clientId: ctx.user?.id ?? "",
          status: "PENDING PAYMENT",
          atHome: input.isHomeVisit,
          type: "oneToOne",
          slotId: input.slot.id,
        })
        .returning({ id: appointments.id })
        .execute()

      if (!stripeCustomerId) {
        throw new ActionError("Impossible de récupérer le customerId de l'utilisateur")
      }

      // Créer la session Checkout avec Stripe
      const session = await stripe.checkout.sessions.create({
        customer: stripeCustomerId,
        line_items: lineItems,
        mode: "payment",
        payment_method_types: ["card"],
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/transactions/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/transactions/payment/failure?session_id={CHECKOUT_SESSION_ID}`,
        metadata: {
          transactionId,
          appointmentId: appointment.id,
          slotId: input.slot.id,
          serviceId: input.serviceId,
          professionalId: input.professionalId,
          petId: input.petId,
          isHomeVisit: input.isHomeVisit.toString(),
          additionalInfo: input.additionalInfo || "",
          selectedOptions: selectedOptionsJson,
          companyId: input.companyId,
        },
        payment_intent_data: {
          setup_future_usage: "off_session",
          transfer_data: {
            destination: org?.companyStripeId || "",
          },
        },
      })

      if (!session.url) {
        throw new ActionError("Erreur lors de la création de la session de paiement")
      }

      // Mettre à jour la transaction avec l'ID de session Stripe
      await db.update(transaction).set({ intentId: session.id }).where(eq(transaction.id, transactionId))

      // Retourner l'URL de la page de paiement Stripe
      return {
        sessionUrl: session.url,
        sessionId: session.id,
        transactionId,
      }
    } catch (error) {
      console.error("Erreur lors de la création de la session de paiement:", error)
      throw new ActionError(`Une erreur est survenue lors de la création de la session de paiement, ${error}`)
    }
  },
  [requireAuth] // requireAuth est optionnel ici car on peut permettre aux utilisateurs non connectés de payer
)
