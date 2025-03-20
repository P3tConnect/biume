"use client"

import { AnimatePresence, motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ClipboardList, HeartPulse, Pill, Plus, Stethoscope } from "lucide-react"
import { format } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { fr } from "date-fns/locale"
import { useState } from "react"
import { Appointment, Pet, User as UserType } from "@/src/db"
import { useQuery } from "@tanstack/react-query"
import { getAppointmentsByPetId } from "@/src/actions/appointments.action"

interface MedicalTabProps {
  animal: Pet
  nextAppointmentClient: UserType
  nextAppointmentData: Appointment
}

export const MedicalTab = ({ animal, nextAppointmentClient, nextAppointmentData }: MedicalTabProps) => {
  const [expandedRecords, setExpandedRecords] = useState<{
    [key: string]: boolean
  }>({})

  // Utiliser react-query pour récupérer l'historique des rendez-vous
  const { data: appointmentsData, isLoading } = useQuery({
    queryKey: ["pet-appointments", animal.id],
    queryFn: () => getAppointmentsByPetId({ petId: animal.id }),
    enabled: !!animal.id,
  })

  // Fonction pour basculer l'état d'expansion d'un dossier
  const toggleExpand = (recordId: string) => {
    setExpandedRecords(prev => ({
      ...prev,
      [recordId]: !prev[recordId],
    }))
  }

  // Obtenir l'icône en fonction du type de service
  const getServiceIcon = (serviceName: string) => {
    const name = serviceName.toLowerCase()
    if (name.includes("consultation") || name.includes("examen")) {
      return <Stethoscope className="h-4 w-4 text-blue-500" />
    } else if (name.includes("chirurgie") || name.includes("opération")) {
      return <HeartPulse className="h-4 w-4 text-red-500" />
    } else if (name.includes("traitement") || name.includes("médication")) {
      return <Pill className="h-4 w-4 text-amber-500" />
    } else {
      return <ClipboardList className="h-4 w-4 text-slate-500" />
    }
  }

  // Obtenir la couleur de fond en fonction du type de service
  const getServiceBgColor = (serviceName: string) => {
    const name = serviceName.toLowerCase()
    if (name.includes("consultation") || name.includes("examen")) {
      return "bg-blue-100 text-blue-600"
    } else if (name.includes("chirurgie") || name.includes("opération")) {
      return "bg-red-100 text-red-600"
    } else if (name.includes("traitement") || name.includes("médication")) {
      return "bg-amber-100 text-amber-600"
    } else {
      return "bg-slate-100 text-slate-600"
    }
  }

  // État de chargement
  if (isLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-medium">Dossier médical</h3>
            <p className="text-sm text-muted-foreground">Chargement...</p>
          </div>
        </div>
        <Card>
          <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-8">
            <div className="animate-pulse h-10 w-10 rounded-full bg-muted mb-4"></div>
            <div className="animate-pulse h-4 w-36 bg-muted mb-2 rounded-md"></div>
            <div className="animate-pulse h-3 w-48 bg-muted rounded-md"></div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Trier les rendez-vous du plus récent au plus ancien
  const sortedAppointments = [...(appointmentsData?.data || [])]
    .filter((appointment): appointment is NonNullable<typeof appointment> => appointment !== null)
    .sort((a, b) => {
      const dateA = a?.slot?.start ? new Date(a.slot.start).getTime() : a?.beginAt ? new Date(a.beginAt).getTime() : 0
      const dateB = b?.slot?.start ? new Date(b.slot.start).getTime() : b?.beginAt ? new Date(b.beginAt).getTime() : 0
      return dateB - dateA
    })

  return (
    <div className="p-6 space-y-6">
      {/* En-tête avec animation */}
      <motion.div
        className="flex items-center justify-between mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>
          <h3 className="text-lg font-medium">Dossier médical</h3>
          <p className="text-sm text-muted-foreground">Historique des consultations</p>
        </div>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Ajouter
          </Button>
        </motion.div>
      </motion.div>

      {/* Dossiers médicaux avec animations */}
      {!sortedAppointments.length ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardContent className="pt-6 flex flex-col items-center justify-center text-center p-8">
              <motion.div
                className="rounded-full bg-primary/10 p-3 mb-4"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              >
                <HeartPulse className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="font-medium mb-2">Aucun dossier médical</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Aucun historique médical n&apos;a encore été enregistré pour {animal.name}.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {sortedAppointments.map((appointment, index) => {
            if (!appointment) return null

            const isExpanded = expandedRecords[appointment.id] || false
            const serviceName = appointment.service?.name || "Consultation"
            const serviceIcon = getServiceIcon(serviceName)
            const serviceBgColor = getServiceBgColor(serviceName)
            const appointmentDate = appointment.slot?.start
              ? new Date(appointment.slot.start)
              : appointment.beginAt
                ? new Date(appointment.beginAt)
                : new Date()

            return (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="border p-4 rounded-lg hover:shadow-sm transition-shadow duration-200"
              >
                {/* En-tête de la carte */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleExpand(appointment.id)}>
                  <motion.div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${serviceBgColor}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {serviceIcon}
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-medium">{serviceName}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>
                        {appointmentDate.toLocaleDateString("fr-FR", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                  <Badge className="mr-2" variant="outline">
                    {appointment.status}
                  </Badge>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </div>

                {/* Description */}
                <div className="text-sm my-2 text-muted-foreground">
                  {`Rendez-vous de ${serviceName}`}
                </div>

                {/* Contenu extensible */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, overflow: "hidden" }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="border-t pt-3 mt-2">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
                          {/* Détails du rendez-vous */}
                          <div className="rounded-md border p-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
                            <h5 className="text-xs font-medium mb-2">Détails du rendez-vous</h5>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Date :</span>
                              <span>
                                {appointmentDate.toLocaleDateString("fr-FR", {
                                  day: "numeric",
                                  month: "long",
                                  year: "numeric",
                                })}
                              </span>
                            </div>
                            {appointment.service?.duration && (
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Durée :</span>
                                <span>{appointment.service.duration} minutes</span>
                              </div>
                            )}
                            {appointment.slot?.start && appointment.slot?.end && (
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Horaire :</span>
                                <span>
                                  {new Date(appointment.slot.start).toLocaleTimeString("fr-FR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}{" "}
                                  -{" "}
                                  {new Date(appointment.slot.end).toLocaleTimeString("fr-FR", {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">À domicile :</span>
                              <span>{appointment.atHome ? "Oui" : "Non"}</span>
                            </div>
                          </div>

                          {/* Options et prix */}
                          <div className="rounded-md border p-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors duration-200">
                            <h5 className="text-xs font-medium mb-2">Service et options</h5>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-muted-foreground">Service :</span>
                              <span>{serviceName}</span>
                            </div>
                            {appointment.service?.price && (
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Prix de base :</span>
                                <span>{appointment.service.price} €</span>
                              </div>
                            )}
                            {appointment.options && appointment.options.length > 0 && (
                              <div className="mt-2">
                                <span className="text-xs font-medium">Options incluses :</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {appointment.options
                                    .filter((opt): opt is NonNullable<typeof opt> & { option: { title: string } } =>
                                      opt !== null &&
                                      opt.option !== null &&
                                      typeof opt.option === 'object' &&
                                      'title' in opt.option
                                    )
                                    .map((opt, i) => (
                                      <motion.div key={i} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                        <Badge variant="outline" className="text-xs">
                                          {opt.option.title}
                                        </Badge>
                                      </motion.div>
                                    ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </motion.div>
      )}

      {/* Informations importantes simplifiées avec animation */}
      <motion.div
        className="border p-4 rounded-lg"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        whileHover={{ boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
      >
        <h4 className="text-sm font-medium flex items-center gap-2 text-amber-600 mb-2">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            animate={{ rotate: [0, 3, -3, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          >
            <path d="m8 2 1.5 5h5L16 2" />
            <path d="M9.5 7 7 17.5" />
            <path d="M14.5 7 17 17.5" />
            <path d="M3.5 22h17" />
            <path d="M7 17.5h10" />
          </motion.svg>
          Allergies et informations importantes
        </h4>
        {animal.allergies == null || animal.deseases == null || animal.intolerences == null ? (
          <p className="text-sm text-muted-foreground">
            Aucune allergie connue ou information critique n&apos;a été enregistrée pour {animal.name}.
          </p>
        ) : (
          <div className="space-y-2">
            {animal.allergies && (
              <div>
                <h5 className="text-sm font-medium text-amber-600 mb-1">Allergies:</h5>
                <div className="flex flex-wrap gap-1">
                  {animal.allergies.map((allergy, index) => (
                    <Badge key={index}>{allergy}</Badge>
                  ))}
                </div>
              </div>
            )}
            {animal.deseases && (
              <div>
                <h5 className="text-sm font-medium text-amber-600 mb-1">Diseases:</h5>
                <div className="flex flex-wrap gap-1">
                  {animal.deseases.map((disease, index) => (
                    <Badge key={index}>{disease}</Badge>
                  ))}
                </div>
              </div>
            )}
            {animal.intolerences && (
              <div>
                <h5 className="text-sm font-medium text-amber-600 mb-1">Intolerances:</h5>
                <div className="flex flex-wrap gap-1">
                  {animal.intolerences.map((intolerance, index) => (
                    <Badge key={index}>{intolerance}</Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  )
}
