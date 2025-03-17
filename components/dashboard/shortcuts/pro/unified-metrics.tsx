"use client"

import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CountAnimation } from "@/components/count-animation"
import { Stethoscope, CalendarIcon, HeartPulseIcon, TrendingUpIcon, User, RefreshCcw } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { CredenzaContent, CredenzaTitle, CredenzaHeader, Skeleton } from "@/components/ui"
import { Credenza } from "@/components/ui"
import { AnimalCredenza } from "./unified-metrics/AnimalCredenza"
import { getMetricsAction } from "@/src/actions/metrics.action"
import { useQuery } from "@tanstack/react-query"
import { getProNextAppointment } from "@/src/actions/appointments.action"
import { Appointment, Pet, User as UserType } from "@/src/db"
import { MetricData } from "@/types/metric-data"
import { getCurrentOrganization } from "@/src/actions"

// Données de secours (fallback) en cas d'échec du chargement
const fallbackData: MetricData = {
  currentMonth: {
    appointments: 20,
    newPatients: 40,
    treatments: 110,
    satisfaction: 95,
  },
  previousMonth: {
    appointments: 20,
    newPatients: 40,
    treatments: 110,
    satisfaction: 95,
  },
  currentMonthLabel: "Janvier 2024",
  previousMonthLabel: "Février 2024",
  // Chart data arrays
  appointmentsData: [
    { month: "Sep", value: 15 },
    { month: "Oct", value: 18 },
    { month: "Nov", value: 22 },
    { month: "Déc", value: 19 },
    { month: "Jan", value: 20 },
  ],
  newPatientsData: [
    { month: "Sep", value: 30 },
    { month: "Oct", value: 35 },
    { month: "Nov", value: 38 },
    { month: "Déc", value: 42 },
    { month: "Jan", value: 40 },
  ],
  treatmentsData: [
    { month: "Sep", value: 90 },
    { month: "Oct", value: 95 },
    { month: "Nov", value: 105 },
    { month: "Déc", value: 108 },
    { month: "Jan", value: 110 },
  ],
  satisfactionData: [
    { month: "Sep", value: 92 },
    { month: "Oct", value: 93 },
    { month: "Nov", value: 94 },
    { month: "Déc", value: 94 },
    { month: "Jan", value: 95 },
  ],
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg shadow-lg p-3">
        <p className="font-medium mb-1">{label}</p>
        <p className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{payload[0].value}</span>
        </p>
      </div>
    )
  }
  return null
}

