"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Organization } from "@/src/db/organization"
import { updateOrganizationOnDemand } from "@/src/actions/organization.action"
import { BrainCircuit, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BetaBadge } from "@/components/common/beta-badge"

interface ProfileOnDemandSectionProps {
  org: Organization | undefined
}

export const ProfileOnDemandSection = ({ org }: ProfileOnDemandSectionProps) => {
  const queryClient = useQueryClient()

  const { mutate: updateOnDemand } = useMutation({
    mutationFn: (onDemand: boolean) => updateOrganizationOnDemand({ onDemand }),
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
          <BrainCircuit className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Rendez-vous à la demande</CardTitle>
          <BetaBadge />
        </div>
        <CardDescription>
          Biume AI va analyser les données de votre agenda pour proposer les meilleurs créneaux disponibles à vos
          clients.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Switch checked={org?.onDemand} onCheckedChange={checked => updateOnDemand(checked)} />
            <span className="text-sm text-muted-foreground">{org?.onDemand ? "Activé" : "Désactivé"}</span>
          </div>
          {org?.plan === "BASIC" && org?.onDemand && (
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/pro/billing">Passer au Pro</Link>
            </Button>
          )}
        </div>
        {org?.plan === "BASIC" && org?.onDemand && (
          <p className="text-xs text-muted-foreground mt-2">0,06€ par requête sur le plan Basic</p>
        )}
      </CardContent>
    </Card>
  )
}
