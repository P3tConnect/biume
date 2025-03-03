"use client";

import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CountAnimation } from "@/components/count-animation";
import {
  Stethoscope,
  Syringe,
  ChevronRight,
  RefreshCw,
  Cat,
  CalendarIcon,
  HeartPulseIcon,
  TrendingUpIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  CredenzaContent,
  CredenzaTitle,
  CredenzaHeader,
} from "@/components/ui";
import { Credenza } from "@/components/ui";

// Données simulées pour les graphiques (conservées du MetricsWidget)
const appointmentsData = [
  { month: "Jan", value: 20 },
  { month: "Fév", value: 25 },
  { month: "Mar", value: 22 },
  { month: "Avr", value: 28 },
  { month: "Mai", value: 24 },
  { month: "Juin", value: 30 },
];

const newPatientsData = [
  { month: "Jan", value: 40 },
  { month: "Fév", value: 42 },
  { month: "Mar", value: 38 },
  { month: "Avr", value: 45 },
  { month: "Mai", value: 43 },
  { month: "Juin", value: 48 },
];

const treatmentsData = [
  { month: "Jan", value: 110 },
  { month: "Fév", value: 115 },
  { month: "Mar", value: 108 },
  { month: "Avr", value: 128 },
  { month: "Mai", value: 125 },
  { month: "Juin", value: 135 },
];

const satisfactionData = [
  { month: "Jan", value: 95 },
  { month: "Fév", value: 96 },
  { month: "Mar", value: 97 },
  { month: "Avr", value: 96 },
  { month: "Mai", value: 98 },
  { month: "Juin", value: 98 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="font-medium mb-1">{label}</p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {payload[0].value}
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export const UnifiedMetrics = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  // Formatage de la date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const renderChart = (data: any[], title: string, color: string) => {
    const currentValue = data[data.length - 1].value;
    const previousValue = data[data.length - 2].value;
    const percentageChange = (
      ((currentValue - previousValue) / previousValue) *
      100
    ).toFixed(1);
    const isPositive = currentValue >= previousValue;

    return (
      <Credenza
        open={openDialog === title}
        onOpenChange={() => setOpenDialog(null)}
      >
        <CredenzaContent className="sm:max-w-[600px] p-10">
          <CredenzaHeader>
            <CredenzaTitle className="flex items-center justify-between">
              <span>{title}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Évolution</span>
                <div
                  className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}
                >
                  <TrendingUpIcon
                    className={`w-4 h-4 ${!isPositive && "rotate-180"}`}
                  />
                  <span>{percentageChange}%</span>
                </div>
              </div>
            </CredenzaTitle>
          </CredenzaHeader>
          <div className="space-y-8 pr-8 pb-6">
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-2">Actuel</p>
                <p className="text-2xl font-bold">{currentValue}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-2">Précédent</p>
                <p className="text-2xl font-bold">{previousValue}</p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-2">Moyenne</p>
                <p className="text-2xl font-bold">
                  {Math.round(
                    data.reduce((acc, curr) => acc + curr.value, 0) /
                      data.length,
                  )}
                </p>
              </Card>
            </div>

            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    dy={10}
                  />
                  <YAxis axisLine={false} tickLine={false} dx={-10} />
                  <Tooltip content={<CustomTooltip />} cursor={false} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 6, strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CredenzaContent>
      </Credenza>
    );
  };

  return (
    <div className="space-y-4">
      {/* Section des métriques principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card className="overflow-hidden shadow-sm rounded-xl">
          <div className="p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="bg-indigo-100 dark:bg-indigo-900/30 p-1.5 rounded-md">
                  <CalendarIcon className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="text-sm font-medium">Rendez-vous</span>
              </div>
              <Badge variant="outline" className="text-xs px-1.5 py-0">
                {formattedDate}
              </Badge>
            </div>
            <div className="text-2xl font-bold mb-0.5">
              <CountAnimation value={8} />
            </div>
            <div className="text-xs text-muted-foreground">Aujourd'hui</div>
          </div>
        </Card>

        {/* Autres métriques similaires */}
        <Card className="overflow-hidden shadow-sm rounded-xl">
          <div className="p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="bg-rose-100 dark:bg-rose-900/30 p-1.5 rounded-md">
                  <Stethoscope className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                </div>
                <span className="text-sm font-medium">Consultations</span>
              </div>
            </div>
            <div className="text-2xl font-bold mb-0.5">
              <CountAnimation value={3} />
            </div>
            <div className="text-xs text-muted-foreground">Terminées</div>
          </div>
        </Card>

        <Card className="overflow-hidden shadow-sm rounded-xl">
          <div className="p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-md">
                  <Syringe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm font-medium">Vaccinations</span>
              </div>
            </div>
            <div className="text-2xl font-bold mb-0.5">
              <CountAnimation value={3} />
            </div>
            <div className="text-xs text-muted-foreground">Prévues</div>
          </div>
        </Card>

        <Card className="overflow-hidden shadow-sm rounded-xl">
          <div className="p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="bg-amber-100 dark:bg-amber-900/30 p-1.5 rounded-md">
                  <HeartPulseIcon className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="text-sm font-medium">Satisfaction</span>
              </div>
            </div>
            <div className="text-2xl font-bold mb-0.5">
              <CountAnimation value={98} />
              <span className="text-xs font-medium">%</span>
            </div>
            <div className="text-xs text-muted-foreground">Ce mois</div>
          </div>
        </Card>
      </div>

      {/* Section du prochain rendez-vous */}
      <Card className="rounded-xl">
        <CardHeader className="pb-1 pt-4">
          <div className="flex items-center justify-between">
            <CardTitle>Prochain rendez-vous</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-center justify-between p-2 border rounded-md">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800">
                <Cat className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </div>
              <div>
                <div className="font-medium text-sm">Félix</div>
                <div className="text-xs text-muted-foreground">
                  Consultation de routine
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <Badge variant="secondary" className="mb-1">
                09:30
              </Badge>
              <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
                Voir fiche
                <ChevronRight className="ml-1 h-3 w-3" />
              </Button>
            </div>
          </div>

          {/* État d'avancement */}
          <div className="mt-4 space-y-2">
            <div className="text-xs font-medium text-muted-foreground">
              ÉTAT D'AVANCEMENT
            </div>
            <div className="pt-2 pb-3 space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span>Consultations</span>
                <span className="text-muted-foreground">2/8 terminées</span>
              </div>
              <Progress value={25} className="h-1.5" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 py-3 border-t bg-muted/10">
          <div className="flex items-center justify-between w-full text-xs text-muted-foreground">
            <div className="flex items-center">
              <RefreshCw className="h-3 w-3 mr-1.5" />
              Mis à jour il y a 5 min
            </div>
            <Button variant="ghost" size="sm" className="h-6 text-xs px-2">
              Rafraîchir
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Modals pour les graphiques détaillés */}
      {renderChart(appointmentsData, "Rendez-vous", "#6366f1")}
      {renderChart(newPatientsData, "Nouveaux patients", "#f43f5e")}
      {renderChart(treatmentsData, "Soins réalisés", "#10b981")}
      {renderChart(satisfactionData, "Satisfaction client", "#f59e0b")}
    </div>
  );
};
