"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useState } from "react";
import {
  createStripeConnectOnboardingLink,
  getStripeConnectAccountInfo,
} from "@/src/actions/stripe.action";
import {
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  PlusCircle,
  RefreshCw,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  StripeOnboardingProcess,
  StripeOnboardingDialog,
} from "./stripe-onboarding/OnboardingProcess";

interface StripeConnectAccountInfo {
  id: string;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  requirements: {
    currently_due: string[];
    eventually_due: string[];
    past_due: string[];
    pending_verification: string[];
  };
  email: string;
  businessProfile: {
    name?: string;
    url?: string;
  };
}

export default function KYBSection() {
  const [onboardingLoading, setOnboardingLoading] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  const {
    data: accountInfo,
    isLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["stripeConnectAccount"],
    queryFn: async () => {
      const result = await getStripeConnectAccountInfo({});
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data as unknown as StripeConnectAccountInfo;
    },
    refetchOnWindowFocus: false,
  });

  const error = queryError
    ? (queryError as Error).message ||
      "Erreur lors de la récupération des informations du compte"
    : null;

  const startOnboarding = async () => {
    try {
      setOnboardingLoading(true);
      const result = await createStripeConnectOnboardingLink({});
      if (result.error) {
        throw new Error(result.error);
      }
      const onboardingUrl = result.data as string;
      window.open(onboardingUrl, "_blank");
      toast.success("Lien d'onboarding généré", {
        description:
          "Une nouvelle fenêtre a été ouverte pour compléter l'onboarding Stripe.",
      });
      // Actualiser les informations après 5 secondes
      setTimeout(() => {
        refetch();
      }, 5000);
    } catch (err: any) {
      toast.error("Erreur", {
        description:
          err.message || "Impossible de générer le lien d'onboarding",
      });
    } finally {
      setOnboardingLoading(false);
    }
  };

  // Fonction pour traduire les exigences de Stripe
  const translateRequirement = (requirement: string) => {
    const translations: Record<string, string> = {
      external_account: "Compte bancaire",
      "tos_acceptance.date": "Acceptation des conditions d'utilisation",
      "tos_acceptance.ip": "Adresse IP d'acceptation",
      "business_profile.url": "URL du site web",
      "business_profile.mcc": "Catégorie d'activité",
      "company.address.city": "Ville de l'entreprise",
      "company.address.line1": "Adresse de l'entreprise",
      "company.address.postal_code": "Code postal de l'entreprise",
      "company.name": "Nom de l'entreprise",
      "company.phone": "Téléphone de l'entreprise",
      "company.tax_id": "Numéro de TVA",
      "person.address.city": "Ville du représentant légal",
      "person.address.line1": "Adresse du représentant légal",
      "person.address.postal_code": "Code postal du représentant légal",
      "person.dob.day": "Jour de naissance du représentant légal",
      "person.dob.month": "Mois de naissance du représentant légal",
      "person.dob.year": "Année de naissance du représentant légal",
      "person.email": "Email du représentant légal",
      "person.first_name": "Prénom du représentant légal",
      "person.last_name": "Nom du représentant légal",
      "person.phone": "Téléphone du représentant légal",
      "person.id_number": "Numéro d'identité du représentant légal",
    };

    return translations[requirement] || requirement;
  };

  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>Compte Stripe Connect</CardTitle>
        <CardDescription>
          Gérez votre compte Stripe Connect pour recevoir des paiements
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : error ? (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Erreur</AlertTitle>
            <AlertDescription>
              {error}
              <Button
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={() => refetch()}
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Réessayer
              </Button>
            </AlertDescription>
          </Alert>
        ) : !accountInfo ? (
          <div>
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Compte non configuré</AlertTitle>
              <AlertDescription>
                Vous devez configurer votre compte Stripe Connect pour recevoir
                des paiements.
              </AlertDescription>
            </Alert>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-4">
                Choisissez votre méthode d'onboarding :
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-36 flex flex-col"
                  onClick={() => startOnboarding()}
                  disabled={onboardingLoading}
                >
                  {onboardingLoading ? (
                    <RefreshCw className="w-8 h-8 mb-2 animate-spin" />
                  ) : (
                    <ExternalLink className="w-8 h-8 mb-2" />
                  )}
                  <span className="font-medium">Onboarding standard</span>
                  <span className="text-sm text-gray-500 text-center mt-2 px-4">
                    Utiliser le formulaire préconfiguré de Stripe pour compléter
                    l'onboarding
                  </span>
                </Button>

                <Button
                  variant="outline"
                  className="h-36 flex flex-col"
                  onClick={() => setIsOnboardingModalOpen(true)}
                >
                  <Layers className="w-8 h-8 mb-2" />
                  <span className="font-medium">Onboarding personnalisé</span>
                  <span className="text-sm text-gray-500 text-center mt-2 px-4">
                    Compléter les informations étape par étape dans une
                    interface intégrée
                  </span>
                </Button>
              </div>
            </div>

            {/* Modale d'onboarding personnalisé */}
            <StripeOnboardingDialog
              isOpen={isOnboardingModalOpen}
              onOpenChange={setIsOnboardingModalOpen}
              title="Configuration de votre compte Stripe Connect"
              trigger={null}
              onComplete={() => {
                setIsOnboardingModalOpen(false);
                refetch();
                toast.success("Configuration du compte terminée", {
                  description:
                    "Votre compte Stripe Connect est maintenant configuré.",
                });
              }}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">
                  ID du compte
                </h3>
                <p className="text-sm font-mono">{accountInfo.id}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="text-sm">{accountInfo.email}</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">
                  Nom commercial
                </h3>
                <p className="text-sm">
                  {accountInfo.businessProfile?.name || "Non défini"}
                </p>
              </div>
              <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Site web</h3>
                <p className="text-sm">
                  {accountInfo.businessProfile?.url ? (
                    <Link
                      href={accountInfo.businessProfile.url}
                      target="_blank"
                      className="flex items-center text-blue-600 hover:underline"
                    >
                      {accountInfo.businessProfile.url}
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Link>
                  ) : (
                    "Non défini"
                  )}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                className={
                  accountInfo.detailsSubmitted
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                }
              >
                {accountInfo.detailsSubmitted
                  ? "Informations complètes"
                  : "Informations incomplètes"}
              </Badge>
              <Badge
                className={
                  accountInfo.chargesEnabled
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                }
              >
                {accountInfo.chargesEnabled
                  ? "Paiements activés"
                  : "Paiements désactivés"}
              </Badge>
              <Badge
                className={
                  accountInfo.payoutsEnabled
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-red-100 text-red-800 hover:bg-red-200"
                }
              >
                {accountInfo.payoutsEnabled
                  ? "Virements activés"
                  : "Virements désactivés"}
              </Badge>
            </div>

            {(accountInfo.requirements.currently_due.length > 0 ||
              accountInfo.requirements.eventually_due.length > 0 ||
              accountInfo.requirements.past_due.length > 0) && (
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Informations manquantes</AlertTitle>
                <AlertDescription>
                  <div className="mt-2 space-y-4">
                    {accountInfo.requirements.currently_due.length > 0 && (
                      <div>
                        <p className="font-medium">À fournir immédiatement :</p>
                        <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                          {accountInfo.requirements.currently_due.map((req) => (
                            <li key={req}>{translateRequirement(req)}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {accountInfo.requirements.eventually_due.length > 0 && (
                      <div>
                        <p className="font-medium">À fournir prochainement :</p>
                        <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                          {accountInfo.requirements.eventually_due.map(
                            (req) => (
                              <li key={req}>{translateRequirement(req)}</li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}
                    {accountInfo.requirements.past_due.length > 0 && (
                      <div>
                        <p className="font-medium">En retard :</p>
                        <ul className="list-disc list-inside text-sm space-y-1 mt-1">
                          {accountInfo.requirements.past_due.map((req) => (
                            <li key={req}>{translateRequirement(req)}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {accountInfo.detailsSubmitted &&
              accountInfo.chargesEnabled &&
              accountInfo.payoutsEnabled && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800">
                    Compte vérifié
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    Votre compte Stripe Connect est complètement configuré et
                    prêt à recevoir des paiements.
                  </AlertDescription>
                </Alert>
              )}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <div className="w-full flex justify-between">
          <div>
            {accountInfo?.detailsSubmitted && (
              <Badge
                variant={
                  accountInfo.payoutsEnabled && accountInfo.chargesEnabled
                    ? "default"
                    : "outline"
                }
                className={`mb-2 ${
                  accountInfo.payoutsEnabled && accountInfo.chargesEnabled
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : ""
                }`}
              >
                {accountInfo.payoutsEnabled && accountInfo.chargesEnabled ? (
                  <>
                    <CheckCircle2 className="mr-1 h-3 w-3" />
                    Compte activé
                  </>
                ) : (
                  "Configuration en cours"
                )}
              </Badge>
            )}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={() => refetch()}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualiser
            </Button>

            {(!accountInfo?.payoutsEnabled || !accountInfo?.chargesEnabled) && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setIsOnboardingModalOpen(true)}
                >
                  <Layers className="mr-2 h-4 w-4" />
                  Utiliser l'onboarding personnalisé
                </Button>

                <Button onClick={startOnboarding} disabled={onboardingLoading}>
                  {onboardingLoading ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Chargement...
                    </>
                  ) : (
                    <>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {accountInfo?.detailsSubmitted
                        ? "Mettre à jour les informations"
                        : "Compléter l'onboarding standard"}
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
