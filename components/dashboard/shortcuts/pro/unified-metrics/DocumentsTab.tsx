"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Shield, ArrowRightCircle } from "lucide-react";
import { AnimalDetails } from "./types";
import { motion } from "framer-motion";

interface DocumentsTabProps {
  animal: AnimalDetails;
}

export const DocumentsTab = ({ animal }: DocumentsTabProps) => {
  // Données de documents
  const documents = [
    {
      type: "Certificat",
      title: "Carnet de vaccination",
      date: "12/04/2023",
      icon: "Shield",
    },
    {
      type: "Ordonnance",
      title: "Traitement infection urinaire",
      date: "03/01/2023",
      icon: "FileText",
    },
    {
      type: "Rapport",
      title: "Analyse sanguine",
      date: "12/04/2023",
      icon: "FileText",
    },
    {
      type: "Certificat",
      title: "Identification puce électronique",
      date: "22/05/2021",
      icon: "Shield",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <motion.div
            initial={{ rotate: -10 }}
            animate={{ rotate: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ rotate: 5, scale: 1.1 }}
          >
            <FileText className="h-6 w-6 text-amber-500" />
          </motion.div>
          <h3 className="text-lg font-medium">Documents</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Documents médicaux et administratifs de {animal.name}.
        </p>
      </motion.div>

      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className="flex gap-2">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" size="sm" className="gap-1">
              Tous
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="gap-1">
              Certificats
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="ghost" size="sm" className="gap-1">
              Ordonnances
            </Button>
          </motion.div>
        </div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.3 }}
        >
          <Button size="sm" className="gap-1">
            <FileText className="h-3.5 w-3.5 mr-1" />
            Ajouter
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {documents.map((doc, index) => (
          <motion.div
            key={index}
            className="border rounded-lg p-4 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            whileHover={{
              backgroundColor: "rgba(0, 0, 0, 0.02)",
              scale: 1.02,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  className="h-8 w-8 rounded-md bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {doc.icon === "Shield" ? (
                    <Shield className="h-4 w-4 text-amber-500" />
                  ) : (
                    <FileText className="h-4 w-4 text-amber-500" />
                  )}
                </motion.div>
                <div>
                  <div className="font-medium">{doc.title}</div>
                  <div className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge
                        variant="outline"
                        className="text-xs px-1 py-0 h-4"
                      >
                        {doc.type}
                      </Badge>
                    </motion.div>
                    <span>•</span>
                    <span>{doc.date}</span>
                  </div>
                </div>
              </div>
              <motion.div
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ duration: 0.2 }}
              >
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ArrowRightCircle className="h-4 w-4" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};
