import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { MoreVertical } from "lucide-react";
import React from "react";

const ReservationsStatusesWidget = () => {
  return (
    <Card className="w-full h-full rounded-2xl">
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle className="text-lg font-bold text-gray-600 dark:text-gray-200">Mes réservations</CardTitle>
        <Button variant="outline" className="rounded-full h-7 w-7 p-0 bg-card">
          <MoreVertical size={18} />
        </Button>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default ReservationsStatusesWidget;
