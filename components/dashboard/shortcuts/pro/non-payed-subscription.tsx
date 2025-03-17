import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import Link from "next/link"
import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { getCurrentOrganization, getCurrentOrganizationPlan } from "@/src/actions"

export default async function NonPayedSubscription() {
  const { data: activeOrganization } = await getCurrentOrganizationPlan({});

  if (activeOrganization?.plan !== "NONE" || activeOrganization?.subscription.status !== "active") {
    return null;
  }

  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ExclamationTriangleIcon className="h-5 w-5 text-destructive" />
          Abonnement non payé
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>
          Votre abonnement n&apos;est pas à jour. Pour continuer à utiliser tous les services de Biume,
          veuillez mettre à jour votre abonnement.
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/dashboard/organization/${activeOrganization?.id}/settings?tab=billing`}>
          <Button variant="default">Mettre à jour l&apos;abonnement</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
