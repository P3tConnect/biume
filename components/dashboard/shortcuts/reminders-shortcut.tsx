import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { EllipsisVertical } from "lucide-react";
import React from "react";

const RemindersShortcut = () => {
  return (
    <Card className="w-full h-full rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-bold text-gray-700 dark:text-gray-200">Mes Rappels</CardTitle>
        <Button variant="outline" className="p-0 rounded-full h-7 w-7 bg-card">
          <EllipsisVertical size={18} />
        </Button>
      </CardHeader>
      <CardContent className="w-full flex flex-col justify-center items-center">
        <p className="text-sm font-semibold text-muted-foreground">Aucun rappel à venir</p>
      </CardContent>
    </Card>
  );
};

export default RemindersShortcut;
