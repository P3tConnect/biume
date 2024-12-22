"use client";

import React, { useState } from "react";
import {
  DialogHeader,
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui";
import ClientInformationForm from "@/components/onboarding/components/client/information-form";
import { cn } from "@/src/lib";

const ClientInformationsStep = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={cn(!isOpen ? "hidden" : "block")}>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remplissez vos informations</DialogTitle>
            <DialogDescription>
              Remplissez vos informations personnelles qui seront liées à votre
              compte.
            </DialogDescription>
          </DialogHeader>
          <ClientInformationForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClientInformationsStep;
