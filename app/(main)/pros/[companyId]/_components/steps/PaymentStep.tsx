"use client"

import { Service, Option } from "@/src/db"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { cn } from "@/src/lib/utils"
import { CreditCard, Wallet, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface PaymentStepProps {
  selectedService: Service | null
  isHomeVisit: boolean
  selectedOptions: Option[]
  paymentMethod: string | null
  onSelectPaymentMethod: (method: string) => void
}

export function PaymentStep({
  selectedService,
  isHomeVisit,
  selectedOptions,
  paymentMethod,
  onSelectPaymentMethod,
}: PaymentStepProps) {
  // Calculer le prix total
  const basePrice = selectedService?.price || 0
  const optionsPrice = selectedOptions.reduce((acc, option) => acc + (option.price || 0), 0)
  const homeVisitPrice = isHomeVisit ? 10 : 0
  const totalPrice = basePrice + optionsPrice + homeVisitPrice

  return (
    <div className="space-y-6">
      {/* En-tête avec prix total */}
      <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
        <h3 className="font-medium">Total à payer</h3>
        <span className="text-xl font-semibold text-primary">{totalPrice}€</span>
      </div>

      {/* Méthode de paiement */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Choisissez votre méthode de paiement</h3>
          {!paymentMethod && <span className="text-xs text-destructive">* Requis</span>}
        </div>

        {!paymentMethod && (
          <Alert variant="destructive" className="mb-4 bg-destructive/10 border-destructive/20 text-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Veuillez sélectionner une méthode de paiement pour continuer</AlertDescription>
          </Alert>
        )}

        <RadioGroup
          defaultValue={paymentMethod || undefined}
          value={paymentMethod || undefined}
          onValueChange={onSelectPaymentMethod}
          className="grid grid-cols-1 gap-3"
        >
          <div className="relative">
            <RadioGroupItem value="online" id="online" className="peer sr-only" />
            <Label
              htmlFor="online"
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all h-full",
                "hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5",
                !paymentMethod && "border-destructive/50"
              )}
            >
              <CreditCard className="h-5 w-5 mt-0.5 text-primary" />
              <div className="space-y-1">
                <p className="font-medium">Payer en ligne</p>
                <p className="text-xs text-muted-foreground">Carte bancaire, Apple Pay</p>
              </div>
            </Label>
          </div>

          <div className="relative">
            <RadioGroupItem value="inPerson" id="inPerson" className="peer sr-only" />
            <Label
              htmlFor="inPerson"
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all h-full",
                "hover:border-primary/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5",
                !paymentMethod && "border-destructive/50"
              )}
            >
              <Wallet className="h-5 w-5 mt-0.5 text-primary" />
              <div className="space-y-1">
                <p className="font-medium">Payer sur place</p>
                <p className="text-xs text-muted-foreground">Carte, espèces ou chèque</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}
