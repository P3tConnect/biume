"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { CountAnimation } from "@/components/count-animation";
import {
  CalendarIcon,
  HeartPulseIcon,
  PawPrintIcon,
  ActivityIcon,
  TrendingUpIcon,
  ClockIcon,
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

// Données simulées pour les graphiques
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

const MetricsWidget = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

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
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Rendez-vous du jour */}
        <Card
          className="relative overflow-hidden p-6 hover:shadow-lg transition-all rounded-2xl cursor-pointer"
          onClick={() => setOpenDialog("Rendez-vous")}
        >
          <div className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl">
                  <CalendarIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                </div>
                <span className="font-medium">Aujourd'hui</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUpIcon className="w-3 h-3" />
                <span>+12%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <div className="text-3xl font-bold">
                <CountAnimation value={24} />
              </div>
              <p className="text-sm text-muted-foreground">
                Rendez-vous prévus
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ClockIcon className="w-3 h-3" />
              <span>Prochain dans 45min</span>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-full" />
        </Card>

        {/* Nouveaux patients */}
        <Card
          className="relative overflow-hidden p-6 hover:shadow-lg transition-all rounded-2xl cursor-pointer"
          onClick={() => setOpenDialog("Nouveaux patients")}
        >
          <div className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-rose-100 dark:bg-rose-900/30 rounded-xl">
                  <PawPrintIcon className="w-5 h-5 text-rose-600 dark:text-rose-400" />
                </div>
                <span className="font-medium">Ce mois</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUpIcon className="w-3 h-3" />
                <span>+8%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <div className="text-3xl font-bold">
                <CountAnimation value={45} />
              </div>
              <p className="text-sm text-muted-foreground">Nouveaux patients</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex -space-x-2">
                <div className="w-4 h-4 rounded-full bg-rose-200 dark:bg-rose-800" />
                <div className="w-4 h-4 rounded-full bg-rose-300 dark:bg-rose-700" />
                <div className="w-4 h-4 rounded-full bg-rose-400 dark:bg-rose-600" />
              </div>
              <span>65% chiens, 35% chats</span>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-rose-50/50 dark:bg-rose-900/10 rounded-full" />
        </Card>

        {/* Soins réalisés */}
        <Card
          className="relative overflow-hidden p-6 hover:shadow-lg transition-all rounded-2xl cursor-pointer"
          onClick={() => setOpenDialog("Soins réalisés")}
        >
          <div className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                  <HeartPulseIcon className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="font-medium">Cette semaine</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUpIcon className="w-3 h-3" />
                <span>+15%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <div className="text-3xl font-bold">
                <CountAnimation value={128} />
              </div>
              <p className="text-sm text-muted-foreground">Soins réalisés</p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ActivityIcon className="w-3 h-3" />
              <span>32 vaccinations, 18 chirurgies</span>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-full" />
        </Card>

        {/* Taux de satisfaction */}
        <Card
          className="relative overflow-hidden p-6 hover:shadow-lg transition-all rounded-2xl cursor-pointer"
          onClick={() => setOpenDialog("Satisfaction")}
        >
          <div className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                  <ActivityIcon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <span className="font-medium">Satisfaction</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-green-600">
                <TrendingUpIcon className="w-3 h-3" />
                <span>+2%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div>
              <div className="text-3xl font-bold">98%</div>
              <p className="text-sm text-muted-foreground">
                Clients satisfaits
              </p>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>95% recommandent</span>
              </div>
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-50/50 dark:bg-amber-900/10 rounded-full" />
        </Card>
      </div>

      {renderChart(appointmentsData, "Rendez-vous", "#4F46E5")}
      {renderChart(newPatientsData, "Nouveaux patients", "#E11D48")}
      {renderChart(treatmentsData, "Soins réalisés", "#059669")}
      {renderChart(satisfactionData, "Satisfaction", "#D97706")}
    </>
  );
};

export default MetricsWidget;
