import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import React from "react";

const ReportsPageComponent = () => {
  return (
    <Card className="w-full h-full rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          Rapports
        </CardTitle>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default ReportsPageComponent;
