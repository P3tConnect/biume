"use client"

import { useQuery } from "@tanstack/react-query"
import React from "react"
import { AlertCircle } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentOrganization } from "@/src/actions/organization.action"

import { TeamInviteButton } from "./components/team/team-invite-button"
import { TeamMembersList } from "./components/team/team-members-list"
import { Button } from "@/components/ui"

export const TeamSection = () => {
  const { data: activeOrganization, isLoading } = useQuery({
    queryKey: ["active-organization"],
    queryFn: () => getCurrentOrganization({}),
  })

  if (activeOrganization?.data?.plan === "NONE" || activeOrganization?.data?.plan === "BASIC") {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gestion de l&apos;équipe</CardTitle>
          <CardDescription>Gérez les membres de votre équipe et leurs rôles</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center">
          <AlertCircle className="text-red-500 mb-2" size={48} />
          <p className="text-lg font-semibold text-red-500 mb-4">
            Vous devez souscrire à un abonnement PRO ou PREMIUM pour gérer votre équipe.
          </p>
          <Button className="px-4 py-2 rounded-xl">Souscrire maintenant</Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gestion de l&apos;équipe</CardTitle>
          <CardDescription>Gérez les membres de votre équipe et leurs rôles</CardDescription>
        </div>
        {isLoading ? <Skeleton className="h-10 w-10" /> : <TeamInviteButton organization={activeOrganization?.data!} />}
      </CardHeader>
      <CardContent>
        {isLoading ? <Skeleton className="h-10 w-10" /> : <TeamMembersList organization={activeOrganization?.data!} />}
      </CardContent>
    </Card>
  )
}
