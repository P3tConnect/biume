"use client"

import { useQuery } from "@tanstack/react-query"
import { Loader2 } from "lucide-react"
import { useState } from "react"

import { Card } from "@/components/ui/card"
import { getOptionsFromOrganization } from "@/src/actions"

import { OptionForm } from "./components/options/option-form"
import { OptionsGrid } from "./components/options/options-grid"
import { OptionsHeader } from "./components/options/options-header"
import { useActiveOrganization } from "@/src/lib/auth-client"

export const OptionsSection = () => {
  const [isCreating, setIsCreating] = useState(false)
  const { data: activeOrganization } = useActiveOrganization()

  const { data: options, isLoading } = useQuery({
    queryKey: ["organization-options"],
    queryFn: () => getOptionsFromOrganization({ organizationId: activeOrganization?.id || "" }),
  })

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    )
  }

  const hasOptions = options?.data && options.data.length > 0

  return (
    <Card className="p-6">
      <div className="space-y-8">
        <div className="space-y-4">
          {hasOptions && <OptionsHeader onCreateNew={() => setIsCreating(true)} />}
          <OptionsGrid options={options?.data || []} onAddFirstOption={() => setIsCreating(true)} />
        </div>
      </div>

      <OptionForm
        option={{
          title: "",
          description: null,
          price: 0,
        }}
        open={isCreating}
        onOpenChange={open => setIsCreating(open)}
      />
    </Card>
  )
}
