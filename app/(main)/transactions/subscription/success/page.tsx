"use client"

import { ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function OrganizationSubscriptionSuccess() {
  const searchParams = useSearchParams()
  const orgId = searchParams.get("org")

  if (!orgId) {
    return <div>No organization ID</div>
  }

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-background to-emerald-50/30 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <div className="relative overflow-hidden">
          {/* Cercle décoratif en arrière-plan */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-100 rounded-full opacity-50" />

          <div className="p-12 space-y-10">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="relative">
                <div className="absolute inset-0 animate-ping bg-emerald-100 rounded-full opacity-75" />
                <div className="relative rounded-full bg-emerald-100 p-4">
                  <CheckCircle className="w-12 h-12 text-emerald-600" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground">Paiement réussi !</h1>

                <p className="text-muted-foreground max-w-md mx-auto text-base">
                  Merci pour votre abonnement. Votre organisation a maintenant accès à toutes les fonctionnalités
                  premium.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <Link href={`/dashboard/organization/${orgId}`} className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retourner au tableau de bord
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
