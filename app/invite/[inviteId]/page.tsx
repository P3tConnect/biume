import { auth } from "@/src/lib/auth";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { headers } from "next/headers";

interface InvitePageProps {
  params: {
    inviteId: string;
  };
}

export default async function InvitePage({ params }: InvitePageProps) {
  const invitation = await auth.api.getInvitation({
    headers: await headers(),
    query: {
      id: params.inviteId,
    }
  });

  if (!invitation) {
    redirect("/404");
  }

  return (
    <div className="container relative flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img src="/logo.png" alt="PawThera" className="h-8" />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              Rejoignez votre équipe sur PawThera et commencez à collaborer efficacement.
            </p>
          </blockquote>
        </div>
      </div>
      <div className="p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Card>
            <CardHeader>
              <CardTitle>Invitation à rejoindre {invitation.organizationName}</CardTitle>
              <CardDescription>
                Vous avez été invité(e) à rejoindre l&apos;organisation en tant que {invitation.role}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form action={async () => {
                "use server";
                await auth.api.acceptInvitation({
                  headers: await headers(),
                  body: {
                    invitationId: params.inviteId,
                  }
                });
                redirect("/dashboard");
              }}>
                <Button type="submit" className="w-full">
                  Accepter l&apos;invitation
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 