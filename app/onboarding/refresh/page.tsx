"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, useActiveOrganization } from "@/src/lib/auth-client";
import { stripe } from "@/src/lib";
import { Loader2 } from "lucide-react";

export default function RefreshOnboardingPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data: activeOrg } = useActiveOrganization();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const refreshOnboarding = async () => {
      try {
        if (!session?.user?.id) {
          router.push("/login");
          return;
        }

        if (!activeOrg || !activeOrg.companyStripeId) {
          setError(
            "Aucune organisation active trouvée ou compte Stripe non configuré",
          );
          setIsLoading(false);
          return;
        }

        // Créer un nouveau lien d'onboarding
        const accountLink = await stripe.accountLinks.create({
          account: activeOrg.companyStripeId,
          refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboarding/refresh`,
          return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
          type: "account_onboarding",
        });

        // Rediriger vers le nouveau lien d'onboarding
        if (accountLink && accountLink.url) {
          window.location.href = accountLink.url;
        } else {
          setError("Impossible de créer un lien d'onboarding");
          setIsLoading(false);
        }
      } catch (error) {
        console.error(
          "Erreur lors du rafraîchissement de l'onboarding:",
          error,
        );
        // Afficher plus de détails sur l'erreur
        if (error instanceof Error) {
          console.error("Message d'erreur:", error.message);
          console.error("Stack trace:", error.stack);
          setError(`Erreur: ${error.message}`);
        } else {
          setError(
            "Une erreur est survenue lors du rafraîchissement de l'onboarding",
          );
        }
        setIsLoading(false);
      }
    };

    refreshOnboarding();
  }, [session, router, activeOrg]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-4 text-lg">Redirection vers Stripe en cours...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-red-500">Erreur</h1>
        <p className="mt-2 text-lg">{error}</p>
        <button
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          onClick={() => router.push("/dashboard")}
        >
          Retour au tableau de bord
        </button>
      </div>
    );
  }

  return null;
}
