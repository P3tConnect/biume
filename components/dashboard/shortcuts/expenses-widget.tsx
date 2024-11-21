import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  Badge,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui";
import { ArrowUpRight } from "lucide-react";
import React from "react";

const ExpensesProWidget = () => {
  return (
    <Dialog>
      <DialogTrigger asChild className="group hover:cursor-pointer">
        <Card className="w-full rounded-2xl font-bold hover:bg-[#EEEFF6] hover:dark:bg-[#313131] transition-all duration-400">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-lg font-bold text-gray-700 dark:text-gray-200">
              Dernières dépenses
            </CardTitle>
            <ArrowUpRight className="h-4 w-4 group-hover:h-6 group-hover:w-6 transition-all duration-600 text-gray-600 dark:text-gray-200" />
          </CardHeader>
          <CardContent className="flex justify-start items-center gap-5">
            <h3 className="font-bold text-4xl">2500€</h3>
            <Badge variant="default">-10.5%</Badge>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dernières dépenses</DialogTitle>
          <DialogClose />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ExpensesProWidget;
