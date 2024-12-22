"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import ClientNotificationForm from "../components/client/notification-form";
import { cn } from "@/src/lib";

const ClientNotificationStep = () => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={cn(!isOpen ? "hidden" : "block")}>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choisissez votre type de notification</DialogTitle>
            <DialogDescription>
              Choisissez votre type de notification pour recevoir les alertes
              liées à vos rendez-vous / activités ou autres informations
              complémentaires.
            </DialogDescription>
          </DialogHeader>
          <ClientNotificationForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientNotificationStep;
