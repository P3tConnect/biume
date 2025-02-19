"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle, ArrowLeft, RefreshCw } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function OrganizationSubscriptionFailure() {
  redirect("/");

  return (
    <div className="h-screen w-screen bg-gradient-to-b from-background to-red-50/30 flex items-center justify-center p-6">
      <Card className="w-full max-w-lg shadow-lg">
        <div className="relative overflow-hidden">
          {/* Cercle décoratif en arrière-plan */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-100 rounded-full opacity-50" />

          <div className="p-12 space-y-10">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="relative">
                <div className="absolute inset-0 animate-ping bg-red-100 rounded-full opacity-75" />
                <div className="relative rounded-full bg-red-100 p-4">
                  <XCircle className="w-12 h-12 text-red-600" />
                </div>
              </div>

              <div className="space-y-4">
                <h1 className="text-3xl font-bold text-foreground">
                  Échec du paiement
                </h1>

                <p className="text-muted-foreground max-w-md mx-auto text-base">
                  Une erreur est survenue lors du traitement de votre paiement.
                  Aucun montant n&apos;a été débité. Veuillez réessayer ou
                  contacter notre support si le problème persiste.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4 justify-center">
              <Link href={`/dashboard/organization`} className="w-full">
                <Button variant="outline" size="lg" className="w-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Retour au tableau de bord
                </Button>
              </Link>

              <Link
                href={`/dashboard/organization//subscription`}
                className="w-full"
              >
                <Button
                  variant="default"
                  size="lg"
                  className="w-full bg-red-600 hover:bg-red-700"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Réessayer le paiement
                </Button>
              </Link>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/support"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Besoin d&apos;aide ? Contactez notre support
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
