"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CountAnimation } from "@/components/count-animation";
import {
  Stethoscope,
  CalendarIcon,
  HeartPulseIcon,
  TrendingUpIcon,
  User,
  RefreshCcw,
  Loader2,
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
import { AnimalCredenza } from "./unified-metrics/AnimalCredenza";
import { AnimalDetails } from "./unified-metrics/types";
import { getMetricsAction, MetricsData } from "@/src/actions/metrics.action";
import { useQuery } from "@tanstack/react-query";

// Données de secours (fallback) en cas d'échec du chargement
const fallbackData: MetricsData = {
  appointmentsData: [
    { month: "Jan", value: 20 },
    { month: "Fév", value: 25 },
    { month: "Mar", value: 22 },
    { month: "Avr", value: 28 },
    { month: "Mai", value: 24 },
    { month: "Juin", value: 30 },
  ],
  newPatientsData: [
    { month: "Jan", value: 40 },
    { month: "Fév", value: 42 },
    { month: "Mar", value: 38 },
    { month: "Avr", value: 45 },
    { month: "Mai", value: 43 },
    { month: "Juin", value: 48 },
  ],
  treatmentsData: [
    { month: "Jan", value: 110 },
    { month: "Fév", value: 115 },
    { month: "Mar", value: 108 },
    { month: "Avr", value: 128 },
    { month: "Mai", value: 125 },
    { month: "Juin", value: 135 },
  ],
  satisfactionData: [
    { month: "Jan", value: 95 },
    { month: "Fév", value: 96 },
    { month: "Mar", value: 97 },
    { month: "Avr", value: 96 },
    { month: "Mai", value: 98 },
    { month: "Juin", value: 98 },
  ],
};

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
  const [animalDetailsOpen, setAnimalDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "info" | "vaccinations" | "medical" | "appointments" | "documents"
  >("info");
  const [selectedMonths, setSelectedMonths] = useState(6); // Nombre de mois à afficher par défaut

  // Utiliser useQuery pour récupérer les métriques
  const {
    data: metricsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["metrics", selectedMonths],
    queryFn: async () => {
      try {
        const result = await getMetricsAction({ months: selectedMonths });

        // En cas d'erreur dans les résultats
        if ("error" in result) {
          console.error("Erreur dans les métriques:", result.error);
          return fallbackData;
        }

        // Si le résultat a une propriété data, on l'utilise
        if ("data" in result) {
          return result.data;
        }

        // Sinon on renvoie directement le résultat
        return result;
      } catch (error) {
        console.error("Erreur lors de la récupération des métriques:", error);
        return fallbackData;
      }
    },
  });

  // Utiliser les données récupérées ou les données de secours en cas d'erreur
  const metrics: MetricsData = metricsData || fallbackData;

  // Formatage de la date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Données enrichies pour la fiche de l'animal (conservées pour la démo)
  const animalDetails: AnimalDetails = {
    id: "felix-001",
    name: "Félix",
    species: "Chat",
    breed: "Européen",
    gender: "male",
    birthDate: "2020-06-15", // Format ISO
    weight: 4.2,
    age: "3 ans",
    color: "Tigré gris",
    microchipNumber: "250269100123456",
    sterilized: true,
    sterilizationDate: "2021-03-20",
    ownerName: "Sophie Dupont",
    ownerContact: "sophie.dupont@email.com",
    profileImage: "/images/cat-profile.jpg",
    notes:
      "Félix est un chat calme et affectueux. Il a tendance à être stressé lors des visites vétérinaires.",
    nextVisit: "09/10/2023",
    // Conserver les autres données
    vaccinations: [],
    medicalRecords: [],
    appointments: [],
    documents: [],
  };

  // Vérifier si les données sont disponibles avant de les utiliser
  const hasData =
    metrics &&
    metrics.appointmentsData?.length > 0 &&
    metrics.newPatientsData?.length > 0 &&
    metrics.treatmentsData?.length > 0 &&
    metrics.satisfactionData?.length > 0;

  const getPercentageChange = (dataArray: any[], isPositiveGood = true) => {
    if (!dataArray || dataArray.length < 2)
      return { value: 0, isPositive: true };

    const current = dataArray[dataArray.length - 1].value;
    const previous = dataArray[dataArray.length - 2].value;

    // Éviter division par zéro
    if (previous === 0) return { value: 0, isPositive: true };

    const percentage = ((current - previous) / previous) * 100;
    const isPositive = isPositiveGood
      ? current >= previous
      : current <= previous;

    return {
      value: Math.abs(percentage).toFixed(1),
      isPositive,
    };
  };

  const renderChart = (data: any[], title: string, color: string) => {
    if (!data || data.length < 2) return null;

    const currentValue = data[data.length - 1].value;
    const previousValue = data[data.length - 2].value;
    const { value: percentageChange, isPositive } = getPercentageChange(data);

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

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#888888", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#888888", fontSize: 12 }}
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={3}
                    dot={{
                      fill: color,
                      stroke: color,
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{
                      fill: color,
                      stroke: "#fff",
                      strokeWidth: 2,
                      r: 6,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CredenzaContent>
      </Credenza>
    );
  };

  // Afficher un état de chargement pendant que les données sont récupérées
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground">Chargement des métriques...</p>
        </div>
      </div>
    );
  }

  // Afficher un message d'erreur si la récupération des données a échoué
  if (isError && !hasData) {
    return (
      <div className="p-6 border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 rounded-lg">
        <h3 className="text-red-700 dark:text-red-400 font-medium mb-2">
          Erreur de chargement des métriques
        </h3>
        <p className="text-sm text-red-600 dark:text-red-300">
          Impossible de récupérer les métriques. Veuillez réessayer plus tard.
        </p>
        <Button
          variant="outline"
          className="mt-4 text-sm"
          onClick={() => refetch()}
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Réessayer
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <CountAnimation
                value={
                  !hasData
                    ? 0
                    : metrics.appointmentsData[
                          metrics.appointmentsData.length - 1
                        ].value > 0
                      ? metrics.appointmentsData[
                          metrics.appointmentsData.length - 1
                        ].value
                      : 0
                }
              />
            </div>
            <div className="text-xs text-muted-foreground">
              {hasData && metrics.appointmentsData.length > 1 && (
                <span
                  className={`inline-flex items-center ${
                    getPercentageChange(metrics.appointmentsData).isPositive
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <TrendingUpIcon
                    className={`h-3 w-3 mr-1 ${
                      !getPercentageChange(metrics.appointmentsData).isPositive
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                  {getPercentageChange(metrics.appointmentsData).value}% par
                  rapport au mois précédent
                </span>
              )}
            </div>
          </div>
        </Card>

        {/* Nouveaux patients */}
        <Card className="overflow-hidden shadow-sm rounded-xl">
          <div className="p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="bg-rose-100 dark:bg-rose-900/30 p-1.5 rounded-md">
                  <User className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                </div>
                <span className="text-sm font-medium">Nouveaux patients</span>
              </div>
            </div>
            <div className="text-2xl font-bold mb-0.5">
              <CountAnimation
                value={
                  !hasData
                    ? 0
                    : metrics.newPatientsData[
                          metrics.newPatientsData.length - 1
                        ].value > 0
                      ? metrics.newPatientsData[
                          metrics.newPatientsData.length - 1
                        ].value
                      : 0
                }
              />
            </div>
            <div className="text-xs text-muted-foreground">
              {hasData && metrics.newPatientsData.length > 1 && (
                <span
                  className={`inline-flex items-center ${
                    getPercentageChange(metrics.newPatientsData).isPositive
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <TrendingUpIcon
                    className={`h-3 w-3 mr-1 ${
                      !getPercentageChange(metrics.newPatientsData).isPositive
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                  {getPercentageChange(metrics.newPatientsData).value}% par
                  rapport au mois précédent
                </span>
              )}
            </div>
          </div>
        </Card>

        {/* Soins réalisés */}
        <Card className="overflow-hidden shadow-sm rounded-xl">
          <div className="p-3">
            <div className="flex items-center justify-between mb-1.5">
              <div className="flex items-center gap-1.5">
                <div className="bg-emerald-100 dark:bg-emerald-900/30 p-1.5 rounded-md">
                  <Stethoscope className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                </div>
                <span className="text-sm font-medium">Soins réalisés</span>
              </div>
            </div>
            <div className="text-2xl font-bold mb-0.5">
              <CountAnimation
                value={
                  !hasData
                    ? 0
                    : metrics.treatmentsData[metrics.treatmentsData.length - 1]
                          ?.value > 0
                      ? metrics.treatmentsData[
                          metrics.treatmentsData.length - 1
                        ].value
                      : 0
                }
              />
            </div>
            <div className="text-xs text-muted-foreground">
              {hasData && metrics.treatmentsData.length > 1 && (
                <span
                  className={`inline-flex items-center ${
                    getPercentageChange(metrics.treatmentsData).isPositive
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <TrendingUpIcon
                    className={`h-3 w-3 mr-1 ${
                      !getPercentageChange(metrics.treatmentsData).isPositive
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                  {getPercentageChange(metrics.treatmentsData).value}% par
                  rapport au mois précédent
                </span>
              )}
            </div>
          </div>
        </Card>

        {/* Satisfaction client */}
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
              <CountAnimation
                value={
                  !hasData
                    ? 0
                    : metrics.satisfactionData[
                          metrics.satisfactionData.length - 1
                        ].value > 0
                      ? metrics.satisfactionData[
                          metrics.satisfactionData.length - 1
                        ].value
                      : 0
                }
              />
              <span className="text-xs font-medium ml-1">%</span>
            </div>
            <div className="text-xs text-muted-foreground">
              {hasData && metrics.satisfactionData.length > 1 && (
                <span
                  className={`inline-flex items-center ${
                    getPercentageChange(metrics.satisfactionData).isPositive
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  <TrendingUpIcon
                    className={`h-3 w-3 mr-1 ${
                      !getPercentageChange(metrics.satisfactionData).isPositive
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                  {getPercentageChange(metrics.satisfactionData).value}% par
                  rapport au mois précédent
                </span>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Modals pour les graphiques détaillés */}
      {hasData && (
        <>
          {renderChart(metrics.appointmentsData, "Rendez-vous", "#6366f1")}
          {renderChart(metrics.newPatientsData, "Nouveaux patients", "#f43f5e")}
          {renderChart(metrics.treatmentsData, "Soins réalisés", "#10b981")}
          {renderChart(
            metrics.satisfactionData,
            "Satisfaction client",
            "#f59e0b",
          )}
        </>
      )}

      {/* Utilisation de notre nouveau composant AnimalCredenza */}
      <AnimalCredenza
        isOpen={animalDetailsOpen}
        onOpenChange={setAnimalDetailsOpen}
        animalDetails={animalDetails}
      />
    </div>
  );
};
