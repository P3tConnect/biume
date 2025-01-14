"use server";

import { z } from "zod";
import { ownerAction, db } from "../lib";
import { stripe } from "../lib/stripe";
import { ZSAError } from "zsa";
import { organization } from "../db";
import { eq } from "drizzle-orm";
import { authedAction } from "../lib";

export const createBalancePayout = ownerAction
  .input(
    z.object({
      amount: z.number().optional(), // Montant optionnel, si non spécifié, tout le solde disponible sera transféré
      organizationId: z.string(),
    }),
  )
  .handler(async ({ input, ctx }) => {
    try {
      // Récupérer l'organisation
      const org = await db
        .select()
        .from(organization)
        .where(eq(organization.id, input.organizationId))
        .execute();

      if (!org[0] || !org[0].stripeId) {
        throw new ZSAError(
          "NOT_FOUND",
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
        throw new ZSAError(
          "PRECONDITION_FAILED",
          "Le montant du virement doit être supérieur à 0",
        );
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
    } catch (error: any) {
      if (error instanceof ZSAError) throw error;

      throw new ZSAError(
        "ERROR",
        error?.message || "Erreur lors de la création du virement",
      );
    }
  });

export const getStripeBalance = ownerAction
  .input(
    z.object({
      organizationId: z.string(),
    }),
  )
  .handler(async ({ input, ctx }) => {
    try {
      // Récupérer l'organisation
      const org = await db
        .select()
        .from(organization)
        .where(eq(organization.id, input.organizationId))
        .execute();

      if (!org[0] || !org[0].stripeId) {
        throw new ZSAError(
          "NOT_FOUND",
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      // Récupérer le solde du compte
      const balance = await stripe.balance.retrieve({
        stripeAccount: org[0].stripeId,
      });

      return balance;
    } catch (error: any) {
      if (error instanceof ZSAError) throw error;

      throw new ZSAError(
        "ERROR",
        error?.message || "Erreur lors de la récupération du solde",
      );
    }
  });

export const createPaymentSession = authedAction
  .input(
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
  .handler(async ({ input, ctx }) => {
    try {
      // Récupérer l'organisation
      const org = await db
        .select()
        .from(organization)
        .where(eq(organization.id, input.organizationId))
        .execute();

      if (!org[0] || !org[0].stripeId) {
        throw new ZSAError(
          "NOT_FOUND",
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
            userId: ctx.user.id, // L'utilisateur est toujours défini avec authedAction
          },
        },
        {
          stripeAccount: org[0].stripeId,
        },
      );

      return session;
    } catch (error: any) {
      if (error instanceof ZSAError) throw error;

      throw new ZSAError(
        "ERROR",
        error?.message ||
          "Erreur lors de la création de la session de paiement",
      );
    }
  });
