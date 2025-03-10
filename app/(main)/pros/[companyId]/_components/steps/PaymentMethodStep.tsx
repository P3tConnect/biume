"use client"

import { Button } from "@/components/ui"
import { Check, CreditCard, Wallet } from "lucide-react"
import { cn } from "@/src/lib/utils"

interface PaymentMethodStepProps {
  paymentMethod: "online" | "inPerson" | null
  onSelectPaymentMethod: (method: "online" | "inPerson") => void
}

export function PaymentMethodStep({ paymentMethod, onSelectPaymentMethod }: PaymentMethodStepProps) {
  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground mb-4">Choisissez votre mode de paiement préféré.</div>

      <div className="grid gap-4 md:grid-cols-2">
        <Button
          type="button"
          variant="outline"
          className={cn(
            "relative h-auto flex flex-col items-center justify-center border-2 p-4 gap-2",
            paymentMethod === "online" ? "border-primary" : "border-border"
          )}
          onClick={() => onSelectPaymentMethod("online")}
        >
          <div className="flex items-center justify-center rounded-full bg-primary/10 h-10 w-10 text-primary">
            <CreditCard className="h-5 w-5" />
          </div>
          <div className="text-center">
            <h3 className="font-medium text-sm">Paiement en ligne</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">Payez maintenant via notre plateforme</p>
          </div>
          {paymentMethod === "online" && (
            <div className="absolute top-2 right-2">
              <Check className="h-5 w-5 text-primary" />
            </div>
          )}
        </Button>

        <Button
          type="button"
          variant="outline"
          className={cn(
            "relative h-auto flex flex-col items-center justify-center border-2 p-4 gap-2",
            paymentMethod === "inPerson" ? "border-primary" : "border-border"
          )}
          onClick={() => onSelectPaymentMethod("inPerson")}
        >
          <div className="flex items-center justify-center rounded-full bg-primary/10 h-10 w-10 text-primary">
            <Wallet className="h-5 w-5" />
          </div>
          <div className="text-center">
            <h3 className="font-medium text-sm">Paiement sur place</h3>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">Payez lors de votre rendez-vous</p>
          </div>
          {paymentMethod === "inPerson" && (
            <div className="absolute top-2 right-2">
              <Check className="h-5 w-5 text-primary" />
            </div>
          )}
        </Button>
      </div>
    </div>
  )
}
