"use client";

import { ActiveTab, AnimalDetails } from "./types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Pencil,
  ArrowRight,
  Weight,
  CalendarClock,
  CircleDot,
  QrCode,
  UserCircle2,
  Mail,
  Phone,
  HeartPulse,
  FileText,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface InfoTabProps {
  animal: AnimalDetails;
  setActiveTab: (tab: ActiveTab) => void;
}

export const InfoTab = ({ animal, setActiveTab }: InfoTabProps) => {
  // Formater la date au format lisible
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "Non défini";

    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Informations principales */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Informations principales</h3>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="sm" variant="outline">
              <Pencil className="h-3.5 w-3.5 mr-1.5" />
              Modifier
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Informations générales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.div
                  className="flex justify-between"
                  whileHover={{
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    scale: 1.01,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CalendarClock className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                    <span className="text-sm font-medium">
                      Date de naissance
                    </span>
                  </div>
                  <span className="text-sm">
                    {formatDate(animal.birthDate)}
                  </span>
                </motion.div>

                <motion.div
                  className="flex justify-between"
                  whileHover={{
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    scale: 1.01,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Weight className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                    <span className="text-sm font-medium">Poids</span>
                  </div>
                  <span className="text-sm">
                    {animal.weight ? `${animal.weight} kg` : "Non renseigné"}
                  </span>
                </motion.div>

                <motion.div
                  className="flex justify-between"
                  whileHover={{
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    scale: 1.01,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CircleDot className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                    <span className="text-sm font-medium">Couleur</span>
                  </div>
                  <span className="text-sm">
                    {animal.color || "Non renseigné"}
                  </span>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Informations médicales
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <motion.div
                  className="flex justify-between"
                  whileHover={{
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    scale: 1.01,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <QrCode className="h-4 w-4 text-muted-foreground" />
                    </motion.div>
                    <span className="text-sm font-medium">Numéro de puce</span>
                  </div>
                  <span className="text-sm">
                    {animal.microchipNumber || "Non pucé"}
                  </span>
                </motion.div>

                <motion.div
                  className="flex justify-between"
                  whileHover={{
                    backgroundColor: "rgba(0, 0, 0, 0.02)",
                    scale: 1.01,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4 text-muted-foreground"
                      >
                        <path d="M12 22s8-4 8-10V7l-8-5-8 5v5c0 6 8 10 8 10" />
                        <path d="M8 11h8" />
                      </svg>
                    </motion.div>
                    <span className="text-sm font-medium">Stérilisé(e)</span>
                  </div>
                  <span className="text-sm">
                    {animal.sterilized ? "Oui" : "Non"}
                  </span>
                </motion.div>

                {animal.sterilized && (
                  <motion.div
                    className="flex justify-between"
                    whileHover={{
                      backgroundColor: "rgba(0, 0, 0, 0.02)",
                      scale: 1.01,
                    }}
                    transition={{ duration: 0.2 }}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                  >
                    <div className="flex items-center gap-2">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CalendarClock className="h-4 w-4 text-muted-foreground" />
                      </motion.div>
                      <span className="text-sm font-medium">
                        Date de stérilisation
                      </span>
                    </div>
                    <span className="text-sm">
                      {formatDate(animal.sterilizationDate)}
                    </span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
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
          <h3 className="text-lg font-medium">Propriétaire</h3>
        </div>

        <Card>
          <CardContent className="pt-6 space-y-3">
            <motion.div
              className="flex justify-between"
              whileHover={{
                backgroundColor: "rgba(0, 0, 0, 0.02)",
                scale: 1.01,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <UserCircle2 className="h-4 w-4 text-muted-foreground" />
                </motion.div>
                <span className="text-sm font-medium">Nom</span>
              </div>
              <span className="text-sm">{animal.ownerName}</span>
            </motion.div>

            <motion.div
              className="flex justify-between"
              whileHover={{
                backgroundColor: "rgba(0, 0, 0, 0.02)",
                scale: 1.01,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </motion.div>
                <span className="text-sm font-medium">Email</span>
              </div>
              <span className="text-sm">
                {animal.ownerContact.includes("@")
                  ? animal.ownerContact
                  : "Non renseigné"}
              </span>
            </motion.div>

            <motion.div
              className="flex justify-between"
              whileHover={{
                backgroundColor: "rgba(0, 0, 0, 0.02)",
                scale: 1.01,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="flex items-center gap-2">
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Phone className="h-4 w-4 text-muted-foreground" />
                </motion.div>
                <span className="text-sm font-medium">Téléphone</span>
              </div>
              <span className="text-sm">
                {!animal.ownerContact.includes("@")
                  ? animal.ownerContact
                  : "Non renseigné"}
              </span>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notes et accès rapide aux autres onglets */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <h3 className="text-lg font-medium">Notes</h3>

        <Card>
          <CardContent className="pt-6">
            <p className="text-sm">
              {animal.notes || "Aucune note disponible pour cet animal."}
            </p>
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
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            variant="outline"
            className="justify-between w-full"
            onClick={() => setActiveTab("medical")}
          >
            <span>Dossier médical</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <ArrowRight className="h-4 w-4 ml-2" />
            </motion.div>
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button
            variant="outline"
            className="justify-between w-full"
            onClick={() => setActiveTab("appointments")}
          >
            <span>Rendez-vous</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <ArrowRight className="h-4 w-4 ml-2" />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};
