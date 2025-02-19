"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Banknote, Percent, LineChart } from "lucide-react";
import { CountAnimation } from "@/components/count-animation";

interface MetricsGridProps {
  data: {
    totalRevenue: number;
    averageTicket: number;
    profitMargin: number;
    yearGrowth: number;
  };
}

export const MetricsGrid = ({ data }: MetricsGridProps) => {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <div className="grid space-y-2 md:grid-cols-2 lg:grid-cols-4 lg:space-y-0">
        <Card className="rounded-none border-y-transparent border-s-transparent hover:bg-gradient-to-br hover:from-green-50 hover:to-transparent dark:hover:from-green-950/30 dark:hover:to-transparent transition-all duration-300">
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium">
              Revenu Total
            </CardTitle>
            <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-green-900 dark:to-green-950 p-4">
              <Banknote className="size-5 text-green-700 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-green-700 dark:text-green-400">
              <CountAnimation value={data.totalRevenue} />€
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8.2%</span> vs dernier mois
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-y-transparent border-s-transparent hover:bg-gradient-to-br hover:from-blue-50 hover:to-transparent dark:hover:from-blue-950/30 dark:hover:to-transparent transition-all duration-300">
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium">
              Ticket Moyen
            </CardTitle>
            <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-blue-100 dark:from-blue-900 dark:to-blue-950 p-4">
              <TrendingUp className="size-5 text-blue-700 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
              <CountAnimation value={data.averageTicket} />€
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.3%</span> vs dernier mois
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-y-transparent border-s-transparent hover:bg-gradient-to-br hover:from-purple-50 hover:to-transparent dark:hover:from-purple-950/30 dark:hover:to-transparent transition-all duration-300">
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium">
              Marge de Profit
            </CardTitle>
            <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-purple-200 to-purple-100 dark:from-purple-900 dark:to-purple-950 p-4">
              <Percent className="size-5 text-purple-700 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-purple-700 dark:text-purple-400">
              <CountAnimation value={data.profitMargin} />%
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.1%</span> vs dernier mois
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-none border-transparent hover:bg-gradient-to-br hover:from-orange-50 hover:to-transparent dark:hover:from-orange-950/30 dark:hover:to-transparent transition-all duration-300">
          <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base font-medium">
              Croissance Annuelle
            </CardTitle>
            <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-200 to-orange-100 dark:from-orange-900 dark:to-orange-950 p-4">
              <LineChart className="size-5 text-orange-700 dark:text-orange-400" />
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-3xl font-bold text-orange-700 dark:text-orange-400">
              <CountAnimation value={data.yearGrowth} />%
            </div>
            <p className="text-xs text-muted-foreground">
              Objectif annuel: 20%
            </p>
          </CardContent>
        </Card>
      </div>
    </Card>
  );
}; 