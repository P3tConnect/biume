"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { XCircle, AlertCircle, ArrowLeft, MessageCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function PaymentFailure() {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount") || "0";
  const professionalName = searchParams.get("professionalName") || "le professionnel";
  const error = searchParams.get("error") || "Une erreur est survenue lors du traitement de votre paiement";

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-background">
      <Card className="w-full max-w-md p-8 space-y-8">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="rounded-full bg-red-100 p-3">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>

          <h1 className="text-2xl font-bold text-foreground">
            Échec du paiement
          </h1>

          <p className="text-muted-foreground">
            Le paiement de {amount}€ à {professionalName} n'a pas pu être effectué.
          </p>

          <div className="w-full p-4 rounded-lg bg-red-50 border border-red-100">
            <div className="flex items-center gap-2 text-red-600">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm font-medium">{error}</p>
            </div>
          </div>

          <div className="w-full h-px bg-border my-2" />

          <div className="flex flex-col w-full space-y-2">
            <Link href="/payment" className="w-full">
              <Button className="w-full gap-2">
                <ArrowLeft className="w-4 h-4" />
                Réessayer le paiement
              </Button>
            </Link>
            <Link href="/support" className="w-full">
              <Button variant="outline" className="w-full gap-2">
                <MessageCircle className="w-4 h-4" />
                Contacter le support
              </Button>
            </Link>
          </div>
        </div>

        <div className="flex justify-center pt-4">
          <Link href="/dashboard">
            <Button variant="ghost" size="lg">
              Retourner au tableau de bord
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
