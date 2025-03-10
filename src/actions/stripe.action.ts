"use server"

import {
  ActionError,
  createServerAction,
  db,
  getPlanName,
  requireAuth,
  requireFullOrganization,
  requireOwner,
} from "../lib"

import { BillingInfo } from "@/types/billing-info"
import { StripeInvoice } from "@/types/stripe-invoice"
import { eq } from "drizzle-orm"
import { organization } from "../db"
import { stripe } from "../lib/stripe"
import { z } from "zod"

export const createBalancePayout = createServerAction(
  z.object({
    amount: z.number().optional(), // Montant optionnel, si non spécifié, tout le solde disponible sera transféré
    organizationId: z.string(),
  }),
  async (input, ctx) => {
    try {
      // Récupérer l'organisation
      const org = await db.query.organization.findFirst({
        where: eq(organization.id, input.organizationId),
      })

      if (!org || !org.companyStripeId) {
        throw new ActionError("Organisation non trouvée ou compte Stripe non configuré")
      }

      // Récupérer le solde disponible si aucun montant n'est spécifié
      if (!input.amount) {
        const balance = await stripe.balance.retrieve({
          stripeAccount: org.companyStripeId,
        })

        input.amount = balance.available.reduce((sum, { amount }) => sum + amount, 0)
      }

      if (input.amount <= 0) {
        throw new ActionError("Le montant du virement doit être supérieur à 0")
      }

      // Créer le virement
      const payout = await stripe.payouts.create(
        {
          amount: input.amount,
          currency: "eur",
        },
        {
          stripeAccount: org.companyStripeId,
        }
      )

      return payout
    } catch (error) {
      throw new ActionError("Erreur lors de la création du virement")
    }
  }
)

export const getStripeBalance = createServerAction(
  z.object({
    organizationId: z.string(),
  }),
  async (input, ctx) => {
    try {
      // Récupérer l'organisation
      const org = await db.query.organization.findFirst({
        where: eq(organization.id, input.organizationId),
      })

      if (!org || !org.companyStripeId) {
        throw new ActionError("Organisation non trouvée ou compte Stripe non configuré")
      }

      // Récupérer le solde du compte
      const balance = await stripe.balance.retrieve({
        stripeAccount: org.companyStripeId,
      })

      return balance
    } catch (error) {
      throw new ActionError("Erreur lors de la récupération du solde")
    }
  }
)

