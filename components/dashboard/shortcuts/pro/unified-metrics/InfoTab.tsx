"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  CalendarClock,
  CircleUser,
  Mail,
  Pencil,
  Phone,
  UserCircle2,
  Dog,
  Ruler,
  Gift,
  Weight,
  ChevronRight,
  PawPrint,
  Info,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { ActiveTab } from "./types"
import { Pet, User as UserType } from "@/src/db"
import { formatDistanceToNow } from "date-fns"
import { fr } from "date-fns/locale"

interface InfoTabProps {
  animal: Pet
  setActiveTab: (tab: ActiveTab) => void
  nextAppointmentClient: UserType
}

export const InfoTab = ({ animal, setActiveTab, nextAppointmentClient }: InfoTabProps) => {
  // Formater la date au format lisible
  const formatDate = (date: Date | string | undefined | null) => {
    if (!date) return "Non défini"

    const dateObject = date instanceof Date ? date : new Date(date)

    return dateObject.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
  }

  // Calcul de l'âge basé sur la date de naissance
  const getAge = () => {
    if (!animal.birthDate) return "Âge inconnu"

    return formatDistanceToNow(new Date(animal.birthDate), {
      addSuffix: false,
      locale: fr,
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Détails de l'animal */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <PawPrint className="h-5 w-5 text-primary/70" />
            Détails de l'animal
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Info className="h-4 w-4 text-primary/70" />
                Informations générales
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <motion.div
                className="flex items-center justify-between group rounded-md"
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <PawPrint className="h-3.5 w-3.5 text-primary/80" />
                  </div>
                  <span className="text-sm">Type</span>
                </div>
                <span className="text-sm font-medium">{animal.type || "Non défini"}</span>
              </motion.div>

              <motion.div
                className="flex items-center justify-between group rounded-md"
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Ruler className="h-3.5 w-3.5 text-primary/80" />
                  </div>
                  <span className="text-sm">Race</span>
                </div>
                <span className="text-sm font-medium">{animal.breed || "Non défini"}</span>
              </motion.div>

              <motion.div
                className="flex items-center justify-between group rounded-md"
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <CircleUser className="h-3.5 w-3.5 text-primary/80" />
                  </div>
                  <span className="text-sm">Genre</span>
                </div>
                <span className="text-sm font-medium">{animal.gender === "Male" ? "Mâle" : "Femelle"}</span>
              </motion.div>
            </CardContent>
          </Card>

          <Card className="border shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-primary/70" />
                Âge et poids
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-2">
              <motion.div
                className="flex items-center justify-between group rounded-md"
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Gift className="h-3.5 w-3.5 text-primary/80" />
                  </div>
                  <span className="text-sm">Date de naissance</span>
                </div>
                <span className="text-sm font-medium">{formatDate(animal.birthDate)}</span>
              </motion.div>

              <motion.div
                className="flex items-center justify-between group rounded-md"
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <CalendarClock className="h-3.5 w-3.5 text-primary/80" />
                  </div>
                  <span className="text-sm">Âge</span>
                </div>
                <Badge variant="outline" className="font-normal">
                  {getAge()}
                </Badge>
              </motion.div>

              <motion.div
                className="flex items-center justify-between group rounded-md"
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                    <Weight className="h-3.5 w-3.5 text-primary/80" />
                  </div>
                  <span className="text-sm">Poids</span>
                </div>
                <span className="text-sm font-medium">{animal.weight ? `${animal.weight} kg` : "Non défini"}</span>
              </motion.div>
            </CardContent>
          </Card>
        </div>
      </motion.div>

      {/* Coordonnées du propriétaire */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <UserCircle2 className="h-5 w-5 text-primary/70" />
            Propriétaire
          </h3>
        </div>

        <Card className="border shadow-sm">
          <CardContent className="pt-6 pb-4">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-12 w-12 border-2 border-primary/10">
                <AvatarImage src={nextAppointmentClient?.image || ""} alt={nextAppointmentClient?.name} />
                <AvatarFallback className="text-sm bg-primary/10 text-primary">
                  {nextAppointmentClient?.name?.substring(0, 2).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>

              <div>
                <div className="font-medium">{nextAppointmentClient?.name || "Non renseigné"}</div>
                <div className="text-xs text-muted-foreground">Propriétaire</div>
              </div>
            </div>

            <div className="space-y-3">
              {nextAppointmentClient?.email && (
                <motion.div
                  className="flex items-center justify-between rounded-md group"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mail className="h-3.5 w-3.5 text-primary/80" />
                    </div>
                    <span className="text-sm">Email</span>
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {nextAppointmentClient.email}
                  </span>
                </motion.div>
              )}

              {nextAppointmentClient?.phoneNumber && (
                <motion.div
                  className="flex items-center justify-between rounded-md group"
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-3.5 w-3.5 text-primary/80" />
                    </div>
                    <span className="text-sm">Téléphone</span>
                  </div>
                  <span className="text-sm font-medium group-hover:text-primary transition-colors">
                    {nextAppointmentClient.phoneNumber}
                  </span>
                </motion.div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Accès rapide aux autres onglets */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="justify-between w-full shadow-sm"
            onClick={() => setActiveTab("medical")}
          >
            <span>Dossier médical</span>
            <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground" />
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            variant="outline"
            className="justify-between w-full shadow-sm"
            onClick={() => setActiveTab("appointments")}
          >
            <span>Rendez-vous</span>
            <ChevronRight className="h-4 w-4 ml-2 text-muted-foreground" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}
