"use client"

import { CalendarDays, ChevronRight, Clock, MapPin, User2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Separator,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui"
import { useSession } from "@/src/lib/auth-client"
import { Appointment } from "@/src/db"
import { useQuery } from "@tanstack/react-query"
import { getAllAppointmentForClient } from "@/src/actions/appointments.action"

const ClientUpcomingAppointmentsWidget = () => {
  const router = useRouter()
  const { data: session } = useSession()
  const userId = session?.user?.id
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  const { data: appointments } = useQuery({
    queryKey: ["client-appointments"],
    queryFn: () => getAllAppointmentForClient({}),
  })

  return (
    <>
      <Card className="rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="size-5" />
            Prochains rendez-vous
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={() => router.push(`/dashboard/user/${userId}/timetable`)}>
            Voir tout
            <ChevronRight className="size-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[300px] overflow-y-auto hide-scrollbar">
            {appointments?.data?.map(appointment => (
              <div
                key={appointment.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                onClick={() => setSelectedAppointment(appointment)}
              >
                <Avatar className="size-12 border-2 border-background">
                  <AvatarImage src={appointment.pet.image || ""} alt={appointment.pet.name} />
                  <AvatarFallback>{appointment.pet.name[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{appointment.service.name}</h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger onClick={e => e.stopPropagation()}>
                          <Badge
                            variant={appointment.status === "CONFIRMED" ? "default" : "secondary"}
                            className="shrink-0"
                          >
                            {appointment.status === "CONFIRMED" ? "Confirmé" : "En attente"}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <div className="text-xs">
                            {appointment.status === "CONFIRMED" ? "Rendez-vous confirmé" : "En attente de confirmation"}
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>

                  <div className="flex gap-3 mt-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="size-3" />
                      <span className="truncate">
                        {appointment.slot.start.toLocaleString("fr-FR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User2 className="size-3" />
                      <span className="truncate">{appointment.pro.name}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {appointments?.data?.length === 0 && (
              <div className="text-center py-4 text-sm text-muted-foreground">
                <p>Aucun rendez-vous à venir</p>
                <Button
                  variant="link"
                  size="sm"
                  className="mt-1"
                  onClick={() => router.push(`/dashboard/user/${userId}/reservations`)}
                >
                  Prendre un rendez-vous
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Sheet open={!!selectedAppointment} onOpenChange={() => setSelectedAppointment(null)}>
        <SheetContent className="overflow-y-auto">
          {selectedAppointment && (
            <>
              <SheetHeader className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="size-16 border-2 border-background">
                    <AvatarImage src={selectedAppointment.pet.image || ""} alt={selectedAppointment.pet.name} />
                    <AvatarFallback>{selectedAppointment.pet.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <SheetTitle>{selectedAppointment.service.name}</SheetTitle>
                    <SheetDescription>Pour {selectedAppointment.pet.name}</SheetDescription>
                  </div>
                </div>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Détails du rendez-vous</h4>
                  <div className="grid gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="size-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">
                          {selectedAppointment.slot.start.toLocaleString("fr-FR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Lieu</p>
                        <p className="text-muted-foreground">{selectedAppointment.pro.address.postalAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Professionnel</h4>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-12">
                      <AvatarImage src={selectedAppointment.pro.logo || ""} alt={selectedAppointment.pro.name} />
                      <AvatarFallback>{selectedAppointment.pro.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{selectedAppointment.pro.name}</p>
                      <p className="text-sm text-muted-foreground">{selectedAppointment.pro.description}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center">
                  <Badge
                    variant={selectedAppointment.status === "CONFIRMED" ? "default" : "secondary"}
                    className="text-sm"
                  >
                    {selectedAppointment.status === "CONFIRMED" ? "Rendez-vous confirmé" : "En attente de confirmation"}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/dashboard/user/${userId}/appointments/${selectedAppointment.id}`)}
                  >
                    Gérer le rendez-vous
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  )
}

export default ClientUpcomingAppointmentsWidget
