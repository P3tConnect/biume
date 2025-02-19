import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCurrentOrganization } from "@/src/actions/organization.action";
import { TeamMembersList } from "./components/team/team-members-list";
import { TeamInviteButton } from "./components/team/team-invite-button";

export const TeamSection = async () => {
  const activeOrganization = await getCurrentOrganization({});

  if (
    activeOrganization?.data?.plan === "NONE" ||
    activeOrganization?.data?.plan === "BASIC"
  ) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Gestion de l&apos;équipe</CardTitle>
          <CardDescription>
            Gérez les membres de votre équipe et leurs rôles
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Vous devez souscrire à un abonnement PRO ou PREMIUM pour gérer votre
            équipe.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Gestion de l&apos;équipe</CardTitle>
          <CardDescription>
            Gérez les membres de votre équipe et leurs rôles
          </CardDescription>
        </div>
        <TeamInviteButton organization={activeOrganization.data!} />
      </CardHeader>
      <CardContent>
        <TeamMembersList organization={activeOrganization.data!} />
      </CardContent>
    </Card>
  );
};
