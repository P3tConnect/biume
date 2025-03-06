"use client";

import { useState, useEffect } from "react";
import { useActiveOrganization } from "@/src/lib/auth-client";
import { stripe } from "@/src/lib";
import { Button } from "@/components/ui";
import { Loader2 } from "lucide-react";
import { db } from "@/src/lib";
import { organization } from "@/src/db";
import { eq } from "drizzle-orm";
import { toast } from "sonner";

export default function StripeSetupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: activeOrg } = useActiveOrganization();

  const setupStripeAccount = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!activeOrg) {
        setError("Aucune organisation active trouvée");
        setIsLoading(false);
        return;
      }

      // Créer un compte Stripe Connect standard si nécessaire
      if (!activeOrg.companyStripeId) {
        const stripeCompany = await stripe.accounts.create({
          type: "standard",
          country: "FR",
          email: activeOrg.email || "",
          metadata: {
            organizationId: activeOrg.id,
          },
        });

        // Mettre à jour l'organisation avec l'ID du compte Stripe
        await db
          .update(organization)
          .set({
            companyStripeId: stripeCompany.id,
          })
          .where(eq(organization.id, activeOrg.id))
          .execute();

        // Créer un lien d'onboarding
        const accountLink = await stripe.accountLinks.create({
          account: stripeCompany.id,
          refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/stripe-setup`,
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          type: "account_onboarding",
        });

        // Rediriger vers le lien d'onboarding
        if (accountLink && accountLink.url) {
          window.location.href = accountLink.url;
        } else {
          setError("Impossible de créer un lien d'onboarding");
          setIsLoading(false);
        }
      }
      // Si le compte Stripe Connect existe déjà, créer juste un nouveau lien d'onboarding
      else {
        const accountLink = await stripe.accountLinks.create({
          account: activeOrg.companyStripeId,
          refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/stripe-setup`,
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          type: "account_onboarding",
        });

        // Rediriger vers le lien d'onboarding
        if (accountLink && accountLink.url) {
          window.location.href = accountLink.url;
        } else {
          setError("Impossible de créer un lien d'onboarding");
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la configuration de Stripe:", error);
      if (error instanceof Error) {
        setError(`Erreur: ${error.message}`);
      } else {
        setError("Une erreur est survenue lors de la configuration de Stripe");
      }
      setIsLoading(false);
    }
  };

  // Créer un client Stripe si nécessaire
  const setupStripeCustomer = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!activeOrg) {
        setError("Aucune organisation active trouvée");
        setIsLoading(false);
        return;
      }

      // Créer un client Stripe si nécessaire
      if (!activeOrg.customerStripeId) {
        const stripeCustomer = await stripe.customers.create({
          email: activeOrg.email || "",
          name: activeOrg.name,
          metadata: {
            organizationId: activeOrg.id,
          },
        });

        // Mettre à jour l'organisation avec l'ID du client Stripe
        await db
          .update(organization)
          .set({
            customerStripeId: stripeCustomer.id,
          })
          .where(eq(organization.id, activeOrg.id))
          .execute();

        toast.success("Client Stripe créé avec succès");
      } else {
        toast.info("Un client Stripe existe déjà pour cette organisation");
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Erreur lors de la création du client Stripe:", error);
      if (error instanceof Error) {
        setError(`Erreur: ${error.message}`);
      } else {
        setError(
          "Une erreur est survenue lors de la création du client Stripe",
        );
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Configuration Stripe</h1>
      <p className="mb-4">
        Cette page vous permet de configurer ou reconfigurer votre compte Stripe
        si vous rencontrez des problèmes.
      </p>

      {activeOrg ? (
        <div className="space-y-6">
          <div className="p-6 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-semibold mb-2">
              Informations actuelles
            </h2>
            <p>Organisation: {activeOrg.name}</p>
            <p>
              Compte Stripe Connect:{" "}
              {activeOrg.companyStripeId || "Non configuré"}
            </p>
            <p>
              Client Stripe: {activeOrg.customerStripeId || "Non configuré"}
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={setupStripeAccount}
              disabled={isLoading}
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Configuration en cours...
                </>
              ) : (
                "Configurer le compte Stripe Connect"
              )}
            </Button>

            <Button
              onClick={setupStripeCustomer}
              disabled={isLoading}
              variant="outline"
              className="w-full md:w-auto"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Configuration en cours...
                </>
              ) : (
                "Configurer le client Stripe"
              )}
            </Button>
          </div>

          {error && (
            <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-md">
              {error}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="mt-4">Chargement des informations...</p>
        </div>
      )}
    </div>
  );
}
