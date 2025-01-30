"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const BillingSection = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Facturation & Abonnement</CardTitle>
        <CardDescription>
          Gérez votre abonnement et vos informations de facturation
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Plan actuel</h3>
          <p className="text-sm text-muted-foreground">
            Plan Professionnel - 49€/mois
          </p>
          <Button variant="outline" className="mt-4">
            Changer de plan
          </Button>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Moyen de paiement</h3>
          <p className="text-sm text-muted-foreground">
            Visa se terminant par 4242
          </p>
          <Button variant="outline" className="mt-4">
            Mettre à jour le moyen de paiement
          </Button>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Historique de facturation</h3>
          <p className="text-sm text-muted-foreground">
            Voir et télécharger les factures passées
          </p>
          <Button variant="outline" className="mt-4">
            Voir l'historique de facturation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}; 