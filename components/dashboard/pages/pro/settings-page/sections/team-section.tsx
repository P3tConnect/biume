"use client"

import { useQuery } from "@tanstack/react-query"
import React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getCurrentOrganization } from "@/src/actions/organization.action"

import { TeamInviteButton } from "./components/team/team-invite-button"
import { TeamMembersList } from "./components/team/team-members-list"

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
        <CardContent>
          <p>Vous devez souscrire à un abonnement PRO ou PREMIUM pour gérer votre équipe.</p>
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
