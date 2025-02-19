"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import NewShortcut from "../../layout/new-shortcut";

export const DashboardHomeHeader = () => {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Tableau de bord
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Gérez votre activité en un coup d&apos;œil
            </p>
          </div>
          <NewShortcut />
        </div>
      </CardHeader>
    </Card>
  );
};
