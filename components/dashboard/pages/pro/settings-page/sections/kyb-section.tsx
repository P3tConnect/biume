"use client";

import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  createKYBOnboardingLink,
  createKYBDashboardLink,
  getKYBStatus,
  createKYBVerification
} from "@/src/actions/stripe.action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Alert,
  AlertTitle,
  AlertDescription,
  Progress,
} from "@/components/ui";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  ExternalLink,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";
import { useActiveOrganization } from "@/src/lib/auth-client";
import { safeConfig } from "@/src/lib";

// Types pour les exigences Stripe
interface Requirements {
  currently_due?: string[];
  eventually_due?: string[];
  past_due?: string[];
}

// Type pour une personne Stripe
interface Person {
  id: string;
  first_name?: string;
  last_name?: string;
}

const KYBSection = () => {
  const { data: activeOrganization } = useActiveOrganization();
  const [verificationStarted, setVerificationStarted] = useState(false);

  // Récupérer le statut KYB
  const { data: kybStatusResult, refetch: refetchKYBStatus, isLoading: isLoadingStatus } = useQuery({
    queryKey: ["kyb-status", activeOrganization?.id],
    queryFn: async () => {
      if (!activeOrganization?.id) return null;
      return await getKYBStatus({ organizationId: activeOrganization.id });
    },
    enabled: !!activeOrganization?.id,
  });

  // Extraire les données du résultat de l'action
  const kybStatus = kybStatusResult?.data;

  // Démarrer/reprendre la vérification KYB
  const { mutateAsync: startKYBVerification, isPending: isStartingVerification } = useMutation({
    mutationFn: async () => {
      if (!activeOrganization?.id) throw new Error("Organisation non trouvée");

      // Si le compte n'existe pas, créer d'abord un compte Stripe Connect basique
      if (!kybStatus?.exists) {
        await createKYBVerification({
          organizationId: activeOrganization.id,
          businessName: activeOrganization.name || "Mon Organisation",
          businessType: "company",
          country: "FR",
          address: {
            city: "",
            line1: "",
            postalCode: "",
          },
          phone: "",
          email: "",
        });

        await refetchKYBStatus();
      }

      // Créer un lien d'onboarding
      const returnUrl = `${safeConfig.NEXT_PUBLIC_APP_URL}/dashboard/organizations/${activeOrganization.id}/settings`;
      const result = await createKYBOnboardingLink({
        organizationId: activeOrganization.id,
        returnUrl
      });

      return result;
    },
    onSuccess: (data) => {
      // Rediriger vers le lien d'onboarding
      if (data?.data?.url) {
        window.open(data.data.url, "_blank");
        setVerificationStarted(true);
      }
    },
    onError: (error) => {
      toast.error("Erreur lors du démarrage de la vérification", {
        description: error.message || "Veuillez réessayer ultérieurement",
      });
    }
  });

  // Accéder au dashboard Stripe
  const { mutateAsync: goToDashboard, isPending: isNavigatingToDashboard } = useMutation({
    mutationFn: async () => {
      if (!activeOrganization?.id) throw new Error("Organisation non trouvée");
      return await createKYBDashboardLink({ organizationId: activeOrganization.id });
    },
    onSuccess: (data) => {
      if (data?.data?.url) {
        window.open(data.data.url, "_blank");
      }
    },
    onError: (error) => {
      toast.error("Erreur lors de l'accès au dashboard", {
        description: error.message || "Veuillez réessayer ultérieurement",
      });
    }
  });

  // Rafraîchir le statut après le retour de Stripe
  useEffect(() => {
    if (verificationStarted) {
      const timer = setInterval(() => {
        refetchKYBStatus();
      }, 5000); // Vérifier toutes les 5 secondes

      return () => clearInterval(timer);
    }
  }, [verificationStarted, refetchKYBStatus]);

  // Calculer l'état d'avancement
  const getVerificationProgress = () => {
    if (!kybStatus) return 0;

    if (!kybStatus.exists) return 0;
    if (kybStatus.status === "verified") return 100;

    // Calculer en fonction des exigences restantes
    const requirements = kybStatus.requirements || {
      currently_due: [],
      eventually_due: [],
      past_due: []
    };

    const totalReqs =
      (requirements.currently_due?.length || 0) +
      (requirements.eventually_due?.length || 0) +
      (requirements.past_due?.length || 0);

    if (totalReqs === 0) return 90; // Presque terminé

    // Donner plus de poids aux exigences passées dues
    const pastDueWeight = 2;
    const weightedTotal =
      (requirements.currently_due?.length || 0) +
      (requirements.eventually_due?.length || 0) +
      ((requirements.past_due?.length || 0) * pastDueWeight);

    // Plafonner entre 10% et 80%
    const progressPercent = 100 - Math.min(80, Math.max(10,
      (weightedTotal / (totalReqs + ((requirements.past_due?.length || 0) * (pastDueWeight - 1)))) * 100
    ));

    return Math.round(progressPercent);
  };

  // Afficher le statut de vérification
  const renderVerificationStatus = () => {
    if (!kybStatus) return null;

    if (!kybStatus.exists) {
      return (
        <Alert variant="default" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Vérification non commencée</AlertTitle>
          <AlertDescription>
            Pour recevoir des paiements en ligne, vous devez vérifier votre entreprise avec Stripe.
          </AlertDescription>
        </Alert>
      );
    }

    const progress = getVerificationProgress();

    if (kybStatus.status === "verified") {
      return (
        <Alert className="mb-4 bg-green-50 dark:bg-green-900/20">
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <AlertTitle>Vérification complète</AlertTitle>
          <AlertDescription>
            Votre compte est vérifié et vous pouvez recevoir des paiements.
          </AlertDescription>
        </Alert>
      );
    }

    const hasPastDue = (kybStatus.requirements?.past_due?.length || 0) > 0;

    return (
      <Alert
        variant={hasPastDue ? "destructive" : "default"}
        className={`mb-4 ${hasPastDue ? "bg-red-50 dark:bg-red-900/20" : "bg-amber-50 dark:bg-amber-900/20"}`}
      >
        {hasPastDue ? (
          <XCircle className="h-4 w-4 text-red-500" />
        ) : (
          <Clock className="h-4 w-4 text-amber-500" />
        )}
        <AlertTitle>
          {hasPastDue
            ? "Action requise immédiatement"
            : "Vérification en cours"}
        </AlertTitle>
        <AlertDescription>
          {hasPastDue
            ? "Certaines informations sont manquantes ou nécessitent votre attention immédiate."
            : "Votre compte est en cours de vérification par Stripe."}
        </AlertDescription>

        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span>Progression</span>
            <span>{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </Alert>
    );
  };

  // Afficher les exigences restantes
  const renderRequirements = () => {
    if (!kybStatus?.requirements || kybStatus.status === "verified") return null;

    const allRequirements = [
      ...(kybStatus.requirements.past_due || []).map((req: string) => ({ req, type: "past_due" })),
      ...(kybStatus.requirements.currently_due || []).map((req: string) => ({ req, type: "currently_due" })),
      ...(kybStatus.requirements.eventually_due || []).map((req: string) => ({ req, type: "eventually_due" })),
    ];

    if (allRequirements.length === 0) return null;

    // Formater les exigences pour l'affichage
    const formatRequirement = (req: string) => {
      return req.replace(/\./g, " ").replace(/_/g, " ")
        .split(" ")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    };

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg font-medium">Informations requises</CardTitle>
          <CardDescription>
            Complétez ces informations pour finaliser la vérification de votre compte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {allRequirements.map(({ req, type }, index) => (
              <li key={index} className="flex items-start gap-2">
                {type === "past_due" ? (
                  <XCircle className="h-4 w-4 mt-0.5 text-red-500 flex-shrink-0" />
                ) : type === "currently_due" ? (
                  <AlertCircle className="h-4 w-4 mt-0.5 text-amber-500 flex-shrink-0" />
                ) : (
                  <Clock className="h-4 w-4 mt-0.5 text-gray-400 flex-shrink-0" />
                )}
                <span
                  className={`text-sm ${type === "past_due"
                    ? "text-red-600 dark:text-red-400"
                    : type === "currently_due"
                      ? "text-amber-600 dark:text-amber-400"
                      : "text-gray-600 dark:text-gray-400"
                    }`}
                >
                  {formatRequirement(req)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-2">
            <Button
              onClick={() => startKYBVerification()}
              disabled={isStartingVerification}
              className="w-full"
            >
              Compléter les informations
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Vérification d&apos;entreprise (KYB)</CardTitle>
          <CardDescription>
            Vérifiez votre entreprise pour pouvoir recevoir des paiements en ligne via Stripe.
            Ce processus est appelé KYB (Know Your Business) et est requis par la réglementation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingStatus ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              {renderVerificationStatus()}

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <Button
                  onClick={() => startKYBVerification()}
                  disabled={isStartingVerification || isLoadingStatus}
                  variant={kybStatus?.exists ? "outline" : "default"}
                  className="flex-1"
                >
                  {kybStatus?.exists
                    ? "Continuer la vérification"
                    : "Démarrer la vérification"}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>

                {kybStatus?.exists && (
                  <Button
                    onClick={() => goToDashboard()}
                    disabled={isNavigatingToDashboard || isLoadingStatus}
                    variant="default"
                    className="flex-1"
                  >
                    Accéder au Dashboard Stripe
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {renderRequirements()}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">À propos de la vérification KYB</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-4">
          <p>
            La vérification KYB (Know Your Business) est un processus réglementaire obligatoire
            pour toutes les entreprises qui souhaitent recevoir des paiements en ligne.
          </p>
          <p>
            Ce processus inclut la vérification de l&apos;identité de l&apos;entreprise, de ses dirigeants
            et de ses bénéficiaires effectifs. Ces informations sont requises par Stripe et les
            régulateurs financiers pour prévenir la fraude et le blanchiment d&apos;argent.
          </p>
          <p>
            Toutes les informations fournies sont sécurisées et seront utilisées uniquement
            à des fins de vérification.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default KYBSection;
