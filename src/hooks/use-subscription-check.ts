"use client"

import { useEffect, useState } from 'react'
import { getCurrentOrganizationPlan } from '@/src/actions'

export const useSubscriptionCheck = () => {
  const [shouldShowAlert, setShouldShowAlert] = useState(false)
  const [organizationId, setOrganizationId] = useState<string | null>(null)

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const { data: activeOrganization } = await getCurrentOrganizationPlan({})
        if (activeOrganization?.plan === "NONE" && activeOrganization?.subscription.status === "active") {
          setShouldShowAlert(true)
          if (activeOrganization.id) {
            setOrganizationId(activeOrganization.id)
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'abonnement:", error)
      }
    }

    checkSubscription()
  }, [])

  return { shouldShowAlert, organizationId }
} 