"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Organization } from "@/src/db/organization"
import { updateOrganization } from "@/src/actions/organization.action"
import { Sparkles } from "lucide-react"

interface ProfileOnDemandSectionProps {
  org: Organization | undefined
}

export const ProfileOnDemandSection = ({ org }: ProfileOnDemandSectionProps) => {
  const queryClient = useQueryClient()

  const { mutate: updateOnDemand } = useMutation({
    mutationFn: async (onDemand: boolean) => {
      if (!org) return

      return await updateOrganization({
        name: org.name,
        email: org.email as string,
        address: org.address.id,
        description: org.description as string,
        openAt: org.openAt?.toString() ?? "",
        closeAt: org.closeAt?.toString() ?? "",
        atHome: org.atHome,
        nac: org.nac as string,
        siren: org.siren as string,
        siret: org.siret as string,
        onDemand,
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization-profile"] })
      toast.success("Les paramètres de rendez-vous à la demande ont été mis à jour")
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la mise à jour des paramètres")
    },
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Rendez-vous à la demande</CardTitle>
          <Sparkles className="h-5 w-5 text-blue-500" />
        </div>
        <CardDescription className="space-y-2">
          <p className="text-blue-500">
            Biume AI va analyser les données de votre agenda pour proposer les meilleurs créneaux disponibles à vos
            clients.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4">
          <Switch checked={org?.onDemand} onCheckedChange={checked => updateOnDemand(checked)} />
          <div className="flex flex-col gap-1">
            <span>
              {org?.onDemand
                ? "Les rendez-vous à la demande sont activés"
                : "Les rendez-vous à la demande sont désactivés"}
            </span>
            {org?.onDemand && (
              <span className="text-sm text-muted-foreground">
                Biume AI est à votre service pour gérer vos demandes de rendez-vous
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
