"use client"

import { AlertTriangle, CheckCircle } from "lucide-react"
import Link from "next/link"

import { Button, Card } from "@/components/ui"
import { useActiveOrganization } from "@/src/lib/auth-client"

export function StripeSetupCard() {
  const { data: activeOrg } = useActiveOrganization()

  // Si l'organisation n'est pas chargée ou si les deux ID Stripe sont présents, ne pas afficher la carte
  if (!activeOrg || (activeOrg.customerStripeId && activeOrg.companyStripeId)) {
    return null
  }

  return (
    <Card className="mb-4">
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />
          <h4 className="font-medium">Configuration Stripe incomplète</h4>
        </div>

        <div className="text-sm text-muted-foreground mb-3">
          Complétez votre configuration Stripe pour accéder à toutes les fonctionnalités.
        </div>

        <div className="flex gap-4">
          <div className="flex items-center gap-1.5 text-xs">
            {activeOrg.customerStripeId ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : (
              <AlertTriangle className="h-3 w-3 text-amber-500" />
            )}
            <span>Client Stripe</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            {activeOrg.companyStripeId ? (
              <CheckCircle className="h-3 w-3 text-green-500" />
            ) : (
              <AlertTriangle className="h-3 w-3 text-amber-500" />
            )}
            <span>Entreprise Stripe</span>
          </div>
        </div>

        {(!activeOrg.customerStripeId || !activeOrg.companyStripeId) && (
          <Button size="sm" variant="outline" className="mt-3 text-xs h-8">
            <Link href="/dashboard/settings/billing">Compléter la configuration</Link>
          </Button>
        )}
      </div>
    </Card>
  )
}