export const updateOrganizationPlan = createServerAction(
  z.object({ organizationId: z.string(), plan: z.string() }),
  async (input, ctx) => {
    const org = await db.query.organization.findFirst({
      where: eq(organization.id, input.organizationId),
    })

    if (!org) {
      throw new ActionError("Organisation non trouvée")
    }

    if (!org.customerStripeId) {
      throw new ActionError("Compte Stripe non configuré")
    }

    const stripeCustomer = org.customerStripeId

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer ?? "",
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: input.plan,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/transactions/subscription/success?org=${org.id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/transactions/subscription/failure?org=${org.id}`,
    })

    if (!session.url) {
      throw new ActionError("Erreur lors de la création de la session")
    }

    return session.url
  },
  [requireAuth, requireOwner]
)

export const getBillingInfo = createServerAction(
  z.object({}),
  async (input, ctx) => {
    try {
      const org = await db.query.organization.findFirst({
        where: eq(organization.id, ctx.organization?.id ?? ""),
        columns: {
          customerStripeId: true,
        },
      })

      if (!org || !org.customerStripeId) {
        throw new ActionError("Organisation non trouvée ou compte Stripe non configuré")
      }

      const customer = await stripe.customers.retrieve(org.customerStripeId)
      const subscriptions = await stripe.subscriptions.list({
        customer: org.customerStripeId,
        limit: 1,
      })
      const paymentMethods = await stripe.paymentMethods.list({
        customer: org.customerStripeId,
        type: "card",
      })

      const currentSubscription = subscriptions.data[0]
      const defaultPaymentMethod = paymentMethods.data[0]

      const planName = await getPlanName(currentSubscription?.items.data[0].plan.product as string)

      return {
        currentPlan: planName,
        currentPrice: `${(currentSubscription?.items.data[0]?.price.unit_amount || 0) / 100}€`,
        paymentMethod: defaultPaymentMethod
          ? `${defaultPaymentMethod.card?.brand.toLocaleUpperCase()} se terminant par ${defaultPaymentMethod.card?.last4}`
          : "Aucun moyen de paiement",
        subscriptionStatus: currentSubscription?.status || "inactive",
      } as unknown as BillingInfo
    } catch (error) {
      console.error("Erreur lors de la récupération des informations de facturation:", error)
      throw new ActionError("Impossible de récupérer les informations de facturation")
    }
  },
  [requireAuth, requireOwner, requireFullOrganization]
)

export const createPaymentMethodUpdateSession = createServerAction(
  z.object({
    organizationId: z.string(),
  }),
  async (input, ctx) => {
    try {
      if (!ctx.fullOrganization?.customerStripeId) {
        throw new ActionError("Organisation non trouvée ou compte Stripe non configuré")
      }

      const session = await stripe.checkout.sessions.create({
        customer: ctx.fullOrganization.customerStripeId,
        payment_method_types: ["card"],
        mode: "setup",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/organization/${ctx.fullOrganization.id}/settings`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/organization/${ctx.fullOrganization.id}/settings`,
      })

      return session.url
    } catch (error) {
      console.error("Erreur lors de la création de la session:", error)
      throw new ActionError("Impossible de créer la session de mise à jour du moyen de paiement")
    }
  },
  [requireAuth, requireOwner, requireFullOrganization]
)

export const getInvoiceHistory = createServerAction(
  z.object({}),
  async (input, ctx) => {
    try {
      if (!ctx.fullOrganization?.customerStripeId) {
        throw new ActionError("Organisation non trouvée ou compte Stripe non configuré")
      }

      const invoices = await stripe.invoices.list({
        customer: ctx.fullOrganization.customerStripeId,
        limit: 12, // Derniers 12 mois
      })

      return invoices.data.map(invoice => ({
        id: invoice.id,
        amount: `${(invoice.amount_paid / 100).toFixed(2)}€`,
        date: new Date(invoice.created * 1000).toLocaleDateString("fr-FR"),
        status: invoice.status,
        pdfUrl: invoice.invoice_pdf,
        number: invoice.number,
      })) as unknown as StripeInvoice[]
    } catch (error) {
      console.error("Erreur lors de la récupération des factures:", error)
      throw new ActionError("Impossible de récupérer l'historique des factures")
    }
  },
  [requireAuth, requireOwner, requireFullOrganization]
)

export const getStripeConnectAccountInfo = createServerAction(
  z.object({}),
  async (input, ctx) => {
    try {
      if (!ctx.fullOrganization?.companyStripeId) {
        throw new ActionError("Organisation non trouvée ou compte Stripe Connect non configuré")
      }

      const account = await stripe.accounts.retrieve(ctx.fullOrganization.companyStripeId)

      return {
        id: account.id,
        chargesEnabled: account.charges_enabled,
        payoutsEnabled: account.payouts_enabled,
        detailsSubmitted: account.details_submitted,
        requirements: account.requirements,
        email: account.email,
        businessProfile: account.business_profile,
      }
    } catch (error) {
      console.error("Erreur lors de la récupération du compte Stripe:", error)
      throw new ActionError("Impossible de récupérer les informations du compte Stripe Connect")
    }
  },
  [requireAuth, requireOwner, requireFullOrganization]
)

export const createStripeConnectOnboardingLink = createServerAction(
  z.object({}),
  async (input, ctx) => {
    try {
      if (!ctx.fullOrganization?.companyStripeId) {
        throw new ActionError("Organisation non trouvée ou compte Stripe Connect non configuré")
      }

      const accountLink = await stripe.accountLinks.create({
        account: ctx.fullOrganization.companyStripeId,
        refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/organization/${ctx.fullOrganization.id}/settings`,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/organization/${ctx.fullOrganization.id}/settings`,
        type: "account_onboarding",
      })

      return accountLink.url
    } catch (error) {
      console.error("Erreur lors de la création du lien d'onboarding:", error)
      throw new ActionError("Impossible de créer le lien d'onboarding Stripe Connect")
    }
  },
  [requireAuth, requireOwner, requireFullOrganization]
)
