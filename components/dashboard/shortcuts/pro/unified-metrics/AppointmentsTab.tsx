"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileClock, Calendar, CheckCircle2 } from "lucide-react";
import { AnimalDetails } from "./types";
import { motion } from "framer-motion";

interface AppointmentsTabProps {
  animal: AnimalDetails;
}

export const AppointmentsTab = ({ animal }: AppointmentsTabProps) => {
  // Données des rendez-vous
  const appointments = [
    {
      date: "12/04/2023",
      title: "Consultation de routine",
      time: "10:30",
      doctor: "Dr. Martinez",
      status: "Terminé",
    },
    {
      date: "03/01/2023",
      title: "Traitement infection",
      time: "15:00",
      doctor: "Dr. Lopez",
      status: "Terminé",
    },
    {
      date: "15/09/2022",
      title: "Contrôle dentaire",
      time: "11:45",
      doctor: "Dr. Martinez",
      status: "Terminé",
    },
  ];

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
          <p className="text-sm text-muted-foreground">
            Historique des consultations
          </p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="sm" className="gap-1">
            <Calendar className="h-3.5 w-3.5 mr-1" />
            Nouveau
          </Button>
        </motion.div>
      </motion.div>

      {/* Prochain rendez-vous */}
      {animal.nextVisit && (
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
                <div className="font-medium">Vaccination annuelle</div>
                <div className="text-sm text-muted-foreground">
                  {animal.nextVisit} à 14:30 • Dr. Martinez
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
          {appointments.map((appointment, index) => (
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
                <div className="font-medium">{appointment.title}</div>
                <div className="text-xs text-muted-foreground">
                  {appointment.date} • {appointment.doctor}
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Badge variant="outline">{appointment.time}</Badge>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
