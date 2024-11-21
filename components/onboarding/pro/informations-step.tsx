import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import React from "react";
import InformationsForm from "../components/pro/informations-form";

const ProInformationsStep = () => {
  return (
    <Card className="h-full rounded-2xl">
      <CardHeader>
        <CardTitle>Informations</CardTitle>
        <CardDescription>
          Vous êtes sur la page de renseignements de votre entreprise. <br />
          Vous pouvez modifier les informations à tout moment. Dans la partie
          &quot;Informations&quot; depuis le menu &quot;Réglages&quot; sur le tableau de bord.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <InformationsForm />
      </CardContent>
    </Card>
  );
};

export default ProInformationsStep;
