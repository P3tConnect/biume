"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StripeOnboardingDialog } from "./OnboardingProcess";

export function StripeOnboardingTrigger() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Configuration de paiement</h2>
      <p className="text-muted-foreground">
        Configurez votre compte Stripe pour commencer à recevoir des paiements
      </p>

      {/* Déclencheur avec rendu personnalisé */}
      <StripeOnboardingDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        trigger={
          <Button variant="default" className="mt-2">
            Configurer mon compte Stripe
          </Button>
        }
      />

      {/* Exemple d'ouverture programmatique */}
      <div className="mt-4 pt-4 border-t">
        <h3 className="text-md font-medium">
          Exemple d'ouverture programmatique
        </h3>
        <Button
          variant="outline"
          onClick={() => setIsOpen(true)}
          className="mt-2"
        >
          Ouvrir l'onboarding
        </Button>
      </div>
    </div>
  );
}
