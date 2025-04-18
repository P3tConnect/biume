"use client"

import { Calendar, PawPrint, Plus, Star, UserPlus, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useSession } from "@/src/lib/auth-client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getPreviousPros } from "@/src/actions/appointments.action"
import { Organization } from "@/src/db"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"

const PreviousProsList = ({ userId, onSelect }: { userId: string; onSelect: (proId: string) => void }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["previous-pros", userId],
    queryFn: async () => {
      const result = await getPreviousPros({ userId })
      if ("error" in result) {
        throw new Error(result.error)
      }
      return result.data as Organization[]
    },
  })

  if (isLoading) {
    return <div className="p-4 text-center">Chargement...</div>
  }

  if (!data?.length) {
    return <div className="p-4 text-center">Aucun professionnel trouvé</div>
  }

  return (
    <div className="grid gap-4 py-4">
      {data.map(organization => (
        <Button
          key={organization.id}
          variant="outline"
          className="flex items-center gap-4 h-auto p-4 w-full"
          onClick={() => onSelect(organization.id)}
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={organization.logo || ""} />
            <AvatarFallback>{organization.name?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="font-medium">{organization.name}</span>
            {organization.nac && <span className="text-sm text-muted-foreground">{organization.nac}</span>}
          </div>
        </Button>
      ))}
    </div>
  )
}

const BookingDialog = ({ userId }: { userId: string }) => {
  const router = useRouter()
  const [showPreviousPros, setShowPreviousPros] = useState(false)

  const handleProSelect = (proId: string) => {
    setShowPreviousPros(false)
    router.push(`/pros/${proId}/booking`)
  }

  return (
    <>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nouvelle réservation</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="flex flex-col items-center gap-4 h-auto p-6"
            onClick={() => setShowPreviousPros(true)}
          >
            <Users className="h-8 w-8 text-blue-500" />
            <span className="text-sm">Reprendre rendez-vous</span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center gap-4 h-auto p-6"
            onClick={() => router.push("/pros")}
          >
            <UserPlus className="h-8 w-8 text-orange-500" />
            <span className="text-sm">Nouveau rendez-vous</span>
          </Button>
        </div>
      </DialogContent>

      <Sheet open={showPreviousPros} onOpenChange={setShowPreviousPros}>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Mes professionnels</SheetTitle>
          </SheetHeader>
          <PreviousProsList userId={userId} onSelect={handleProSelect} />
        </SheetContent>
      </Sheet>
    </>
  )
}

const ClientQuickActionsWidget = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const userId = session?.user?.id

  const quickActions = [
    {
      title: "Nouvelle réservation",
      icon: Plus,
      color: "bg-blue-500/10 text-blue-500",
      component: (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="h-auto py-4 flex flex-col items-center gap-3 hover:bg-accent/50 transition-colors w-full"
            >
              <div className={`p-3 rounded-xl bg-blue-500/10 text-blue-500`}>
                <Plus className="size-5" />
              </div>
              <span className="text-sm font-medium">Nouvelle réservation</span>
            </Button>
          </DialogTrigger>
          <BookingDialog userId={userId || ""} />
        </Dialog>
      ),
    },
    {
      title: "Mes rendez-vous",
      icon: Calendar,
      color: "bg-purple-500/10 text-purple-500",
      onClick: () => router.push(`/dashboard/user/${userId}/reservations`),
    },
    {
      title: "Mes favoris",
      icon: Star,
      color: "bg-yellow-500/10 text-yellow-500",
      onClick: () => router.push(`/dashboard/user/${userId}/favorites`),
    },
  ]

  return (
    <Card className="rounded-xl">
      <CardHeader>
        <CardTitle>Actions rapides</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) =>
            action.component ? (
              <div key={index}>{action.component}</div>
            ) : (
              <Button
                key={index}
                variant="ghost"
                className="h-auto py-4 flex flex-col items-center gap-3 hover:bg-accent/50 transition-colors"
                onClick={action.onClick}
              >
                <div className={`p-3 rounded-xl ${action.color}`}>
                  <action.icon className="size-5" />
                </div>
                <span className="text-sm font-medium">{action.title}</span>
              </Button>
            )
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default ClientQuickActionsWidget
