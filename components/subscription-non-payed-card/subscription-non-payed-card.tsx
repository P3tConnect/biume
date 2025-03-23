"use client"

import React from "react"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
} from "../ui/alert-dialog"
import { Button } from "../ui/button"
import Link from "next/link"

interface SubscriptionNonPayedAlertProps {
  organizationId: string
}

const SubscriptionNonPayedAlert: React.FC<SubscriptionNonPayedAlertProps> = ({ organizationId }) => {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Abonnement non payé</AlertDialogTitle>
          <AlertDialogDescription>
            Votre abonnement n&apos;est pas à jour. Pour continuer à utiliser tous les services de Biume, veuillez
            mettre à jour votre abonnement.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button asChild>
            <Link href={`/dashboard/organization/${organizationId}/settings?tab=billing`}>
              Mettre à jour l&apos;abonnement
            </Link>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default SubscriptionNonPayedAlert
