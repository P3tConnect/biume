"use client";

import { useActiveOrganization } from "@/src/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Button,
} from "@/components/ui";
import { AlertTriangle, CheckCircle, ExternalLink, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getStripeConnectAccountInfo } from "@/src/actions/stripe.action";
import { useState } from "react";

export function StripeSetupCard() {
  const { data: activeOrg } = useActiveOrganization();
  const [refreshing, setRefreshing] = useState(false);

  // Récupérer les informations du compte Stripe Connect si companyStripeId existe
  const { data: stripeConnectInfo, refetch } = useQuery({
    queryKey: ['stripeConnectAccount', activeOrg?.id],
    queryFn: async () => {
      if (!activeOrg?.companyStripeId) return null;

      const result = await getStripeConnectAccountInfo({});
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },
    enabled: !!activeOrg?.companyStripeId,
    refetchOnWindowFocus: false,
  });

  // Si l'organisation n'est pas chargée ou si tout est complètement configuré, ne pas afficher la carte
  if (!activeOrg || (activeOrg.customerStripeId &&
    activeOrg.companyStripeId &&
    stripeConnectInfo?.detailsSubmitted &&
    stripeConnectInfo?.chargesEnabled &&
    stripeConnectInfo?.payoutsEnabled)) {
    return null;
  }

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  // Vérifier l'état de configuration de Stripe Connect
  const isConnectConfigured = activeOrg.companyStripeId && stripeConnectInfo;
  const isConnectComplete = isConnectConfigured &&
    stripeConnectInfo.detailsSubmitted &&
    stripeConnectInfo.chargesEnabled &&
    stripeConnectInfo.payoutsEnabled;

  // Vérifier s'il y a des exigences en attente
  const hasPendingRequirements = isConnectConfigured &&
    stripeConnectInfo.requirements &&
    ((stripeConnectInfo.requirements.currently_due?.length ?? 0) > 0 ||
      (stripeConnectInfo.requirements.eventually_due?.length ?? 0) > 0 ||
      (stripeConnectInfo.requirements.past_due?.length ?? 0) > 0);


  if (!hasPendingRequirements) {
    return null;
  }

  return (
    <Card className="mb-4">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <h4 className="font-medium">Configuration Stripe incomplète</h4>

          {activeOrg.companyStripeId && (
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 ml-auto"
              onClick={handleRefresh}
              disabled={refreshing}
            >
              <RefreshCw className={`h-3.5 w-3.5 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
          )}
        </div>

        <div className="text-sm text-muted-foreground mb-3">
          Complétez votre configuration Stripe pour accéder à toutes les
          fonctionnalités.
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs">
            {activeOrg.customerStripeId !== "" ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : (
              <AlertTriangle className="h-3 w-3 text-amber-500" />
            )}
            <span>Client Stripe</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            {activeOrg.companyStripeId !== "" ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : (
              <AlertTriangle className="h-3 w-3 text-amber-500" />
            )}
            <span>Entreprise Stripe</span>
          </div>

          {activeOrg.companyStripeId !== "" && (
            <>
              <div className="flex items-center gap-1.5 text-xs">
                {isConnectConfigured && stripeConnectInfo.detailsSubmitted ? (
                  <CheckCircle className="h-3 w-3 text-green-500" />
                ) : (
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                )}
                <span>Informations entreprise soumises</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                {isConnectConfigured && stripeConnectInfo.chargesEnabled !== false ? (
                  <CheckCircle className="h-3 w-3 text-green-500" />
                ) : (
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                )}
                <span>Paiements activés</span>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                {isConnectConfigured && stripeConnectInfo.payoutsEnabled !== false ? (
                  <CheckCircle className="h-3 w-3 text-green-500" />
                ) : (
                  <AlertTriangle className="h-3 w-3 text-amber-500" />
                )}
                <span>Versements activés</span>
              </div>

              {hasPendingRequirements && (
                <div className="text-xs text-amber-500 mt-1">
                  <span>Des informations supplémentaires sont requises par Stripe.</span>
                </div>
              )}
            </>
          )}
        </div>

        {(!activeOrg.customerStripeId || !activeOrg.companyStripeId || !isConnectComplete) && (
          <Button size="sm" variant="outline" className="mt-3 text-xs h-8">
            <Link href={`/dashboard/organization/${activeOrg.id}/settings?tab=kyb`} className="flex items-center">
              Compléter la configuration
              <ExternalLink className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        )}
      </div>
    </Card>
  );
}
