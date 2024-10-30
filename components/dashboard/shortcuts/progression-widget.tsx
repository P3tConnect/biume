import { Button, Card, CardHeader, CardTitle } from "@/components/ui";
import { EllipsisVertical } from "lucide-react";
import React from "react";

const ProgressionWidget = () => {
  return (
    <Card className="w-full h-full rounded-2xl">
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Progression</CardTitle>
        <Button variant="outline" size="icon" className="h-8 w-8 p-0">
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
    </Card>
  );
};

export default ProgressionWidget;
