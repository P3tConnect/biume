"use client"

import { AnimalDetails, MedicalRecord } from "./types"
import { AnimatePresence, motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown, ClipboardList, HeartPulse, Pill, Plus, Stethoscope } from "lucide-react"
import { format, isValid } from "date-fns"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { fr } from "date-fns/locale"
import { useState } from "react"

interface MedicalTabProps {
  animal: AnimalDetails
}

export const MedicalTab = ({ animal }: MedicalTabProps) => {
  const [expandedRecords, setExpandedRecords] = useState<{
    [key: string]: boolean
  }>({})

  // Fonction pour basculer l'état d'expansion d'un dossier
  const toggleExpand = (recordId: string) => {
    setExpandedRecords(prev => ({
      ...prev,
      [recordId]: !prev[recordId],
    }))
  }

  // Données fictives en cas d'absence de dossier médical
  const medicalRecords = animal.medicalRecords || []

  // Trier les dossiers médicaux par date (du plus récent au plus ancien)
  const sortedRecords = [...medicalRecords].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  // Fonction pour formater la date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    if (!isValid(date)) return "Date invalide"

    return format(date, "d MMMM yyyy", { locale: fr })
  }

  // Fonction pour obtenir l'icône et la couleur en fonction du type de consultation
  const getTypeDetails = (type: MedicalRecord["type"]) => {
    switch (type) {
      case "consultation":
        return {
          icon: <Stethoscope className="h-4 w-4" />,
          label: "Consultation",
          color: "text-blue-600 bg-blue-100",
          description: "Examen clinique standard de l'animal",
          commonProcedures: ["Examen physique", "Prise de sang", "Auscultation"],
          duration: "30 minutes",
          followUpNeeded: false,
        }
      case "surgery":
        return {
          icon: <HeartPulse className="h-4 w-4" />,
          label: "Chirurgie",
          color: "text-red-600 bg-red-100",
          description: "Intervention chirurgicale sous anesthésie",
          commonProcedures: ["Stérilisation", "Extraction dentaire", "Excision de masse"],
          duration: "1-3 heures",
          followUpNeeded: true,
          recoveryPeriod: "7-14 jours",
          requiresFasting: true,
        }
      case "hospitalization":
        return {
          icon: <ClipboardList className="h-4 w-4" />,
          label: "Hospitalisation",
          color: "text-purple-600 bg-purple-100",
          description: "Séjour sous surveillance vétérinaire",
          commonReasons: ["Surveillance post-chirurgicale", "Traitement intensif", "Observation"],
          averageDuration: "1-5 jours",
          includesFeeding: true,
          monitoring: "Toutes les 4 heures",
        }
      case "treatment":
        return {
          icon: <Pill className="h-4 w-4" />,
          label: "Traitement",
          color: "text-amber-600 bg-amber-100",
          description: "Administration de médicaments ou soins thérapeutiques",
          commonTypes: ["Antibiotiques", "Anti-inflammatoires", "Pansements"],
          frequency: "Variable selon prescription",
          requiresFollowUp: true,
          atHomeInstructions: "Disponibles selon le traitement",
        }
      default:
        return {
          icon: <ClipboardList className="h-4 w-4" />,
          label: "Autre",
          color: "text-slate-600 bg-slate-100",
          description: "Autre type d'intervention médicale",
        }
    }
  }

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
      {medicalRecords.length === 0 ? (
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
          {sortedRecords.map((record, index) => {
            const typeDetails = getTypeDetails(record.type)
            const isExpanded = expandedRecords[record.id] || false

            return (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="border p-4 rounded-lg hover:shadow-sm transition-shadow duration-200"
              >
                {/* En-tête de la carte */}
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => toggleExpand(record.id)}>
                  <motion.div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${typeDetails.color}`}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {typeDetails.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h4 className="font-medium">{record.diagnosis || typeDetails.label}</h4>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{formatDate(record.date)}</span>
                      <span>•</span>
                      <span>Dr. {record.veterinarian}</span>
                    </div>
                  </div>
                  <Badge className="mr-2">{typeDetails.label}</Badge>
                  <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </motion.div>
                </div>

                {/* Description du type d'intervention - toujours visible */}
                <div className="text-sm my-2 text-muted-foreground">{typeDetails.description}</div>

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
                          {/* Informations spécifiques au type d'intervention */}
                          <div className="rounded-md border p-3 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200">
                            <h5 className="text-xs font-medium mb-2">Détails de l&apos;intervention</h5>
                            {typeDetails.duration && (
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Durée :</span>
                                <span>{typeDetails.duration}</span>
                              </div>
                            )}
                            {typeDetails.averageDuration && (
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Durée moyenne :</span>
                                <span>{typeDetails.averageDuration}</span>
                              </div>
                            )}
                            {typeDetails.recoveryPeriod && (
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Période de récupération :</span>
                                <span>{typeDetails.recoveryPeriod}</span>
                              </div>
                            )}
                            {typeDetails.monitoring && (
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Surveillance :</span>
                                <span>{typeDetails.monitoring}</span>
                              </div>
                            )}
                            {typeDetails.frequency && (
                              <div className="flex justify-between text-xs mb-1">
                                <span className="text-muted-foreground">Fréquence :</span>
                                <span>{typeDetails.frequency}</span>
                              </div>
                            )}
                            {typeDetails.followUpNeeded !== undefined && (
                              <div className="flex justify-between text-xs">
                                <span className="text-muted-foreground">Suivi nécessaire :</span>
                                <span>{typeDetails.followUpNeeded ? "Oui" : "Non"}</span>
                              </div>
                            )}
                          </div>

                          {/* Traitement et symptômes */}
                          <div className="rounded-md border p-3 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors duration-200">
                            {record.treatment && (
                              <div className="mb-2">
                                <span className="text-xs font-medium">Traitement :</span>
                                <p className="text-xs">{record.treatment}</p>
                              </div>
                            )}

                            {record.symptoms && record.symptoms.length > 0 && (
                              <div>
                                <span className="text-xs font-medium">Symptômes :</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {record.symptoms.map((symptom, i) => (
                                    <motion.div key={i} whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                                      <Badge variant="outline" className="text-xs">
                                        {symptom}
                                      </Badge>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Procédures ou types communs */}
                        {(typeDetails.commonProcedures || typeDetails.commonTypes || typeDetails.commonReasons) && (
                          <div className="mb-3">
                            <span className="text-xs font-medium">
                              {typeDetails.commonProcedures
                                ? "Procédures courantes"
                                : typeDetails.commonReasons
                                  ? "Raisons courantes"
                                  : "Types courants"}{" "}
                            </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {(
                                typeDetails.commonProcedures ||
                                typeDetails.commonTypes ||
                                typeDetails.commonReasons ||
                                []
                              ).map((item, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    delay: i * 0.05,
                                    duration: 0.2,
                                  }}
                                >
                                  <Badge variant="secondary" className="text-xs">
                                    {item}
                                  </Badge>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Notes */}
                        {record.notes && (
                          <div className="border-t pt-2 mt-2">
                            <span className="text-xs font-medium">Notes :</span>
                            <p className="text-xs text-muted-foreground mt-1">{record.notes}</p>
                          </div>
                        )}
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
        <p className="text-sm text-muted-foreground">
          Aucune allergie connue ou information critique n&apos;a été enregistrée.
        </p>
      </motion.div>
    </div>
  )
}
