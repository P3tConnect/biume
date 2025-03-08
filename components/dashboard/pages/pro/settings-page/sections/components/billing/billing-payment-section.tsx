"use client"

import { useMutation } from "@tanstack/react-query"
import { CreditCard } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { createPaymentMethodUpdateSession } from "@/src/actions/stripe.action"
import { ActionResult } from "@/src/lib"
import { BillingInfo } from "@/types/billing-info"

export const BillingPaymentSection = ({ billingInfo }: { billingInfo: ActionResult<BillingInfo> | undefined }) => {
  const params = useParams()
  const orgId = params.orgId as string
  const router = useRouter()

  const { mutateAsync: updatePaymentMethod } = useMutation({
    mutationFn: createPaymentMethodUpdateSession,
    onSuccess: url => {
      if (url.data) {
        router.push(url.data)
      }
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la mise à jour du moyen de paiement")
    },
  })

  const handleUpdatePaymentMethod = async () => {
    await updatePaymentMethod({
      organizationId: orgId,
    })
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-primary/10">
          <CreditCard className="size-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Moyen de paiement</h3>
          <p className="text-sm text-muted-foreground">{billingInfo?.data?.paymentMethod}</p>
        </div>
      </div>
      <Button variant="outline" onClick={handleUpdatePaymentMethod}>
        Mettre à jour
      </Button>
    </div>
  )
}
