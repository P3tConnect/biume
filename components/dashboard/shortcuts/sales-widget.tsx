import {
  Badge,
  Button,
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
import React from "react";

const SalesProWidget = () => {
  return (
    <Dialog>
      <DialogTrigger asChild className="group hover:cursor-pointer">
        <Card className="w-full rounded-2xl hover:bg-[#EEEFF6] hover:dark:bg-[#313131] transition-all duration-400">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-2xl font-bold">
              Prestations à venir
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 group-hover:h-6 group-hover:w-6 transition-all duration-600" />
          </CardHeader>
          <CardContent className="flex justify-start items-center gap-5">
            <h3 className="font-bold text-4xl">7500€</h3>
            <Badge variant="secondary">+ 20%</Badge>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Prestations à venir</DialogTitle>
          <DialogClose />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default SalesProWidget;
