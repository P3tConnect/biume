import { Button, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import React from "react";
import ObservationsList from "../pages/observations-page/observations-list";

const ObeservationWidget = () => {
  return (
    <Card>
      <CardHeader className="flex items-start justify-start text-2xl font-bold">
        <CardTitle className="text-lg font-bold text-gray-700 dark:text-gray-200">Mes Observations</CardTitle>
        <Button variant="outline">Ajouter</Button>
      </CardHeader>
      <CardContent>
        <ObservationsList />
      </CardContent>
    </Card>
  );
};

export default ObeservationWidget;
