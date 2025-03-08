import { useQuery } from "@tanstack/react-query"
import React from "react"

import { Card, CardContent, CardHeader, CardTitle, Skeleton } from "@/components/ui"
import { getOrganizationSlots } from "@/src/actions/organizationSlots.action"

import SlotsSectionClient from "./components/slots/slots-section-client"

const SlotsSection = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["organization-slots"],
    queryFn: () => getOrganizationSlots({}),
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle>Créneaux disponibles</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Gérez vos créneaux horaires et leur disponibilité</p>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : (
          <SlotsSectionClient slots={data?.data || []} />
        )}
      </CardContent>
    </Card>
  )
}

export default SlotsSection
