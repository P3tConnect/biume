"use client"

import { useQuery } from "@tanstack/react-query"
import { Search, User } from "lucide-react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"
import { ClientItem, type Client } from "./client-item"
import { ClientDialog } from "./client-dialog"
import { getClients } from "@/src/actions/client.action"

export default function ClientsList() {
  const [search, setSearch] = useState("")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { data: clients, isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients({}),
  })

  const transformUserToClient = (user: any): Client => ({
    ...user,
    lastVisit: user.lastVisit || user.updatedAt,
    appointmentsCount: user.appointments?.length || 0,
    petsCount: user.pets?.length || 0,
    loyaltyPoints: 0, // À implémenter selon la logique métier
  })

  const filteredClients = clients?.data
    ?.map(transformUserToClient)
    ?.filter(
      client =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        (client.email && client.email.toLowerCase().includes(search.toLowerCase())) ||
        (client.phoneNumber && client.phoneNumber.includes(search))
    )

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Skeleton className="h-10 w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[120px] w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (!clients?.data?.length) {
    return (
      <Card className="border shadow-sm p-8">
        <div className="text-center text-muted-foreground">
          <User className="h-12 w-12 mx-auto mb-3 opacity-20" />
          <p className="mb-2">Aucun client trouvé</p>
          <p className="text-sm max-w-md mx-auto mb-4">Vos clients apparaîtront ici une fois ajoutés.</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-2 dark:space-y-3">
      <div className="relative mx-2">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher un client..."
          className="pl-9"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <ScrollArea className="h-[calc(100vh-300px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pl-2 pb-4">
          {filteredClients?.map(client => (
            <ClientItem
              key={client.id}
              client={client}
              onClick={() => {
                setSelectedClient(client)
                setIsDialogOpen(true)
              }}
            />
          ))}
        </div>
      </ScrollArea>

      <ClientDialog client={selectedClient} isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </div>
  )
}
