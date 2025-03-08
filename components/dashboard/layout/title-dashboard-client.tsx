"use client"

import { Card, CardHeader, CardTitle } from "@/components/ui"
import { useSession } from "@/src/lib/auth-client"

const TitleDashboardClient = () => {
  const { data: session } = useSession()

  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Bonjour, {session?.user.name}
          </span>
          <span className="text-3xl">👋</span>
        </CardTitle>
        <p className="text-sm text-gray-400 mt-2">
          Gérez vos animaux de compagnie et vos réservations en toute simplicité
        </p>
      </CardHeader>
    </Card>
  )
}

export default TitleDashboardClient
