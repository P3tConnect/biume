"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui";
import { UserPlus, Users } from "lucide-react";

export const ClientsHeader = () => {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Clients
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Gérez vos clients et leurs informations
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-xl hover:bg-secondary/30 hover:border-secondary/70 transition-all duration-300 dark:border-gray-700"
            >
              <Users className="size-4 mr-2" />
              Liste des clients
            </Button>
            <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300">
              <UserPlus className="size-4 mr-2" />
              Ajouter un client
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}; 