export const UnifiedMetrics = () => {
  const [openDialog, setOpenDialog] = useState<string | null>(null)
  const [animalDetailsOpen, setAnimalDetailsOpen] = useState(false)
  const [selectedMonths, setSelectedMonths] = useState(6) // Nombre de mois à afficher par défaut

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
        const result = await getMetricsAction({ months: selectedMonths })

        // En cas d'erreur dans les résultats
        if ("error" in result) {
          console.error("Erreur dans les métriques:", result.error)
          return fallbackData
        }

        // Si le résultat a une propriété data, on l'utilise
        if ("data" in result) {
          return result.data
        }

        // Sinon on renvoie directement le résultat
        return result
      } catch (error) {
        console.error("Erreur lors de la récupération des métriques:", error)
        return fallbackData
      }
    },
  })

  const { data: nextAppointment, isLoading: nextAppointmentLoading } = useQuery({
    queryKey: ["nextAppointment"],
    queryFn: async () => getProNextAppointment({}),
  })

  console.log(nextAppointment, "nextAppointment")

  const nextAppointmentData = nextAppointment?.data?.nextAppointment as Appointment
  const nextAppointmentClient = nextAppointment?.data?.client as UserType
  const nextAppointmentPets = nextAppointmentData?.pets?.map(pa => pa.pet) || []

  // Utiliser les données récupérées ou les données de secours en cas d'erreur
  const metrics: MetricData = metricsData || fallbackData

  // Vérifier si les données sont disponibles avant de les utiliser
  const hasData =
    metrics &&
    metrics.currentMonth.appointments > 0 &&
    metrics.currentMonth.newPatients > 0 &&
    metrics.currentMonth.treatments > 0 &&
    metrics.currentMonth.satisfaction > 0

  const getPercentageChange = (dataArray: any[], isPositiveGood = true) => {
    if (!dataArray || dataArray.length < 2) return { value: 0, isPositive: true }

    const current = dataArray[dataArray.length - 1].value
    const previous = dataArray[dataArray.length - 2].value

    // Éviter division par zéro
    if (previous === 0) return { value: 0, isPositive: true }

    const percentage = ((current - previous) / previous) * 100
    const isPositive = isPositiveGood ? current >= previous : current <= previous

    return {
      value: Math.abs(percentage).toFixed(1),
      isPositive,
    }
  }

  const renderChart = (data: any[], title: string, color: string) => {
    if (!data || data.length < 2) return null

    const currentValue = data[data.length - 1].value
    const previousValue = data[data.length - 2].value
    const { value: percentageChange, isPositive } = getPercentageChange(data)

    return (
      <Credenza open={openDialog === title} onOpenChange={() => setOpenDialog(null)}>
        <CredenzaContent className="sm:max-w-[600px] p-10">
          <CredenzaHeader>
            <CredenzaTitle className="flex items-center justify-between">
              <span>{title}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Évolution</span>
                <div className={`flex items-center gap-1 text-sm ${isPositive ? "text-green-600" : "text-red-600"}`}>
                  <TrendingUpIcon className={`w-4 h-4 ${!isPositive && "rotate-180"}`} />
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
                  {Math.round(data.reduce((acc, curr) => acc + curr.value, 0) / data.length)}
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
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#888888", fontSize: 12 }} dx={-10} />
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
    )
  }

  // Afficher un état de chargement pendant que les données sont récupérées
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Rendez-vous */}
          <Card className="border rounded-xl shadow-none cursor-pointer transition-colors hover:bg-muted/5">
            <div className="p-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Rendez-vous</span>
                  <CalendarIcon className="w-4 h-4 text-indigo-500" />
                </div>
                <div className="text-2xl font-semibold">
                  <Skeleton className="h-8 w-16" />
                </div>
                <div className="text-xs mt-1">
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          </Card>

          {/* Nouveaux patients */}
          <Card className="border rounded-xl shadow-none cursor-pointer transition-colors hover:bg-muted/5">
            <div className="p-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Nouveaux patients</span>
                  <User className="w-4 h-4 text-rose-500" />
                </div>
                <div className="text-2xl font-semibold">
                  <Skeleton className="h-8 w-16" />
                </div>
                <div className="text-xs mt-1">
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          </Card>

          {/* Soins réalisés */}
          <Card className="border rounded-xl shadow-none cursor-pointer transition-colors hover:bg-muted/5">
            <div className="p-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Soins réalisés</span>
                  <Stethoscope className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="text-2xl font-semibold">
                  <Skeleton className="h-8 w-16" />
                </div>
                <div className="text-xs mt-1">
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          </Card>

          {/* Satisfaction client */}
          <Card className="border rounded-xl shadow-none cursor-pointer transition-colors hover:bg-muted/5">
            <div className="p-3">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-muted-foreground">Satisfaction</span>
                  <HeartPulseIcon className="w-4 h-4 text-amber-500" />
                </div>
                <div className="text-2xl font-semibold">
                  <Skeleton className="h-8 w-16" />
                </div>
                <div className="text-xs mt-1">
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Prochain rendez-vous - skeleton */}
        <Card className="border rounded-xl shadow-none">
          <div className="p-4">
            <h3 className="text-sm font-medium mb-3">Prochain rendez-vous</h3>
            <div className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <Skeleton className="h-6 w-6 rounded-full" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Skeleton className="h-5 w-16 mb-1" />
                <Skeleton className="h-3 w-20" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    )
  }

  // Afficher un message d'erreur si la récupération des données a échoué
  if (isError && !hasData) {
    return (
      <div className="p-6 border border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900 rounded-lg">
        <h3 className="text-red-700 dark:text-red-400 font-medium mb-2">Erreur de chargement des métriques</h3>
        <p className="text-sm text-red-600 dark:text-red-300">
          Impossible de récupérer les métriques. Veuillez réessayer plus tard.
        </p>
        <Button variant="outline" className="mt-4 text-sm" onClick={() => refetch()}>
          <RefreshCcw className="h-4 w-4 mr-2" />
          Réessayer
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Rendez-vous */}
        <Card
          className="border rounded-xl shadow-none cursor-pointer transition-colors hover:bg-muted/5"
          onClick={() => setOpenDialog("Rendez-vous")}
        >
          <div className="p-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Rendez-vous</span>
                <CalendarIcon className="w-4 h-4 text-indigo-500" />
              </div>
              <div className="text-2xl font-semibold">
                {metrics.appointmentsData[metrics.appointmentsData.length - 1].value > 0 ? (
                  <CountAnimation value={metrics.appointmentsData[metrics.appointmentsData.length - 1].value} />
                ) : (
                  <p className="text-2xl font-semibold">0</p>
                )}
              </div>
              {hasData && metrics.appointmentsData.length > 1 && (
                <div className="text-xs mt-1">
                  <span
                    className={`${
                      getPercentageChange(metrics.appointmentsData).isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {getPercentageChange(metrics.appointmentsData).value}%
                  </span>
                  <span className="text-muted-foreground ml-1">vs mois précédent</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Nouveaux patients */}
        <Card
          className="border rounded-xl shadow-none cursor-pointer transition-colors hover:bg-muted/5"
          onClick={() => setOpenDialog("Nouveaux patients")}
        >
          <div className="p-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Nouveaux patients</span>
                <User className="w-4 h-4 text-rose-500" />
              </div>
              <div className="text-2xl font-semibold">
                {metrics.newPatientsData[metrics.newPatientsData.length - 1].value > 0 ? (
                  <CountAnimation value={metrics.newPatientsData[metrics.newPatientsData.length - 1].value} />
                ) : (
                  <p className="text-2xl font-semibold">0</p>
                )}
              </div>
              {hasData && metrics.newPatientsData.length > 1 && (
                <div className="text-xs mt-1">
                  <span
                    className={`${
                      getPercentageChange(metrics.newPatientsData).isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {getPercentageChange(metrics.newPatientsData).value}%
                  </span>
                  <span className="text-muted-foreground ml-1">vs mois précédent</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Soins réalisés */}
        <Card
          className="border rounded-xl shadow-none cursor-pointer transition-colors hover:bg-muted/5"
          onClick={() => setOpenDialog("Soins réalisés")}
        >
          <div className="p-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Soins réalisés</span>
                <Stethoscope className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-2xl font-semibold">
                {metrics.treatmentsData[metrics.treatmentsData.length - 1].value > 0 ? (
                  <CountAnimation value={metrics.treatmentsData[metrics.treatmentsData.length - 1].value} />
                ) : (
                  <p className="text-2xl font-semibold">0</p>
                )}
              </div>
              {hasData && metrics.treatmentsData.length > 1 && (
                <div className="text-xs mt-1">
                  <span
                    className={`${
                      getPercentageChange(metrics.treatmentsData).isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {getPercentageChange(metrics.treatmentsData).value}%
                  </span>
                  <span className="text-muted-foreground ml-1">vs mois précédent</span>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Satisfaction client */}
        <Card
          className="border rounded-xl shadow-none cursor-pointer transition-colors hover:bg-muted/5"
          onClick={() => setOpenDialog("Satisfaction client")}
        >
          <div className="p-3">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Satisfaction</span>
                <HeartPulseIcon className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-2xl font-semibold">
                {metrics.satisfactionData[metrics.satisfactionData.length - 1].value > 0 ? (
                  <CountAnimation value={metrics.satisfactionData[metrics.satisfactionData.length - 1].value} />
                ) : (
                  <p className="text-2xl font-semibold">0%</p>
                )}
              </div>
              {hasData && metrics.satisfactionData.length > 1 && (
                <div className="text-xs mt-1">
                  <span
                    className={`${
                      getPercentageChange(metrics.satisfactionData).isPositive ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {getPercentageChange(metrics.satisfactionData).value}%
                  </span>
                  <span className="text-muted-foreground ml-1">vs mois précédent</span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </div>

      {/* Prochain rendez-vous */}
      <Card className="border rounded-xl shadow-none">
        <CardHeader>
          <CardTitle>Prochain rendez-vous</CardTitle>
        </CardHeader>
        <CardContent>
          {nextAppointmentLoading ? (
            <div className="p-3">
              <Skeleton className="h-10 w-full" />
            </div>
          ) : nextAppointment?.data?.client != null ||
            nextAppointment?.data?.nextAppointment != null ||
            nextAppointment?.data?.pet != null ? (
            <div
              className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => setAnimalDetailsOpen(true)}
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {nextAppointmentPets.map(pet => (
                    <div
                      key={pet.id}
                      className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-background"
                    >
                      {pet.image ? (
                        <img src={pet.image} alt={pet.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className="h-6 w-6 text-slate-600 dark:text-slate-400" />
                      )}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="font-medium">{nextAppointmentPets.map(pet => pet.name).join(", ")}</p>
                  <p className="text-xs text-muted-foreground">{nextAppointmentData?.service?.name}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Badge variant="secondary">
                  {nextAppointmentData?.slot?.start.toLocaleString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Badge>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-6 space-y-3 text-center border-2 border-dashed rounded-lg border-muted">
              <CalendarIcon className="w-12 h-12 text-muted-foreground/50" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Aucun rendez-vous à venir</p>
                <p className="text-xs text-muted-foreground/75 mt-1">
                  Commencez à planifier vos consultations pour voir apparaître votre prochain rendez-vous ici
                </p>
              </div>
              <Button variant="outline" size="sm" className="mt-2">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Planifier un rendez-vous
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modals pour les graphiques détaillés */}
      {hasData && (
        <>
          {renderChart(metrics.appointmentsData, "Rendez-vous", "#6366f1")}
          {renderChart(metrics.newPatientsData, "Nouveaux patients", "#f43f5e")}
          {renderChart(metrics.treatmentsData, "Soins réalisés", "#10b981")}
          {renderChart(metrics.satisfactionData, "Satisfaction client", "#f59e0b")}
        </>
      )}

      {/* Utilisation de notre nouveau composant AnimalCredenza */}
      {nextAppointmentPets.map(pet => (
        <AnimalCredenza key={pet.id} isOpen={animalDetailsOpen} onOpenChange={setAnimalDetailsOpen} petId={pet.id} />
      ))}
    </div>
  )
}
