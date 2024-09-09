"use client";

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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui";
import { ArrowRight, MoreVertical } from "lucide-react";
import React, { useState } from "react";

const ClientsProWidget = () => {
  const [viewMode, setViewMode] = useState("week");

  return (
    <Dialog>
      <Card className="w-full bg-white dark:bg-black rounded-2xl">
        <CardHeader className="flex flex-row justify-between items-center">
          <CardTitle className="text-xl">Total des clients ce mois</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="rounded-full h-7 w-7 p-0">
                <MoreVertical size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="font-bold">
                Options
              </DropdownMenuLabel>
              <DropdownMenuCheckboxItem
                checked={viewMode == "week"}
                onCheckedChange={() => setViewMode("week")}
              >
                Par semaine
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={viewMode == "month"}
                onCheckedChange={() => setViewMode("month")}
              >
                Par mois
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={viewMode == "year"}
                onCheckedChange={() => setViewMode("year")}
              >
                Par année
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem className="flex justify-between items-center">
                  <p className="font-semibold">Voir plus</p>
                  <ArrowRight size={14} />
                </DropdownMenuItem>
              </DialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent className="flex justify-start items-center gap-5">
          <h3 className="font-bold text-4xl text-secondary">450</h3>
          <Badge>+ 130%</Badge>
        </CardContent>
      </Card>
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
