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
  CalendarIcon,
  HeartPulseIcon,
  TrendingUpIcon,
  Info,
  Users,
  Weight,
  Heart,
  Clock,
  CheckCircle2,
  AlertCircle,
  Shield,
  Activity,
  Pen,
  FileClock,
  LayoutGrid,
  FileText,
  BookOpen,
  ArrowRightCircle,
  BellRing,
  User,
  Calendar,
  Cat,
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
  CredenzaBody,
  CredenzaFooter,
  CredenzaClose,
} from "@/components/ui";
import { Credenza } from "@/components/ui";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AnimalCredenza } from "./unified-metrics/AnimalCredenza";
import { ActiveTab, AnimalDetails } from "./unified-metrics/types";

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
  const [animalDetailsOpen, setAnimalDetailsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "info" | "vaccinations" | "medical" | "appointments" | "documents"
  >("info");

  // Formatage de la date
  const today = new Date();
  const formattedDate = today.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  // Données enrichies pour la fiche de l'animal
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
    // Vaccinations
    vaccinations: [
      {
        id: "vax-001",
        name: "Typhus",
        date: "2023-04-12",
        expiryDate: "2024-04-12",
        status: "valid",
        notes: "Aucune réaction adverse",
        veterinarian: "Martinez",
      },
      {
        id: "vax-002",
        name: "Leucose",
        date: "2023-04-12",
        expiryDate: "2024-04-12",
        status: "valid",
        veterinarian: "Martinez",
      },
      {
        id: "vax-003",
        name: "Rage",
        date: "2021-06-30",
        expiryDate: "2023-06-30",
        status: "expired",
        notes: "À renouveler",
        veterinarian: "Lopez",
      },
      {
        id: "vax-004",
        name: "Coryza",
        date: "2023-10-15",
        status: "upcoming",
        veterinarian: "Martinez",
      },
    ],
    // Dossier médical
    medicalRecords: [
      {
        id: "med-001",
        type: "consultation",
        date: "2023-04-12",
        diagnosis: "Examen général",
        symptoms: ["Perte d'appétit légère"],
        treatment: "Aucun traitement nécessaire",
        notes: "Animal en bonne santé générale",
        veterinarian: "Martinez",
      },
      {
        id: "med-002",
        type: "treatment",
        date: "2023-01-03",
        diagnosis: "Infection urinaire",
        symptoms: ["Douleur à la miction", "Urine fréquente", "Léchargie"],
        treatment: "Antibiotiques pendant 10 jours",
        prescriptions: [
          "Amoxicilline 50mg 2x/jour pendant 10 jours",
          "Augmenter l'apport en eau",
        ],
        notes: "Suivi dans 2 semaines pour vérifier l'évolution",
        veterinarian: "Lopez",
      },
      {
        id: "med-003",
        type: "surgery",
        date: "2021-03-20",
        diagnosis: "Stérilisation",
        treatment: "Castration chirurgicale",
        prescriptions: [
          "Anti-inflammatoires 5 jours",
          "Repos strict pendant 7 jours",
        ],
        notes: "Intervention sans complications",
        veterinarian: "Martinez",
      },
    ],
    // Rendez-vous
    appointments: [
      {
        id: "apt-001",
        date: "2023-10-09",
        time: "14:30",
        duration: 30,
        type: "vaccination",
        status: "scheduled",
        notes: "Rappel vaccins typhus et leucose",
        veterinarian: "Martinez",
      },
      {
        id: "apt-002",
        date: "2023-04-12",
        time: "10:30",
        duration: 45,
        type: "check-up",
        status: "completed",
        notes: "Bilan de santé annuel",
        veterinarian: "Martinez",
      },
      {
        id: "apt-003",
        date: "2023-01-03",
        time: "15:00",
        duration: 30,
        type: "emergency",
        status: "completed",
        notes: "Consultation d'urgence pour infection urinaire",
        veterinarian: "Lopez",
      },
    ],
    // Documents
    documents: [
      {
        id: "doc-001",
        title: "Carnet de vaccination",
        type: "certificate",
        date: "2023-04-12",
        fileUrl: "/documents/cat-vaccination.pdf",
        fileType: "pdf",
        uploadedBy: "Dr. Martinez",
      },
      {
        id: "doc-002",
        title: "Ordonnance - Infection urinaire",
        type: "prescription",
        date: "2023-01-03",
        fileUrl: "/documents/urinary-prescription.pdf",
        fileType: "pdf",
        uploadedBy: "Dr. Lopez",
      },
      {
        id: "doc-003",
        title: "Résultats analyses sanguines",
        type: "lab-result",
        date: "2023-04-12",
        fileUrl: "/documents/blood-test.pdf",
        fileType: "pdf",
        uploadedBy: "Laboratoire VetLab",
      },
      {
        id: "doc-004",
        title: "Certificat de stérilisation",
        type: "certificate",
        date: "2021-03-20",
        fileUrl: "/documents/sterilization.pdf",
        fileType: "pdf",
        uploadedBy: "Dr. Martinez",
      },
    ],
  };

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
            <div className="text-xs text-muted-foreground">
              Aujourd&apos;hui
            </div>
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
        <CardHeader className="pb-2 pt-4">
          <CardTitle>Prochain rendez-vous</CardTitle>
        </CardHeader>
        <CardContent className="px-4 pb-4 pt-0">
          <div className="rounded-xl overflow-hidden border shadow-md bg-background/50 animate-in slide-in-from-bottom-4 duration-500">
            {/* En-tête avec heure et statut */}
            <div className="bg-primary/10 px-4 py-2.5 flex justify-between items-center border-b border-primary/20">
              <div className="flex items-center">
                <Clock className="h-3.5 w-3.5 text-primary mr-1.5 animate-in spin-in-90 duration-500 fade-in" />
                <span className="text-primary font-medium">09:30</span>
                <div className="mx-2 h-1 w-1 rounded-full bg-muted-foreground/30"></div>
                <span className="text-muted-foreground text-sm">
                  {formattedDate}
                </span>
              </div>
              <Badge
                variant="outline"
                className="bg-green-50/80 dark:bg-green-900/20 text-green-700 dark:text-green-400 border-green-100 dark:border-green-800 text-xs px-2 py-0.5 font-medium group relative"
              >
                <span>Confirmé</span>
              </Badge>
            </div>

            {/* Contenu principal */}
            <div className="px-4 py-3.5 bg-card">
              <div className="flex items-center mb-3">
                <div className="h-8 w-8 rounded-full bg-primary/15 flex items-center justify-center mr-3 shadow-sm hover:scale-110 transition-transform duration-300">
                  <Cat className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-card-foreground">Félix</div>
                  <div className="text-xs text-muted-foreground">
                    Chat européen • 4 ans • 4,2 kg
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-1.5">
                  <User className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">
                    M. Dupont
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs px-2.5 text-primary hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-300 hover:translate-x-0.5"
                  onClick={() => setAnimalDetailsOpen(true)}
                >
                  Fiche complète
                  <ChevronRight className="ml-1 h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals pour les graphiques détaillés */}
      {renderChart(appointmentsData, "Rendez-vous", "#6366f1")}
      {renderChart(newPatientsData, "Nouveaux patients", "#f43f5e")}
      {renderChart(treatmentsData, "Soins réalisés", "#10b981")}
      {renderChart(satisfactionData, "Satisfaction client", "#f59e0b")}

      {/* Utilisation de notre nouveau composant AnimalCredenza */}
      <AnimalCredenza
        isOpen={animalDetailsOpen}
        onOpenChange={setAnimalDetailsOpen}
        animalDetails={animalDetails}
      />
    </div>
  );
};
