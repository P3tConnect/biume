"use client"

import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState } from "react"

import { Card } from "@/components/ui/card"
import { getServicesFromOrganization } from "@/src/actions"

import { ServiceForm } from "./components/services/services-form"
import { ServicesGrid } from "./components/services/services-grid"
import { ServicesHeader } from "./components/services/services-header"

export const ServicesSection = () => {
  const [isCreating, setIsCreating] = useState(false)

  const { data: services, isLoading } = useQuery({
    queryKey: ["organization-services"],
    queryFn: () => getServicesFromOrganization({}),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    )
  }

  const hasServices = services?.data && services.data.length > 0

  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div className="space-y-4">
          {hasServices && <ServicesHeader onCreateNew={() => setIsCreating(true)} />}
          <ServicesGrid services={services?.data || []} onAddFirstService={() => setIsCreating(true)} />
        </div>
      </div>

      <ServiceForm
        service={{
          name: "",
          description: "",
          duration: 30,
          price: 0,
          image: null,
        }}
        open={isCreating}
        onOpenChange={open => setIsCreating(open)}
      />
    </Card>
  )
}
