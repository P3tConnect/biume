"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { Pet, User as UserType, Appointment } from "@/src/db"
import { useQuery } from "@tanstack/react-query"
import { getAppointmentsByPetId } from "@/src/actions/appointments.action"
import { format } from "date-fns"

interface AppointmentsTabProps {
  animal: Pet
  nextAppointmentClient: UserType
  nextAppointmentData: Appointment
}

export const AppointmentsTab = ({ animal, nextAppointmentClient, nextAppointmentData }: AppointmentsTabProps) => {
  const { data: appointments } = useQuery({
    queryKey: ["appointments", animal.id],
    queryFn: () => getAppointmentsByPetId({ petId: animal.id }),
  })

  return (
    <div className="p-6 space-y-6">
      <motion.div
        className="mb-4 flex justify-between items-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h3 className="text-lg font-medium">Rendez-vous</h3>
          <p className="text-sm text-muted-foreground">Historique des consultations</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="sm" className="gap-1">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Nouveau
          </Button>
        </motion.div>
      </motion.div>

      {/* Prochain rendez-vous */}
      {nextAppointmentData && (
        <motion.div
          className="rounded-lg border overflow-hidden mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          whileHover={{
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.05)",
            scale: 1.01,
          }}
        >
          <div className="bg-indigo-50 dark:bg-indigo-950/40 p-3 border-b">
            <h4 className="font-medium">Prochain rendez-vous</h4>
          </div>
          <div className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{
                  rotate: [0, 0, 0, 0, 0, -10, 10, -10, 10, 0],
                  scale: [1, 1, 1, 1, 1, 1.1, 1.1, 1.1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 5,
                }}
              >
                <Calendar className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              </motion.div>
              <div>
                <div className="font-medium">{nextAppointmentData.service.name}</div>
                <div className="text-sm text-muted-foreground">
                  {nextAppointmentData.beginAt
                    ? format(nextAppointmentData.beginAt, "dd/MM/yyyy")
                    : nextAppointmentData.slot.start.toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                </div>
              </div>
            </div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm">
                Modifier
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Historique simplifié */}
      <motion.div
        className="space-y-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h4 className="text-sm font-medium mb-2">Historique</h4>
        <div className="space-y-2">
          {appointments?.data?.map((appointment, index) => (
            <motion.div
              key={index}
              className="p-3 border rounded-md flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
              whileHover={{
                backgroundColor: "rgba(0, 0, 0, 0.02)",
                scale: 1.01,
                boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              }}
            >
              <div>
                <div className="font-medium">{appointment?.service.name}</div>
                <div className="text-xs text-muted-foreground">
                  {appointment?.beginAt
                    ? format(appointment?.beginAt, "dd/MM/yyyy")
                    : appointment?.slot?.start.toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  • {appointment?.pro?.name}
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.2 }}>
                <Badge variant="outline">
                  {appointment?.beginAt
                    ? format(appointment?.beginAt, "dd/MM/yyyy")
                    : appointment?.slot?.start.toLocaleDateString("fr-FR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                </Badge>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
