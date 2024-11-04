import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import React from "react";

const ProInformationsStep = () => {
  return (
    <Card className="h-full rounded-2xl">
      <CardHeader>
        <CardTitle>Informations</CardTitle>
        <CardDescription>
          Vous êtes sur la page de renseignements de votre entreprise. <br />
          Vous pouvez modifier les informations à tout moment. Dans la partie
          "Informations" depuis le menu "Réglages" sur le tableau de bord.
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default ProInformationsStep;
