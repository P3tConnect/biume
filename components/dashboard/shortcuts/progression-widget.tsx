import { Button, Card, CardHeader, CardTitle } from "@/components/ui";
import { EllipsisVertical } from "lucide-react";
import React from "react";

const ProgressionWidget = () => {
  return (
    <Card className="lg:w-1/3 w-full h-full rounded-2xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg dark:text-gray-200 text-gray-600">
          Progression
        </CardTitle>
        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8 p-0 rounded-full bg-card"
        >
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
    </Card>
  );
};

export default ProgressionWidget;
