"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PenSquare, Filter } from "lucide-react";

export const MessagesHeader = () => {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Communications
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Gérez vos messages et communications avec les propriétaires
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="text-xs h-8 gap-1.5">
              <Filter className="h-3.5 w-3.5" />
              <span>Filtrer</span>
            </Button>
            <Button size="sm" className="text-xs h-8 gap-1.5">
              <PenSquare className="h-3.5 w-3.5" />
              <span>Nouveau message</span>
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
