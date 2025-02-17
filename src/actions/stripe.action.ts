"use server";

import { z } from "zod";
import {
  db,
  ActionError,
  createServerAction,
  requireOwner,
  requireAuth,
  getPlanName,
  requireFullOrganization,
} from "../lib";
import { stripe } from "../lib/stripe";
import { organization } from "../db";
import { eq } from "drizzle-orm";

export const createBalancePayout = createServerAction(
  z.object({
    amount: z.number().optional(), // Montant optionnel, si non spécifié, tout le solde disponible sera transféré
    organizationId: z.string(),
  }),
  async (input, ctx) => {
    try {
      // Récupérer l'organisation
      const org = await db
        .select()
        .from(organization)
        .where(eq(organization.id, input.organizationId))
        .execute();

      if (!org[0] || !org[0].stripeId) {
        throw new ActionError(
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      // Récupérer le solde disponible si aucun montant n'est spécifié
      if (!input.amount) {
        const balance = await stripe.balance.retrieve({
          stripeAccount: org[0].stripeId,
        });

        input.amount = balance.available.reduce(
          (sum, { amount }) => sum + amount,
          0,
        );
      }

      if (input.amount <= 0) {
        throw new ActionError("Le montant du virement doit être supérieur à 0");
      }

      // Créer le virement
      const payout = await stripe.payouts.create(
        {
          amount: input.amount,
          currency: "eur",
        },
        {
          stripeAccount: org[0].stripeId,
        },
      );

      return payout;
    } catch (error) {
      throw new ActionError("Erreur lors de la création du virement");
    }
  },
);

export const getStripeBalance = createServerAction(
  z.object({
    organizationId: z.string(),
  }),
  async (input, ctx) => {
    try {
      // Récupérer l'organisation
      const org = await db
        .select()
        .from(organization)
        .where(eq(organization.id, input.organizationId))
        .execute();

      if (!org[0] || !org[0].stripeId) {
        throw new ActionError(
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      // Récupérer le solde du compte
      const balance = await stripe.balance.retrieve({
        stripeAccount: org[0].stripeId,
      });

      return balance;
    } catch (error) {
      throw new ActionError("Erreur lors de la récupération du solde");
    }
  },
);

export const createPaymentSession = createServerAction(
  z.object({
    organizationId: z.string(),
    amount: z.number(),
    description: z.string(),
    successUrl: z.string(),
    cancelUrl: z.string(),
    metadata: z.record(z.any()).optional(),
    customerEmail: z.string().email(),
  }),
  async (input, ctx) => {
    try {
      // Récupérer l'organisation
      const org = await db
        .select()
        .from(organization)
        .where(eq(organization.id, input.organizationId))
        .execute();

      if (!org[0] || !org[0].stripeId) {
        throw new ActionError(
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      // Créer la session de paiement
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "eur",
              product_data: {
                name: input.description,
              },
              unit_amount: input.amount, // Le montant doit être en centimes
            },
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
        customer_email: input.customerEmail,
        metadata: {
          ...input.metadata,
          userId: ctx.user?.id ?? null, // L'utilisateur est toujours défini avec authedAction
        },
      });

      return session;
    } catch (error) {
      throw new ActionError(
        "Erreur lors de la création de la session de paiement",
      );
    }
  },
);

export const updateOrganizationPlan = createServerAction(
  z.object({ organizationId: z.string(), plan: z.string() }),
  async (input, ctx) => {
    const org = await db.query.organization.findFirst({
      where: eq(organization.id, input.organizationId),
    });

    if (!org) {
      throw new ActionError("Organisation non trouvée");
    }

    if (!org.stripeId) {
      throw new ActionError("Compte Stripe non configuré");
    }

    const stripeCustomer = org.stripeId;

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
    });

    if (!session.url) {
      throw new ActionError("Erreur lors de la création de la session");
    }

    return session.url;
  },
  [requireAuth, requireOwner],
);

export const getBillingInfo = createServerAction(
  z.object({
    organizationId: z.string(),
  }),
  async (input, ctx) => {
    try {
      const org = await db
        .select()
        .from(organization)
        .where(eq(organization.id, input.organizationId))
        .execute();

      if (!org[0] || !org[0].stripeId) {
        throw new ActionError(
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      const customer = await stripe.customers.retrieve(org[0].stripeId);
      const subscriptions = await stripe.subscriptions.list({
        customer: org[0].stripeId,
        limit: 1,
      });
      const paymentMethods = await stripe.paymentMethods.list({
        customer: org[0].stripeId,
        type: "card",
      });

      const currentSubscription = subscriptions.data[0];
      const defaultPaymentMethod = paymentMethods.data[0];

      return {
        currentPlan: await getPlanName(
          currentSubscription?.items.data[0].plan.product as string,
        ),
        currentPrice: `${(currentSubscription?.items.data[0]?.price.unit_amount || 0) / 100}€`,
        paymentMethod: defaultPaymentMethod
          ? `${defaultPaymentMethod.card?.brand.toLocaleUpperCase()} se terminant par ${defaultPaymentMethod.card?.last4}`
          : "Aucun moyen de paiement",
        subscriptionStatus: currentSubscription?.status || "inactive",
      };
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des informations de facturation:",
        error,
      );
      throw new ActionError(
        "Impossible de récupérer les informations de facturation",
      );
    }
  },
);

export const createPaymentMethodUpdateSession = createServerAction(
  z.object({
    organizationId: z.string(),
  }),
  async (input, ctx) => {
    try {
      if (!ctx.fullOrganization?.stripeId) {
        throw new ActionError(
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      const session = await stripe.checkout.sessions.create({
        customer: ctx.fullOrganization.stripeId,
        payment_method_types: ["card"],
        mode: "setup",
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/organization/${ctx.fullOrganization.id}/settings`,
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/organization/${ctx.fullOrganization.id}/settings`,
      });

      return session.url;
    } catch (error) {
      console.error("Erreur lors de la création de la session:", error);
      throw new ActionError(
        "Impossible de créer la session de mise à jour du moyen de paiement",
      );
    }
  },
  [requireAuth, requireOwner, requireFullOrganization],
);

export const getInvoiceHistory = createServerAction(
  z.object({
    organizationId: z.string(),
  }),
  async (input, ctx) => {
    try {
      if (!ctx.fullOrganization?.stripeId) {
        throw new ActionError(
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      const invoices = await stripe.invoices.list({
        customer: ctx.fullOrganization.stripeId,
        limit: 12, // Derniers 12 mois
      });

      return invoices.data.map((invoice) => ({
        id: invoice.id,
        amount: `${(invoice.amount_paid / 100).toFixed(2)}€`,
        date: new Date(invoice.created * 1000).toLocaleDateString("fr-FR"),
        status: invoice.status,
        pdfUrl: invoice.invoice_pdf,
        number: invoice.number,
      }));
    } catch (error) {
      console.error("Erreur lors de la récupération des factures:", error);
      throw new ActionError(
        "Impossible de récupérer l'historique des factures",
      );
    }
  },
  [requireAuth, requireOwner, requireFullOrganization],
);
