"use client";

import {
  Badge,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import { ArrowUpRight } from "lucide-react";

const ClientsProWidget = () => {
  return (
    <Dialog>
      <DialogTrigger asChild className="group hover:cursor-pointer">
        <Card className="w-full rounded-2xl hover:bg-[#EEEFF6] hover:dark:bg-[#313131] transition-all duration-400">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-lg font-bold text-gray-600 dark:text-gray-200">
              Total des clients ce mois
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 group-hover:h-6 group-hover:w-6 transition-all duration-600 text-gray-600 dark:text-gray-200" />
          </CardHeader>
          <CardContent className="flex justify-start items-center gap-5">
            <h3 className="font-bold text-4xl text-primary">450</h3>
            <Badge>+ 130%</Badge>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Total des clients ce mois</DialogTitle>
          <DialogClose />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ClientsProWidget;
