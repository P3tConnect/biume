import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui";
import ClientInformationForm from "@/components/onboarding/components/client/information-form";

const ClientInformationsStep = () => {
  return (
    <Card className="h-full rounded-2xl">
      <CardHeader className="flex flex-col items-start ml-2">
        <CardTitle className="text-primary text-3xl">
          Remplir les champs pour finaliser votre incription
        </CardTitle>
        <CardDescription>
          Ajoutez les informations de votre profil.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ClientInformationForm />
      </CardContent>
    </Card>
  );
};

export default ClientInformationsStep;
