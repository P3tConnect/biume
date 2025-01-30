"use server";

import { z } from "zod";
import { ownerAction, db, safeConfig, ActionError } from "../lib";
import { stripe } from "../lib/stripe";
import { organization, PlanEnum } from "../db";
import { eq } from "drizzle-orm";
import { authedAction } from "../lib";
import { redirect } from "next/navigation";

export const createBalancePayout = ownerAction
  .schema(
    z.object({
      amount: z.number().optional(), // Montant optionnel, si non spécifié, tout le solde disponible sera transféré
      organizationId: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    try {
      // Récupérer l'organisation
      const org = await db
        .select()
        .from(organization)
        .where(eq(organization.id, parsedInput.organizationId))
        .execute();

      if (!org[0] || !org[0].stripeId) {
        throw new ActionError(
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      // Récupérer le solde disponible si aucun montant n'est spécifié
      if (!parsedInput.amount) {
        const balance = await stripe.balance.retrieve({
          stripeAccount: org[0].stripeId,
        });

        parsedInput.amount = balance.available.reduce(
          (sum, { amount }) => sum + amount,
          0,
        );
      }

      if (parsedInput.amount <= 0) {
        throw new ActionError("Le montant du virement doit être supérieur à 0");
      }

      // Créer le virement
      const payout = await stripe.payouts.create(
        {
          amount: parsedInput.amount,
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
  });

export const getStripeBalance = ownerAction
  .schema(
    z.object({
      organizationId: z.string(),
    }),
  )
  .action(async ({ parsedInput }) => {
    try {
      // Récupérer l'organisation
      const org = await db
        .select()
        .from(organization)
        .where(eq(organization.id, parsedInput.organizationId))
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
  });

export const createPaymentSession = authedAction
  .schema(
    z.object({
      organizationId: z.string(),
      amount: z.number(),
      description: z.string(),
      successUrl: z.string(),
      cancelUrl: z.string(),
      metadata: z.record(z.any()).optional(),
      customerEmail: z.string().email(),
    }),
  )
  .action(async ({ parsedInput, ctx }) => {
    try {
      // Récupérer l'organisation
      const org = await db
        .select()
        .from(organization)
        .where(eq(organization.id, parsedInput.organizationId))
        .execute();

      if (!org[0] || !org[0].stripeId) {
        throw new ActionError(
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      // Créer la session de paiement
      const session = await stripe.checkout.sessions.create(
        {
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: parsedInput.description,
                },
                unit_amount: parsedInput.amount, // Le montant doit être en centimes
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: parsedInput.successUrl,
          cancel_url: parsedInput.cancelUrl,
          customer_email: parsedInput.customerEmail,
          metadata: {
            ...parsedInput.metadata,
            userId: ctx.user.id, // L'utilisateur est toujours défini avec authedAction
          },
        },
        {
          stripeAccount: org[0].stripeId,
        },
      );

      return session;
    } catch (error) {
      throw new ActionError(
        "Erreur lors de la création de la session de paiement",
      );
    }
  });

export const updateOrganizationPlan = authedAction
  .schema(z.object({ organizationId: z.string(), plan: z.string() }))
  .action(async ({ parsedInput }) => {
    const org = await db.query.organization.findFirst({
      where: eq(organization.id, parsedInput.organizationId),
    });

    if (!org) {
      throw new ActionError("Organisation non trouvée");
    }

    const stripeCustomer = org.stripeId;

    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomer!,
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: parsedInput.plan,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/organization/${org.id}/subscription/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/organization/${org.id}/subscription/failure`,
    });

    if (!session.url) {
      throw new ActionError("Erreur lors de la création de la session");
    }

    redirect(session.url);
  });
