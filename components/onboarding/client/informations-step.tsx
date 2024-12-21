import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  DialogHeader,
  Dialog,
  DialogTitle,
  DialogDescription,
  DialogContent,
} from "@/components/ui";
import ClientInformationForm from "@/components/onboarding/components/client/information-form";

const ClientInformationsStep = () => {
  return (
    <Dialog>
      <DialogHeader className="flex flex-col items-start ml-2">
        <DialogTitle className="text-primary text-3xl">
          Remplir les champs pour finaliser votre incription
        </DialogTitle>
        <DialogDescription>
          Ajoutez les informations de votre profil.
        </DialogDescription>
      </DialogHeader>
      <DialogContent>
        <ClientInformationForm />
      </DialogContent>
    </Dialog>
  );
};

export default ClientInformationsStep;
