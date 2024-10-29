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
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Reminders</CardTitle>
        <Button
          variant="outline"
          size="sm"
          className="p-0 rounded-full h-8 w-8"
        >
          <EllipsisVertical className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default RemindersShortcut;
