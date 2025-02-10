"use client";

import { Button, Card, CardHeader, CardTitle } from "@/components/ui";
import { FileText, Plus } from "lucide-react";
import React from "react";

export const InvoicesHeader = () => {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Factures
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Gérez vos factures et suivez vos paiements
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-xl hover:bg-secondary/30 hover:border-secondary/70 transition-all duration-300 dark:border-gray-700"
            >
              <FileText className="size-4 mr-2" />
              Liste des factures
            </Button>
            <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300">
              <Plus className="size-4 mr-2" />
              Nouvelle facture
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}; 