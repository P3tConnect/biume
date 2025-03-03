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
  TrendingDownIcon,
  ClockIcon,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
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

// Données pour les sparklines (version simplifiée)
const sparklineAppointments = [
  { value: 20 },
  { value: 25 },
  { value: 22 },
  { value: 28 },
  { value: 24 },
  { value: 30 },
];

const sparklinePatients = [
  { value: 40 },
  { value: 42 },
  { value: 38 },
  { value: 45 },
  { value: 43 },
  { value: 48 },
];

const sparklineTreatments = [
  { value: 110 },
  { value: 115 },
  { value: 108 },
  { value: 128 },
  { value: 125 },
  { value: 135 },
];

const sparklineSatisfaction = [
  { value: 95 },
  { value: 96 },
  { value: 97 },
  { value: 96 },
  { value: 98 },
  { value: 98 },
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

  interface MetricCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    iconBgClass: string;
    iconColor: string;
    trendValue: string;
    subtitle: string;
    sparklineData: { value: number }[];
    sparklineColor: string;
    onClick: () => void;
  }

  const MetricCard = ({
    title,
    value,
    icon,
    iconBgClass,
    iconColor,
    trendValue,
    subtitle,
    sparklineData,
    sparklineColor,
    onClick,
  }: MetricCardProps) => {
    const isPositive = trendValue.startsWith("+");

    return (
      <Card
        className="overflow-hidden border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
        onClick={onClick}
      >
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className={`p-2 ${iconBgClass} rounded-md`}>{icon}</div>
              <span className="text-sm font-medium">{title}</span>
            </div>
            <div
              className={`flex items-center gap-0.5 text-xs px-2 py-1 rounded-full ${isPositive ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"}`}
            >
              {isPositive ? (
                <TrendingUpIcon className="w-3 h-3" />
              ) : (
                <TrendingDownIcon className="w-3 h-3" />
              )}
              <span>{trendValue}</span>
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <div className="text-3xl font-bold">
                <CountAnimation value={value} />
                {title === "Satisfaction" && (
                  <span className="text-sm font-medium">%</span>
                )}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {subtitle}
              </div>
            </div>

            <div className="h-12 w-20">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={sparklineData}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id={`color${title}`}
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={sparklineColor}
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor={sparklineColor}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={sparklineColor}
                    strokeWidth={1.5}
                    fill={`url(#color${title})`}
                    dot={false}
                    activeDot={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="h-1" style={{ background: sparklineColor }} />
      </Card>
    );
  };

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <MetricCard
          title="Rendez-vous"
          value={24}
          icon={
            <CalendarIcon className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          }
          iconBgClass="bg-indigo-100 dark:bg-indigo-900/30"
          iconColor="#6366f1"
          trendValue="+12%"
          subtitle="Aujourd'hui"
          sparklineData={sparklineAppointments}
          sparklineColor="#6366f1"
          onClick={() => setOpenDialog("Rendez-vous")}
        />

        <MetricCard
          title="Patients"
          value={45}
          icon={
            <PawPrintIcon className="w-4 h-4 text-rose-600 dark:text-rose-400" />
          }
          iconBgClass="bg-rose-100 dark:bg-rose-900/30"
          iconColor="#f43f5e"
          trendValue="+8%"
          subtitle="Ce mois"
          sparklineData={sparklinePatients}
          sparklineColor="#f43f5e"
          onClick={() => setOpenDialog("Nouveaux patients")}
        />

        <MetricCard
          title="Soins"
          value={128}
          icon={
            <ActivityIcon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          }
          iconBgClass="bg-emerald-100 dark:bg-emerald-900/30"
          iconColor="#10b981"
          trendValue="+5%"
          subtitle="Ce mois"
          sparklineData={sparklineTreatments}
          sparklineColor="#10b981"
          onClick={() => setOpenDialog("Soins réalisés")}
        />

        <MetricCard
          title="Satisfaction"
          value={98}
          icon={
            <HeartPulseIcon className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          }
          iconBgClass="bg-amber-100 dark:bg-amber-900/30"
          iconColor="#f59e0b"
          trendValue="+2%"
          subtitle="24 avis ce mois"
          sparklineData={sparklineSatisfaction}
          sparklineColor="#f59e0b"
          onClick={() => setOpenDialog("Satisfaction client")}
        />
      </div>

      {/* Charts modals */}
      {renderChart(appointmentsData, "Rendez-vous", "#6366f1")}
      {renderChart(newPatientsData, "Nouveaux patients", "#f43f5e")}
      {renderChart(treatmentsData, "Soins réalisés", "#10b981")}
      {renderChart(satisfactionData, "Satisfaction client", "#f59e0b")}
    </>
  );
};

export default MetricsWidget;
