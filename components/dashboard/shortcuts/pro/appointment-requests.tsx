"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CalendarDays,
  Dog,
  Cat,
  AlertTriangle,
  Calendar,
  ChevronRight,
  MoveRight,
} from "lucide-react";

export const AppointmentRequests = () => {
  return (
    <Card className="border shadow-sm">
      <CardHeader className="pb-0 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-md">
              <CalendarDays className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-lg font-medium">
              Demandes de rendez-vous
            </CardTitle>
          </div>
          <Badge variant="secondary" className="text-xs font-normal">
            3
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Items stylisés */}
          <div className="group relative rounded-lg overflow-hidden hover:bg-muted/20 transition-all duration-200 border border-transparent hover:border-muted">
            <div className="flex items-center p-3">
              <div className="flex-shrink-0 relative">
                <div className="w-12 h-12 rounded-full bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 flex items-center justify-center shadow-sm">
                  <Dog className="h-6 w-6 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-amber-100 text-amber-700 dark:bg-amber-700 dark:text-amber-100 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-medium">
                  15
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium truncate">Luna</p>
                    <Badge
                      variant="secondary"
                      className="ml-2 text-[10px] h-4 px-1.5 py-0"
                    >
                      Consultation
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  Berger australien • 4 ans
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1 text-amber-500" />
                  <span>Demande pour le matin</span>
                </div>
              </div>
              <div className="flex flex-col items-end ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="text-xs text-muted-foreground mt-auto">
                  Marie Dupont
                </div>
              </div>
            </div>
          </div>

          <div className="group relative rounded-lg overflow-hidden hover:bg-muted/20 transition-all duration-200 border border-transparent hover:border-muted">
            <div className="flex items-center p-3">
              <div className="flex-shrink-0 relative">
                <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 flex items-center justify-center shadow-sm">
                  <Cat className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-100 text-blue-700 dark:bg-blue-700 dark:text-blue-100 rounded-full border-2 border-background flex items-center justify-center text-[10px] font-medium">
                  14
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium truncate">Simba</p>
                    <Badge
                      variant="secondary"
                      className="ml-2 text-[10px] h-4 px-1.5 py-0"
                    >
                      Vaccination
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  Maine Coon • 2 ans
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Calendar className="h-3 w-3 mr-1 text-blue-500" />
                  <span>Demande pour l&apos;après-midi</span>
                </div>
              </div>
              <div className="flex flex-col items-end ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="text-xs text-muted-foreground mt-auto">
                  Paul Martin
                </div>
              </div>
            </div>
          </div>

          <div className="group relative rounded-lg overflow-hidden hover:bg-muted/20 transition-all duration-200 border border-transparent hover:border-red-200 dark:hover:border-red-800">
            <div className="flex items-center p-3">
              <div className="flex-shrink-0 relative">
                <div className="w-12 h-12 rounded-full bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 flex items-center justify-center shadow-sm">
                  <Dog className="h-6 w-6 text-red-600 dark:text-red-400" />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full border-2 border-background flex items-center justify-center text-[10px] font-medium pulse-animation">
                  12
                </div>
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center">
                    <p className="text-sm font-medium truncate">Rocky</p>
                    <Badge
                      variant="outline"
                      className="ml-2 text-[10px] h-4 px-1.5 py-0 text-red-500 border-red-200 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/20"
                    >
                      urgent
                    </Badge>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground mb-1">
                  Jack Russell • 5 ans
                </div>
                <div className="flex items-center text-xs text-red-500 font-medium">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  <span>Boiterie soudaine</span>
                </div>
              </div>
              <div className="flex flex-col items-end ml-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
                <div className="text-xs text-muted-foreground mt-auto">
                  Lucie Moreau
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t bg-muted/10">
        <Button
          variant="ghost"
          size="sm"
          className="w-full text-xs flex items-center justify-center gap-1.5"
        >
          <span>Voir toutes les demandes</span>
          <MoveRight className="h-3 w-3" />
        </Button>
      </CardFooter>
    </Card>
  );
};
