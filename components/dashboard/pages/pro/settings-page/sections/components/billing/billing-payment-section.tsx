"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { CreditCard } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useActionQuery, useActionMutation } from "@/src/hooks/action-hooks";
import { getBillingInfo, createPaymentMethodUpdateSession } from "@/src/actions/stripe.action";
import { toast } from "sonner";

export const BillingPaymentSection = () => {
  const params = useParams();
  const orgId = params.orgId as string;
  const router = useRouter();

  const { data: billingInfo, isLoading } = useActionQuery(
    getBillingInfo,
    { organizationId: orgId },
    "billing-info",
  );

  const { mutateAsync: updatePaymentMethod } = useActionMutation(
    createPaymentMethodUpdateSession,
    {
      onSuccess: (url) => {
        if (url) {
          router.push(url);
        }
      },
      onError: () => {
        toast.error(
          "Une erreur est survenue lors de la mise à jour du moyen de paiement",
        );
      },
    },
  );

  const handleUpdatePaymentMethod = async () => {
    await updatePaymentMethod({
      organizationId: orgId,
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="flex aspect-square size-10 items-center justify-center rounded-full bg-primary/10">
          <CreditCard className="size-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-medium">Moyen de paiement</h3>
          {isLoading ? (
            <Skeleton className="mt-1 h-4 w-[200px]" />
          ) : (
            <p className="text-sm text-muted-foreground">
              {billingInfo?.paymentMethod}
            </p>
          )}
        </div>
      </div>
      <Button variant="outline" onClick={handleUpdatePaymentMethod}>
        Mettre à jour
      </Button>
    </div>
  );
}; 