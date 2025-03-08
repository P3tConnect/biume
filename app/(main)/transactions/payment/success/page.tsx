"use client"

import { ArrowLeft, CheckCircle2, Download, Mail } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function PaymentSuccess() {
  const searchParams = useSearchParams()
  const amount = searchParams.get("amount") || "0"
  const professionalName = searchParams.get("professionalName") || "le professionnel"

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
                  <CheckCircle2 className="w-12 h-12 text-emerald-600" strokeWidth={2.5} />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground">Paiement confirmé</h1>
                <p className="text-muted-foreground max-w-md mx-auto text-base">
                  Votre paiement de <span className="font-medium text-foreground">{amount}€</span> à {professionalName}{" "}
                  a été traité avec succès.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-muted/40 p-4 rounded-lg">
                <p className="text-sm text-muted-foreground text-center">
                  Un reçu détaillé a été envoyé à votre adresse email
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                <Button variant="outline" className="gap-2 h-11">
                  <Download className="w-4 h-4" />
                  Télécharger le reçu
                </Button>
                <Button variant="outline" className="gap-2 h-11">
                  <Mail className="w-4 h-4" />
                  Renvoyer par email
                </Button>
              </div>

              <div>
                <Link href="/dashboard" className="w-full">
                  <Button size="lg" className="w-full gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Retour au tableau de bord
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
