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
import { useParams } from "next/navigation";
import { useActionQuery } from "@/src/hooks/action-hooks";
import {
  getBillingInfo,
  updateOrganizationPlan,
} from "@/src/actions/stripe.action";
import { Skeleton } from "@/components/ui/skeleton";
import { getPlanName, logger } from "@/src/lib";

export const BillingSection = () => {
  const params = useParams();
  const orgId = params.orgId as string;

  const { data: billingInfo, isLoading } = useActionQuery(
    getBillingInfo,
    { organizationId: orgId },
    "billing-info",
  );

  logger.info(billingInfo, "billingInfo");

  const handleChangePlan = async () => {
    const result = await updateOrganizationPlan({
      organizationId: orgId,
      plan: "price_xxx", // Remplacer par l'ID du plan souhaité
    });
    if (result.data) {
      window.location.href = result.data;
    }
  };

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
          {isLoading ? (
            <Skeleton className="h-4 w-[200px]" />
          ) : (
            <p className="text-sm text-muted-foreground">
              {billingInfo?.currentPlan} - {billingInfo?.currentPrice}/mois
            </p>
          )}
          <Button variant="outline" className="mt-4" onClick={handleChangePlan}>
            Changer de plan
          </Button>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="font-medium mb-2">Moyen de paiement</h3>
          {isLoading ? (
            <Skeleton className="h-4 w-[200px]" />
          ) : (
            <p className="text-sm text-muted-foreground">
              {billingInfo?.paymentMethod}
            </p>
          )}
          <Button variant="outline" className="mt-4" onClick={handleChangePlan}>
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
