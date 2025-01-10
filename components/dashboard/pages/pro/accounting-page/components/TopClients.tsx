"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui";
import { Users } from "lucide-react";

interface Client {
  name: string;
  total: number;
  appointments: number;
}

interface TopClientsProps {
  data: Client[];
}

export const TopClients = ({ data }: TopClientsProps) => {
  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">
            Meilleurs clients
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            Voir tout
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {data.map((client) => (
            <Card
              key={client.name}
              className="rounded-xl overflow-hidden hover:bg-gradient-to-br hover:from-gray-100/80 dark:hover:from-gray-800/80 transition-all duration-200"
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-700 dark:from-blue-900 dark:to-blue-950 dark:text-blue-400">
                    <Users className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{client.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {client.appointments} rendez-vous
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {client.total}€
                  </p>
                  <p className="text-sm text-muted-foreground">Total facturé</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
