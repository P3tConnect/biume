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
        <CardTitle className="text-xl font-bold">Mes Rappels</CardTitle>
        <Button variant="outline" className="p-0 rounded-full h-7 w-7">
          <EllipsisVertical size={18} />
        </Button>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default RemindersShortcut;
