import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

const RemindersPageComponent = () => {
  return (
    <Card className="w-full h-full rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Mes Rappels
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default RemindersPageComponent;
