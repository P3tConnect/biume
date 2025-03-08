import { useQueries } from "@tanstack/react-query"
import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getInvoiceHistory } from "@/src/actions/stripe.action"
import { getBillingInfo } from "@/src/actions/stripe.action"
import { safeConfig } from "@/src/lib"

import { BillingInvoicesSection } from "./components/billing/billing-invoices-section"
import { BillingPaymentSection } from "./components/billing/billing-payment-section"
import { BillingPlanSection } from "./components/billing/billing-plan-section"

export const plans = [
  {
    name: "Basic",
    description: "Pour les professionnels indépendants",
    price: "14.99",
    features: [
      "Gestion Client",
      "Facturation et devis",
      "Emploi du temps",
      "Compte rendus et observations",
      "Comptabilité",
      "Partage de dossier client",
      "Paiement en ligne",
      "Réservation client",
    ],
    priceId: safeConfig.STRIPE_BASIC_PLAN_ID,
  },
  {
    name: "Pro",
    description: "Pour les petites équipes",
    price: "24.99",
    features: [
      "Abonnement Basic +",
      "Notifications",
      "Rappels automatiques",
      "Délais de rétraction",
      "Echelons de remboursement",
      "Preview Biume AI",
      "Jusqu'à 5 employés",
    ],
    priceId: safeConfig.STRIPE_PRO_PLAN_ID,
  },
  {
    name: "Ultimate",
    description: "Pour les moyennes et grandes structures",
    price: "34.99",
    features: [
      "Abonnement Pro +",
      "Biume AI",
      "Rapports de performance",
      "Communication centralisée",
      "Jusqu'à 10 employés",
    ],
    priceId: safeConfig.STRIPE_ULTIMATE_PLAN_ID,
  },
]

export const BillingSection = () => {
  const [{ data: billingInfo, isLoading: isBillingLoading }, { data: invoices, isLoading: isInvoicesLoading }] =
    useQueries({
      queries: [
        {
          queryKey: ["billing-info"],
          queryFn: () => getBillingInfo({}),
        },
        {
          queryKey: ["invoices"],
          queryFn: () => getInvoiceHistory({}),
        },
      ],
    })

  const isLoading = isBillingLoading || isInvoicesLoading

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b bg-muted/10 pb-8 pt-6">
        <CardTitle className="text-2xl font-bold">Facturation & Abonnement</CardTitle>
        <CardDescription className="text-base">
          Gérez votre abonnement et vos informations de facturation
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          {isLoading ? (
            <>
              <div className="space-y-3">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-[200px]" />
              </div>
              <div className="h-px bg-border" />
              <div className="space-y-3">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-16 w-full" />
              </div>
              <div className="h-px bg-border" />
              <div className="space-y-3">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-20 w-full" />
              </div>
            </>
          ) : (
            <>
              <BillingPlanSection plans={plans} billingInfo={billingInfo} />
              <div className="h-px bg-border" />
              <BillingPaymentSection billingInfo={billingInfo} />
              <div className="h-px bg-border" />
              <BillingInvoicesSection invoices={invoices} />
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
