"use client"

import { CalendarDays, CheckIcon, ChevronRightIcon } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import React from "react"
import { useQuery } from "@tanstack/react-query"
import { getPendingAndPayedAppointments } from "@/src/actions/appointments.action"
import { AppointmentRequestItem } from "./appointment-request-item"
import { Appointment } from "@/src/db"

export const AppointmentRequests = () => {
  const { data: appointments, isLoading: isLoadingAppointments } = useQuery({
    queryKey: ["pending-and-payed-appointments"],
    queryFn: () => getPendingAndPayedAppointments({}),
  })

  if (isLoadingAppointments) {
    return (
      <Card className="overflow-hidden border border-border">
        <CardHeader className="py-3 px-4 flex flex-row items-center justify-between bg-gradient-to-r from-green-50 to-white dark:from-green-950/30 dark:to-slate-900">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md">
              <CalendarDays className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-lg">Demandes de rendez-vous</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-center py-8">
            <div className="w-10 h-10 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden border border-border">
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between bg-gradient-to-r from-green-50 to-white dark:from-green-950/30 dark:to-slate-900">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md">
            <CalendarDays className="h-4 w-4 text-green-600 dark:text-green-400" />
          </div>
          <CardTitle className="text-lg">Demandes de rendez-vous</CardTitle>
        </div>
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/70">
          {appointments?.data?.length}
        </Badge>
      </CardHeader>

      <CardContent className="p-4 max-h-[360px] overflow-auto rounded-lg border">
        <div className="grid grid-cols-1 gap-3">
          {appointments?.data?.map(appointment => (
            <React.Fragment key={appointment.id}>
              <AppointmentRequestItem appointment={appointment as Appointment} />
            </React.Fragment>
          ))}

          {appointments?.data?.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mb-3">
                <CheckIcon className="h-6 w-6" />
              </div>
              <p className="text-lg font-medium mb-1">Aucune demande en attente</p>
              <p className="text-sm text-muted-foreground">Toutes les demandes ont été traitées</p>
            </div>
          )}
        </div>
      </CardContent>

      {appointments?.data?.length! > 0 && (
        <CardFooter className="py-3 px-4 border-t bg-green-50/50 dark:bg-green-900/10">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs flex items-center justify-center gap-1.5 text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30"
          >
            <span>Voir toutes les demandes</span>
            <ChevronRightIcon className="h-3.5 w-3.5" />
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
