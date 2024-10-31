import { Button, Card, CardContent, CardHeader } from "@/components/ui";
import React from "react";
import ObservationsList from "../pages/observations-page/observations-list";

const ObeservationWidget = () => {
  return (
    <Card>
      <CardHeader className="flex items-start justify-start text-2xl font-bold">
        Mes Observations
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-row items-end justify-end text-center gap-2">
          <Button variant="secondary">Ajouter</Button>
        </div>
        <ObservationsList />
      </CardContent>
    </Card>
  );
};

export default ObeservationWidget;
