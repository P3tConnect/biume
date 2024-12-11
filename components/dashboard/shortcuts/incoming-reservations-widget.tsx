import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { MoreVertical } from "lucide-react";
import React from "react";

const IncomingReservationsWidget = () => {
  return (
    <Card className="w-full h-full rounded-2xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-bold text-gray-700 dark:text-gray-200">
          Réservations a traiter
        </CardTitle>
        <Button variant="outline" className="rounded-full h-7 w-7 p-0 bg-card">
          <MoreVertical size={18} />
        </Button>
      </CardHeader>
      <CardContent className="w-full flex flex-col justify-center items-center">
        <p className="text-sm font-semibold text-muted-foreground">Aucune demande de réservation à traiter</p>
      </CardContent>
    </Card>
  );
};

export default IncomingReservationsWidget;
