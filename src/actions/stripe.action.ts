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
import { organization, transaction } from "../db";
import { eq } from "drizzle-orm";
import { BillingInfo } from "@/types/billing-info";
import { StripeInvoice } from "@/types/stripe-invoice";

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
      });

      if (!org || !org.companyStripeId) {
        throw new ActionError(
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      // Récupérer le solde disponible si aucun montant n'est spécifié
      if (!input.amount) {
        const balance = await stripe.balance.retrieve({
          stripeAccount: org.companyStripeId,
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
          stripeAccount: org.companyStripeId,
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
      const org = await db.query.organization.findFirst({
        where: eq(organization.id, input.organizationId),
      });

      if (!org || !org.companyStripeId) {
        throw new ActionError(
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      // Récupérer le solde du compte
      const balance = await stripe.balance.retrieve({
        stripeAccount: org.companyStripeId,
      });

      return balance;
    } catch (error) {
      throw new ActionError("Erreur lors de la récupération du solde");
    }
  },
);

export const createPaymentIntent = createServerAction(
  z.object({
    organizationId: z.string(),
    amount: z.number(),
    serviceId: z.string().optional(),
    appointmentId: z.string().optional(),
  }),
  async (input, ctx) => {
    try {
      // Vérifier que l'utilisateur est connecté
      if (!ctx.user) {
        throw new ActionError("Utilisateur non authentifié");
      }

      // Récupérer l'organisation du professionnel
      const org = await db.query.organization.findFirst({
        where: eq(organization.id, input.organizationId),
      });

      if (!org || !org.companyStripeId) {
        throw new ActionError(
          "Organisation du professionnel non trouvée ou compte Stripe non configuré",
        );
      }

      // Vérifier si le stripeId est un compte connecté (commence par acct_) ou un compte client (commence par cus_)
      const isConnectedAccount = org.companyStripeId.startsWith("acct_");

      // Calculer les frais de plateforme (5%)
      const applicationFeeAmount = Math.round(input.amount * 0.05);

      let session;

      if (isConnectedAccount) {
        // Créer une session de paiement avec transfert vers le professionnel
        session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: `Réservation de ${ctx.user.id} - ${ctx.user.name} à ${org.id} - ${org.name}`,
                },
                unit_amount: input.amount,
              },
              quantity: 1,
            },
          ],
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/transactions/success?org=${org.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/transactions/failure?org=${org.id}`,
          customer: ctx.user.stripeId || "",
          payment_intent_data: {
            application_fee_amount: applicationFeeAmount,
            transfer_data: {
              destination: org.companyStripeId,
            },
            metadata: {
              userId: ctx.user.id,
              organizationId: org.id,
              serviceId: input.serviceId || "",
              appointmentId: input.appointmentId || "",
            },
          },
        });
      } else {
        // Le professionnel n'a pas de compte connecté, utiliser une session standard
        // et gérer le transfert manuellement plus tard
        session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          mode: "payment",
          line_items: [
            {
              price_data: {
                currency: "eur",
                product_data: {
                  name: `Réservation de ${ctx.user.id} - ${ctx.user.name} à ${org.id} - ${org.name}`,
                },
                unit_amount: input.amount,
              },
              quantity: 1,
            },
          ],
          success_url: `${process.env.NEXT_PUBLIC_APP_URL}/transactions/success?org=${org.id}`,
          cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/transactions/failure?org=${org.id}`,
          customer: ctx.user.stripeId || "",
          metadata: {
            userId: ctx.user.id,
            organizationId: org.id,
            serviceId: input.serviceId || "",
            appointmentId: input.appointmentId || "",
            requiresManualTransfer: "true",
            applicationFeeAmount: applicationFeeAmount.toString(),
            destination: org.companyStripeId,
          },
        });
      }

      if (!session.url) {
        throw new ActionError("Impossible de créer l'URL de paiement");
      }

      // Enregistrer la transaction dans la base de données
      // Note: Nous utilisons le payment_intent qui sera créé par Checkout
      // mais nous ne le connaissons pas encore à ce stade
      await db.insert(transaction).values({
        intentId: session.id, // Utiliser l'ID de session comme référence
        amount: input.amount,
        from: ctx.user.id,
        to: org.id,
        status: "pending", // La transaction est en attente jusqu'au paiement
        createdAt: new Date(),
      });

      return session.url;
    } catch (error) {
      console.error("Erreur lors de la création du paiement:", error);
      throw new ActionError(
        "Erreur lors de la création du paiement pour le professionnel",
      );
    }
  },
  [requireAuth],
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

    if (!org.customerStripeId) {
      throw new ActionError("Compte Stripe non configuré");
    }

    const stripeCustomer = org.customerStripeId;

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
  z.object({}),
  async (input, ctx) => {
    try {
      const org = await db.query.organization.findFirst({
        where: eq(organization.id, ctx.organization?.id ?? ""),
        columns: {
          customerStripeId: true,
        },
      });

      if (!org || !org.customerStripeId) {
        throw new ActionError(
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      const customer = await stripe.customers.retrieve(org.customerStripeId);
      const subscriptions = await stripe.subscriptions.list({
        customer: org.customerStripeId,
        limit: 1,
      });
      const paymentMethods = await stripe.paymentMethods.list({
        customer: org.customerStripeId,
        type: "card",
      });

      const currentSubscription = subscriptions.data[0];
      const defaultPaymentMethod = paymentMethods.data[0];

      const planName = await getPlanName(
        currentSubscription?.items.data[0].plan.product as string,
      );

      return {
        currentPlan: planName,
        currentPrice: `${(currentSubscription?.items.data[0]?.price.unit_amount || 0) / 100}€`,
        paymentMethod: defaultPaymentMethod
          ? `${defaultPaymentMethod.card?.brand.toLocaleUpperCase()} se terminant par ${defaultPaymentMethod.card?.last4}`
          : "Aucun moyen de paiement",
        subscriptionStatus: currentSubscription?.status || "inactive",
      } as unknown as BillingInfo;
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
  [requireAuth, requireOwner, requireFullOrganization],
);

export const createPaymentMethodUpdateSession = createServerAction(
  z.object({
    organizationId: z.string(),
  }),
  async (input, ctx) => {
    try {
      if (!ctx.fullOrganization?.customerStripeId) {
        throw new ActionError(
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      const session = await stripe.checkout.sessions.create({
        customer: ctx.fullOrganization.customerStripeId,
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
  z.object({}),
  async (input, ctx) => {
    try {
      if (!ctx.fullOrganization?.customerStripeId) {
        throw new ActionError(
          "Organisation non trouvée ou compte Stripe non configuré",
        );
      }

      const invoices = await stripe.invoices.list({
        customer: ctx.fullOrganization.customerStripeId,
        limit: 12, // Derniers 12 mois
      });

      return invoices.data.map((invoice) => ({
        id: invoice.id,
        amount: `${(invoice.amount_paid / 100).toFixed(2)}€`,
        date: new Date(invoice.created * 1000).toLocaleDateString("fr-FR"),
        status: invoice.status,
        pdfUrl: invoice.invoice_pdf,
        number: invoice.number,
      })) as unknown as StripeInvoice[];
    } catch (error) {
      console.error("Erreur lors de la récupération des factures:", error);
      throw new ActionError(
        "Impossible de récupérer l'historique des factures",
      );
    }
  },
  [requireAuth, requireOwner, requireFullOrganization],
);

// KYB (Know Your Business) actions
export const createKYBVerification = createServerAction(
  z.object({
    organizationId: z.string(),
    businessName: z.string(),
    businessType: z.string(),
    businessNumber: z.string().optional(),
    country: z.string(),
    address: z.object({
      city: z.string(),
      line1: z.string(),
      line2: z.string().optional(),
      postalCode: z.string(),
      state: z.string().optional(),
    }),
    phone: z.string(),
    email: z.string().email(),
    website: z.string().url().optional(),
    owners: z.array(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string().email(),
        phone: z.string(),
        address: z.object({
          city: z.string(),
          line1: z.string(),
          line2: z.string().optional(),
          postalCode: z.string(),
          state: z.string().optional(),
          country: z.string(),
        }),
        dateOfBirth: z.object({
          day: z.number(),
          month: z.number(),
          year: z.number(),
        }),
        idNumber: z.string().optional(),
        title: z.string(),
        ownership_percentage: z.number(),
      }),
    ).optional(),
  }),
  async (input, ctx) => {
    try {
      // Récupérer l'organisation
      const org = await db.query.organization.findFirst({
        where: eq(organization.id, input.organizationId),
      });

      if (!org) {
        throw new ActionError("Organisation non trouvée");
      }

      // Créer ou mettre à jour le compte Connect si nécessaire
      if (!org.companyStripeId) {
        // Créer un compte Stripe Connect
        const account = await stripe.accounts.create({
          type: 'custom',
          country: input.country,
          email: input.email,
          business_type: input.businessType === 'individual' ? 'individual' : 'company',
          company: {
            name: input.businessName,
            phone: input.phone,
            tax_id: input.businessNumber || undefined,
            address: {
              city: input.address.city,
              line1: input.address.line1,
              line2: input.address.line2 || undefined,
              postal_code: input.address.postalCode,
              state: input.address.state || undefined,
              country: input.country,
            },
          },
          capabilities: {
            card_payments: { requested: true },
            transfers: { requested: true },
          },
          business_profile: {
            url: input.website || '',
            mcc: '8999', // Professional Services
          },
          tos_acceptance: {
            date: Math.floor(Date.now() / 1000),
            ip: '127.0.0.1', // Valeur par défaut
          },
        });

        // Mettre à jour l'ID Stripe dans l'organisation
        await db.update(organization).set({
          companyStripeId: account.id,
        }).where(eq(organization.id, input.organizationId));

        return {
          success: true,
          accountId: account.id,
          message: "Compte Stripe créé avec succès",
        };
      } else {
        // Mettre à jour le compte existant
        await stripe.accounts.update(org.companyStripeId, {
          email: input.email,
          company: {
            name: input.businessName,
            phone: input.phone,
            tax_id: input.businessNumber || undefined,
            address: {
              city: input.address.city,
              line1: input.address.line1,
              line2: input.address.line2 || undefined,
              postal_code: input.address.postalCode,
              state: input.address.state || undefined,
              country: input.country,
            },
          },
          business_profile: {
            url: input.website || '',
          },
        });

        return {
          success: true,
          accountId: org.companyStripeId,
          message: "Compte Stripe mis à jour avec succès",
        };
      }
    } catch (error: any) {
      console.error("Erreur KYB:", error);
      throw new ActionError(error.message || "Erreur lors de la vérification KYB");
    }
  }
);

export const addKYBPerson = createServerAction(
  z.object({
    organizationId: z.string(),
    person: z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      phone: z.string(),
      address: z.object({
        city: z.string(),
        line1: z.string(),
        line2: z.string().optional(),
        postalCode: z.string(),
        state: z.string().optional(),
        country: z.string(),
      }),
      dateOfBirth: z.object({
        day: z.number(),
        month: z.number(),
        year: z.number(),
      }),
      idNumber: z.string().optional(),
      title: z.string(),
      ownership_percentage: z.number(),
    }),
  }),
  async (input, ctx) => {
    try {
      // Récupérer l'organisation
      const org = await db.query.organization.findFirst({
        where: eq(organization.id, input.organizationId),
      });

      if (!org || !org.companyStripeId) {
        throw new ActionError("Organisation non trouvée ou compte Stripe non configuré");
      }

      // Créer une personne dans Stripe Connect
      const person = await stripe.accounts.createPerson(
        org.companyStripeId,
        {
          first_name: input.person.firstName,
          last_name: input.person.lastName,
          email: input.person.email,
          phone: input.person.phone,
          address: {
            city: input.person.address.city,
            line1: input.person.address.line1,
            line2: input.person.address.line2 || undefined,
            postal_code: input.person.address.postalCode,
            state: input.person.address.state || undefined,
            country: input.person.address.country,
          },
          dob: {
            day: input.person.dateOfBirth.day,
            month: input.person.dateOfBirth.month,
            year: input.person.dateOfBirth.year,
          },
          id_number: input.person.idNumber,
          relationship: {
            title: input.person.title,
            owner: input.person.ownership_percentage > 0,
            percent_ownership: input.person.ownership_percentage,
            representative: input.person.title === "Représentant légal",
          },
        }
      );

      return {
        success: true,
        personId: person.id,
        message: "Personne ajoutée avec succès",
      };
    } catch (error: any) {
      console.error("Erreur ajout personne KYB:", error);
      throw new ActionError(error.message || "Erreur lors de l'ajout de la personne");
    }
  }
);

export const getKYBStatus = createServerAction(
  z.object({
    organizationId: z.string(),
  }),
  async (input, ctx) => {
    try {
      // Récupérer l'organisation
      const org = await db.query.organization.findFirst({
        where: eq(organization.id, input.organizationId),
      });

      if (!org || !org.companyStripeId) {
        return {
          exists: false,
          status: "not_started",
          requirements: null,
          accountId: null,
        };
      }

      // Récupérer le statut du compte
      const account = await stripe.accounts.retrieve(org.companyStripeId);
      const requirements = account.requirements;

      // Récupérer les personnes associées
      const persons = await stripe.accounts.listPersons(org.companyStripeId);

      return {
        exists: true,
        status: account.charges_enabled ? "verified" : "pending",
        requirements,
        accountId: org.companyStripeId,
        persons: persons.data,
      };
    } catch (error) {
      console.error("Erreur récupération statut KYB:", error);
      throw new ActionError("Erreur lors de la récupération du statut KYB");
    }
  }
);

export const uploadKYBDocument = createServerAction(
  z.object({
    organizationId: z.string(),
    documentType: z.string(),
    file: z.any(),
    personId: z.string().optional(),
  }),
  async (input, ctx) => {
    try {
      // Récupérer l'organisation
      const org = await db.query.organization.findFirst({
        where: eq(organization.id, input.organizationId),
      });

      if (!org || !org.companyStripeId) {
        throw new ActionError("Organisation non trouvée ou compte Stripe non configuré");
      }

      // Convertir le fichier en Buffer
      const fileBuffer = Buffer.from(await input.file.arrayBuffer());

      // Créer un fichier dans Stripe
      const file = await stripe.files.create({
        purpose: 'identity_document',
        file: {
          data: fileBuffer,
          name: input.file.name,
          type: input.file.type,
        }
      }, {
        stripeAccount: org.companyStripeId,
      });

      // Associer le document selon son type
      if (input.personId) {
        // Document pour une personne
        await stripe.accounts.updatePerson(
          org.companyStripeId,
          input.personId,
          {
            verification: {
              document: {
                front: file.id,
              },
            },
          }
        );
      } else {
        // Document pour l'entreprise
        await stripe.accounts.update(
          org.companyStripeId,
          {
            documents: {
              company_license: {
                files: [file.id],
              },
            },
          }
        );
      }

      return {
        success: true,
        fileId: file.id,
        message: "Document téléchargé avec succès",
      };
    } catch (error: any) {
      console.error("Erreur upload document KYB:", error);
      throw new ActionError(error.message || "Erreur lors du téléchargement du document");
    }
  }
);

export const createKYBOnboardingLink = createServerAction(
  z.object({
    organizationId: z.string(),
    returnUrl: z.string().url(),
  }),
  async (input, ctx) => {
    try {
      // Récupérer l'organisation
      const org = await db.query.organization.findFirst({
        where: eq(organization.id, input.organizationId),
      });

      if (!org || !org.companyStripeId) {
        throw new ActionError("Organisation non trouvée ou compte Stripe non configuré");
      }

      // Créer un lien d'onboarding
      const accountLink = await stripe.accountLinks.create({
        account: org.companyStripeId,
        refresh_url: input.returnUrl,
        return_url: input.returnUrl,
        type: 'account_onboarding',
      });

      return {
        success: true,
        url: accountLink.url,
      };
    } catch (error) {
      console.error("Erreur création lien onboarding KYB:", error);
      throw new ActionError("Erreur lors de la création du lien d'onboarding");
    }
  }
);

export const createKYBDashboardLink = createServerAction(
  z.object({
    organizationId: z.string(),
  }),
  async (input, ctx) => {
    try {
      // Récupérer l'organisation
      const org = await db.query.organization.findFirst({
        where: eq(organization.id, input.organizationId),
      });

      if (!org || !org.companyStripeId) {
        throw new ActionError("Organisation non trouvée ou compte Stripe non configuré");
      }

      // Créer un lien vers le dashboard Stripe
      const loginLink = await stripe.accounts.createLoginLink(
        org.companyStripeId
      );

      return {
        success: true,
        url: loginLink.url,
      };
    } catch (error) {
      console.error("Erreur création lien dashboard KYB:", error);
      throw new ActionError("Erreur lors de la création du lien vers le dashboard");
    }
  }
);
