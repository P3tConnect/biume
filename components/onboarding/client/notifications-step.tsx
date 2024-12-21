"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui";
import ClientNotificationForm from "../components/client/notification-form";

const ClientNotificationStep = () => {
  return (
    <Dialog>
      <DialogHeader>
        <DialogTitle>Choisissez votre type de notification</DialogTitle>
        <DialogDescription>
          Choisissez votre type de notification pour recevoir les alertes liées
          à vos rendez-vous / activités ou autres informations complémentaires.
        </DialogDescription>
      </DialogHeader>
      <DialogContent>
        <ClientNotificationForm />
      </DialogContent>
    </Dialog>
  );
};

export default ClientNotificationStep;
