"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { BusinessProfileForm } from "./steps/BusinessProfileForm";
import { LegalEntityForm } from "./steps/LegalEntityForm";
import { BankAccountForm } from "./steps/BankAccountForm";
import { DocumentsUploadForm } from "./steps/DocumentsUploadForm";
import { OnboardingSummary } from "./steps/OnboardingSummary";
import { StepProgress } from "./StepProgress";
import {
  createEmptyStripeConnectAccount,
  getStripeConnectAccountInfo,
} from "@/src/actions/stripe-connect.action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

// Définir le type pour les exigences Stripe
interface StripeRequirements {
  currently_due: string[];
  eventually_due: string[];
  past_due: string[];
  pending_verification: string[];
}

// Définir le type pour les informations du compte Stripe
interface StripeConnectAccountInfo {
  id: string;
  chargesEnabled: boolean;
  payoutsEnabled: boolean;
  detailsSubmitted: boolean;
  requirements: StripeRequirements;
  email: string;
  businessProfile?: {
    name?: string;
    url?: string;
  };
  verification?: {
    status: string;
  };
}

type Step = "business" | "legal" | "banking" | "documents" | "summary";

// Interface pour le dialogue d'onboarding
interface StripeOnboardingDialogProps {
  trigger?: React.ReactNode;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  title?: string;
  onComplete?: () => void;
}

export function StripeOnboardingDialog({
  trigger,
  isOpen,
  onOpenChange,
  title = "Configuration de votre compte Stripe",
  onComplete,
}: StripeOnboardingDialogProps) {
  const [dialogOpen, setDialogOpen] = useState(isOpen || false);

  // Synchroniser l'état contrôlé externe
  useEffect(() => {
    if (isOpen !== undefined) {
      setDialogOpen(isOpen);
    }
  }, [isOpen]);

  // Gérer les changements d'état de la boîte de dialogue
  const handleOpenChange = (open: boolean) => {
    setDialogOpen(open);
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  // Gérer la complétion de l'onboarding
  const handleOnboardingComplete = () => {
    // Fermer la modale
    handleOpenChange(false);

    // Appeler le callback du parent si fourni
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-screen-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <StripeOnboardingProcess onComplete={handleOnboardingComplete} />
      </DialogContent>
    </Dialog>
  );
}

export function StripeOnboardingProcess({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [step, setStep] = useState<Step>("business");
  const [accountId, setAccountId] = useState<string | null>(null);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  // Vérifier si un compte existe déjà
  const {
    data: accountInfo,
    isLoading,
    error: queryError,
    refetch,
  } = useQuery({
    queryKey: ["stripeConnectAccountForOnboarding", accountId],
    queryFn: async () => {
      if (!accountId) return null;
      const result = await getStripeConnectAccountInfo({ accountId });
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data as unknown as StripeConnectAccountInfo;
    },
    enabled: !!accountId,
    refetchOnWindowFocus: false,
  });

  const error = queryError
    ? (queryError as Error).message ||
      "Erreur lors de la récupération des informations du compte"
    : null;

  // Créer un compte Stripe Connect vide au début du processus
  useEffect(() => {
    const createAccount = async () => {
      if (!accountId && !isCreatingAccount) {
        try {
          setIsCreatingAccount(true);
          const result = await createEmptyStripeConnectAccount();
          if (result.error) {
            throw new Error(result.error);
          }
          if (result.data) {
            setAccountId(result.data);
            toast.success("Compte Stripe Connect créé", {
              description: "Vous pouvez maintenant compléter votre onboarding",
            });
          }
        } catch (err: any) {
          toast.error("Erreur lors de la création du compte", {
            description: err.message || "Veuillez réessayer ultérieurement",
          });
        } finally {
          setIsCreatingAccount(false);
        }
      }
    };

    createAccount();
  }, [accountId, isCreatingAccount]);

  // Déterminer quelle étape montrer en fonction des informations du compte
  useEffect(() => {
    if (accountInfo && accountInfo.requirements) {
      // Logique pour définir l'étape en fonction des exigences manquantes
      const { currently_due } = accountInfo.requirements;

      if (currently_due && currently_due.length > 0) {
        if (currently_due.includes("external_account")) {
          setStep("banking");
        } else if (currently_due.some((req) => req.includes("company."))) {
          setStep("legal");
        } else if (
          currently_due.some((req) => req.includes("business_profile."))
        ) {
          setStep("business");
        } else if (
          currently_due.some((req) => req.includes("verification.document"))
        ) {
          setStep("documents");
        }
      } else if (accountInfo.payoutsEnabled && accountInfo.chargesEnabled) {
        setStep("summary");
      }
    }
  }, [accountInfo]);

  // Vérifier si le processus est terminé et notifier le parent
  useEffect(() => {
    if (
      accountInfo?.payoutsEnabled &&
      accountInfo?.chargesEnabled &&
      step === "summary" &&
      onComplete
    ) {
      // Permet au parent de savoir que l'onboarding est terminé avec succès
      onComplete();
    }
  }, [accountInfo, step, onComplete]);

  if (isLoading || isCreatingAccount) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-full max-w-sm" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive" className="m-6">
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
            Réessayer
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-8">
      <StepProgress currentStep={step} />

      {step === "business" && (
        <BusinessProfileForm
          accountId={accountId}
          onComplete={() => setStep("legal")}
        />
      )}

      {step === "legal" && (
        <LegalEntityForm
          accountId={accountId}
          onComplete={() => setStep("banking")}
          onBack={() => setStep("business")}
        />
      )}

      {step === "banking" && (
        <BankAccountForm
          accountId={accountId}
          onComplete={() => setStep("documents")}
          onBack={() => setStep("legal")}
        />
      )}

      {step === "documents" && (
        <DocumentsUploadForm
          accountId={accountId}
          onComplete={() => setStep("summary")}
          onBack={() => setStep("banking")}
        />
      )}

      {step === "summary" && (
        <OnboardingSummary
          accountId={accountId}
          onBack={() => setStep("documents")}
          onRefresh={() => refetch()}
        />
      )}
    </div>
  );
}
