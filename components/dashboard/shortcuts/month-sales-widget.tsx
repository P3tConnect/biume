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
  DialogTrigger
} from "@/components/ui";
import { ArrowUpRight } from "lucide-react";
import React from "react";

const MonthSalesWidget = () => {
  return (
    <Dialog>
      <DialogTrigger asChild className="group hover:cursor-pointer">
        <Card className="w-full bg-secondary rounded-2xl text-white hover:bg-secondary/80 transition-all duration-400">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-2xl font-bold">Revenues du mois</CardTitle>
            <ArrowUpRight className="h-4 w-4 group-hover:h-6 group-hover:w-6 transition-all duration-600" />
          </CardHeader>
          <CardContent className="rounded-2xl flex justify-start items-center gap-5">
            <h3 className="font-bold text-4xl">18 000€</h3>
            <Badge className="bg-secondary/40 rounded-2xl">+ 20%</Badge>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Revenues du mois</DialogTitle>
          <DialogClose />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default MonthSalesWidget;
