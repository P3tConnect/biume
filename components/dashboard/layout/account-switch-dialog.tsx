"use client";

import React, { useState, useEffect } from "react";
import { User, Building2, Loader2, Check } from "lucide-react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { cn } from "@/src/lib/utils";

interface AccountSwitchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "personal" | "professional";
  organizationName?: string;
  isLoading: boolean;
}

export function AccountSwitchDialog({
  open,
  onOpenChange,
  type,
  organizationName,
  isLoading,
}: AccountSwitchDialogProps) {
  // Auto-fermeture après un délai si le chargement est terminé
  useEffect(() => {
    if (open && !isLoading) {
      const timer = setTimeout(() => {
        onOpenChange(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [open, isLoading, onOpenChange]);

  // Déterminer les styles et textes en fonction du type
  const isProfessional = type === "professional";

  // Couleurs plus douces
  const bgColor = isProfessional
    ? "bg-primary/30 dark:bg-primary-900/30"
    : "bg-secondary/30 dark:bg-secondary-900/30";
  const borderColor = isProfessional
    ? "border-primary/50"
    : "border-secondary/50";
  const iconColor = isProfessional ? "text-primary" : "text-secondary";
  const iconBgColor = isProfessional
    ? "bg-primary/30 dark:bg-primary-900/30"
    : "bg-secondary/30 dark:bg-secondary-900/30";

  // Textes plus amicaux
  const title = isProfessional
    ? `${organizationName || "Espace pro"}`
    : "Espace personnel";

  // Messages plus sympas selon l'état
  const loadingMessage = isProfessional
    ? `En route vers votre espace professionnel...`
    : `Accès à votre espace personnel en cours...`;

  const successMessage = isProfessional
    ? "Bienvenue dans votre espace professionnel !"
    : "Bienvenue dans votre espace personnel !";

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={cn(
          "border p-4 max-w-sm shadow-md rounded-xl",
          borderColor,
          bgColor,
        )}
      >
        <div className="flex items-center gap-4">
          <div
            className={cn("rounded-full p-2 border", iconBgColor, borderColor)}
          >
            {isLoading ? (
              <Loader2 className={cn("h-6 w-6 animate-spin", iconColor)} />
            ) : isProfessional ? (
              <Building2 className={cn("h-6 w-6", iconColor)} />
            ) : (
              <User className={cn("h-6 w-6", iconColor)} />
            )}
          </div>
          <div className="flex-1">
            <AlertDialogTitle className="text-base font-semibold mb-1">
              {isLoading
                ? isProfessional
                  ? `Passage à ${organizationName || "l'espace pro"}`
                  : "Passage à l'espace personnel"
                : title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm opacity-90">
              {isLoading ? loadingMessage : successMessage}
            </AlertDialogDescription>
          </div>
          {!isLoading && (
            <div
              className={cn(
                "rounded-full p-1",
                isProfessional ? "bg-primary" : "bg-secondary",
              )}
            >
              <Check className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
