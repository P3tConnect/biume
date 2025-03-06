"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  CheckCircle2,
  ChevronLeft,
  XCircle,
  RefreshCw,
  Loader2,
  AlertTriangle,
  ShieldCheck,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getStripeConnectAccountInfo } from "@/src/actions/stripe-connect.action";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

interface OnboardingSummaryProps {
  accountId: string | null;
  onBack: () => void;
  onRefresh: () => void;
}

export function OnboardingSummary({
  accountId,
  onBack,
  onRefresh,
}: OnboardingSummaryProps) {
  const [loading, setLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  const fetchAccountDetails = async () => {
    if (!accountId) {
      setError("ID de compte invalide");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await getStripeConnectAccountInfo({ accountId });

      if (result.error) {
        throw new Error(result.error);
      }

      setAccountInfo(result.data);
    } catch (err: any) {
      setError(
        err.message ||
          "Erreur lors de la récupération des informations du compte",
      );
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour évaluer le statut global du compte
  const getAccountStatus = () => {
    if (!accountInfo) return "pending";

    const { detailsSubmitted, payoutsEnabled, chargesEnabled } = accountInfo;

    if (detailsSubmitted && payoutsEnabled && chargesEnabled) {
      return "complete";
    }

    if (detailsSubmitted) {
      return "review";
    }

    return "incomplete";
  };

  // Statut des différentes parties du compte
  const getStatusItems = () => {
    if (!accountInfo) return [];

    return [
      {
        name: "Informations du compte",
        status: accountInfo.detailsSubmitted ? "complete" : "incomplete",
        description: accountInfo.detailsSubmitted
          ? "Toutes les informations requises ont été fournies."
          : "Des informations supplémentaires sont requises.",
      },
      {
        name: "Vérification d'identité",
        status:
          accountInfo.verification?.status === "verified"
            ? "complete"
            : "pending",
        description:
          accountInfo.verification?.status === "verified"
            ? "Identité vérifiée avec succès."
            : "Vérification d'identité en attente.",
      },
      {
        name: "Paiements",
        status: accountInfo.chargesEnabled ? "complete" : "pending",
        description: accountInfo.chargesEnabled
          ? "Les paiements sont activés sur votre compte."
          : "Les paiements seront activés après vérification.",
      },
      {
        name: "Virements bancaires",
        status: accountInfo.payoutsEnabled ? "complete" : "pending",
        description: accountInfo.payoutsEnabled
          ? "Les virements bancaires sont activés."
          : "Les virements seront activés après vérification.",
      },
    ];
  };

  // Traduction des exigences manquantes
  const getPendingRequirements = () => {
    if (!accountInfo?.requirements) return [];

    const { currently_due, eventually_due, past_due } =
      accountInfo.requirements;
    const allRequirements = [...currently_due, ...eventually_due, ...past_due];

    if (allRequirements.length === 0) return [];

    const translateRequirement = (req: string) => {
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

      return translations[req] || req;
    };

    return allRequirements.map(translateRequirement);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
        <div className="space-y-2 mt-6">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Erreur</AlertTitle>
        <AlertDescription>
          {error}
          <Button
            variant="outline"
            size="sm"
            className="ml-2"
            onClick={fetchAccountDetails}
          >
            <RefreshCw className="mr-2 h-4 w-4" /> Réessayer
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  const accountStatus = getAccountStatus();
  const statusItems = getStatusItems();
  const pendingRequirements = getPendingRequirements();

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Récapitulatif de votre compte
          </h2>
          <Badge
            className={
              accountStatus === "complete"
                ? "bg-green-100 text-green-800"
                : accountStatus === "review"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
            }
          >
            {accountStatus === "complete"
              ? "Compte actif"
              : accountStatus === "review"
                ? "En cours de vérification"
                : "Incomplet"}
          </Badge>
        </div>
        <p className="text-gray-500 mt-1">
          Statut actuel de votre compte Stripe Connect.
        </p>
      </div>

      {accountStatus === "complete" && (
        <Alert className="bg-green-50 border-green-200">
          <ShieldCheck className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Compte vérifié</AlertTitle>
          <AlertDescription className="text-green-700">
            Votre compte est entièrement vérifié et prêt à recevoir des
            paiements.
          </AlertDescription>
        </Alert>
      )}

      {accountStatus === "review" && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">
            En attente de vérification
          </AlertTitle>
          <AlertDescription className="text-yellow-700">
            Votre compte est en cours de vérification. Ce processus peut prendre
            jusqu'à 24-48 heures.
          </AlertDescription>
        </Alert>
      )}

      {accountStatus === "incomplete" && pendingRequirements.length > 0 && (
        <Alert className="bg-red-50 border-red-200">
          <XCircle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">
            Informations manquantes
          </AlertTitle>
          <AlertDescription className="text-red-700">
            <div className="mt-2">
              <p>Veuillez compléter les informations suivantes :</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                {pendingRequirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {statusItems.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              {item.status === "complete" ? (
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              ) : item.status === "pending" ? (
                <RefreshCw className="w-5 h-5 text-yellow-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        <div className="space-x-2">
          <Button variant="outline" onClick={onRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Actualiser
          </Button>

          <Button
            type="button"
            onClick={() => router.push("/dashboard/pro/settings")}
          >
            Terminer
          </Button>
        </div>
      </div>
    </div>
  );
}
