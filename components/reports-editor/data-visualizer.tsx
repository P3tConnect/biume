"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import {
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Pie,
  Cell
} from "recharts";
import {
  BarChart2,
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  FileDown,
  Plus,
  Settings,
  RefreshCw,
  ArrowUpDown
} from "lucide-react";

// Données simulées
const MOCK_SPECIES_DATA = [
  { name: "Chiens", value: 45 },
  { name: "Chats", value: 38 },
  { name: "NAC", value: 12 },
  { name: "Équins", value: 3 },
  { name: "Autres", value: 2 }
];

const MOCK_MONTHLY_VISITS = [
  { month: "Jan", visites: 65 },
  { month: "Fév", visites: 78 },
  { month: "Mar", visites: 92 },
  { month: "Avr", visites: 85 },
  { month: "Mai", visites: 76 },
  { month: "Juin", visites: 83 },
  { month: "Juil", visites: 96 },
  { month: "Août", visites: 88 },
  { month: "Sep", visites: 70 },
  { month: "Oct", visites: 72 },
  { month: "Nov", visites: 82 },
  { month: "Déc", visites: 91 }
];

const MOCK_PROCEDURE_DATA = [
  { name: "Consultations", value: 420 },
  { name: "Vaccinations", value: 285 },
  { name: "Chirurgies", value: 105 },
  { name: "Dentisterie", value: 87 },
  { name: "Imagerie", value: 68 },
  { name: "Laboratoire", value: 130 }
];

const MOCK_AGE_DISTRIBUTION = [
  { age: "0-1 an", chiens: 45, chats: 36, nac: 15 },
  { age: "1-5 ans", chiens: 86, chats: 72, nac: 23 },
  { age: "5-10 ans", chiens: 65, chats: 53, nac: 14 },
  { age: "10+ ans", chiens: 38, chats: 29, nac: 4 }
];

// Palettes de couleurs
const COLORS = ['#22c55e', '#3b82f6', '#f97316', '#a855f7', '#f43f5e', '#14b8a6'];
const COLORS_PASTEL = ['#86efac', '#93c5fd', '#fdba74', '#d8b4fe', '#fda4af', '#99f6e4'];

export function DataVisualizer() {
  const [chartType, setChartType] = useState<string>("species");
  const [timeRange, setTimeRange] = useState<string>("12months");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshData = () => {
    setIsLoading(true);
    // Simulation d'un chargement
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const exportChart = () => {
    // Logique pour exporter le graphique en PNG/PDF
    console.log("Exporting chart:", chartType);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <CardTitle>Données & Analytiques</CardTitle>
              <CardDescription>
                Visualisez et analysez les données de votre clinique
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={refreshData} disabled={isLoading}>
                <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                Actualiser
              </Button>
              <Button variant="outline" onClick={exportChart}>
                <FileDown className="h-4 w-4 mr-2" />
                Exporter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <Tabs value={chartType} onValueChange={setChartType} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4">
                <TabsTrigger value="species" className="flex items-center gap-2">
                  <PieChartIcon className="h-4 w-4" />
                  <span>Espèces</span>
                </TabsTrigger>
                <TabsTrigger value="visits" className="flex items-center gap-2">
                  <LineChartIcon className="h-4 w-4" />
                  <span>Visites</span>
                </TabsTrigger>
                <TabsTrigger value="procedures" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  <span>Procédures</span>
                </TabsTrigger>
                <TabsTrigger value="age" className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4" />
                  <span>Âge</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="w-full sm:w-auto">
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Période" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3months">3 derniers mois</SelectItem>
                  <SelectItem value="6months">6 derniers mois</SelectItem>
                  <SelectItem value="12months">12 derniers mois</SelectItem>
                  <SelectItem value="ytd">Année en cours</SelectItem>
                  <SelectItem value="custom">Personnalisé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="h-[400px] w-full">
            {chartType === "species" && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_SPECIES_DATA}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {MOCK_SPECIES_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} patients`, 'Nombre']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}

            {chartType === "visits" && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={MOCK_MONTHLY_VISITS}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="visites"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}

            {chartType === "procedures" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={MOCK_PROCEDURE_DATA}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" name="Nombre" fill="#22c55e">
                    {MOCK_PROCEDURE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            )}

            {chartType === "age" && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={MOCK_AGE_DISTRIBUTION}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="chiens" name="Chiens" fill="#3b82f6" />
                  <Bar dataKey="chats" name="Chats" fill="#22c55e" />
                  <Bar dataKey="nac" name="NAC" fill="#f97316" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Total Patients</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-3xl font-bold">1,247</div>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <span className="text-green-500 flex items-center">
                    <ArrowUpDown className="h-4 w-4 mr-1" />
                    +12.5%
                  </span>
                  <span className="ml-2">vs période précédente</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Nouvelles Admissions</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-3xl font-bold">183</div>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <span className="text-green-500 flex items-center">
                    <ArrowUpDown className="h-4 w-4 mr-1" />
                    +8.2%
                  </span>
                  <span className="ml-2">vs période précédente</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Procédures</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-3xl font-bold">952</div>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <span className="text-green-500 flex items-center">
                    <ArrowUpDown className="h-4 w-4 mr-1" />
                    +15.3%
                  </span>
                  <span className="ml-2">vs période précédente</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="p-4">
                <CardTitle className="text-lg">Taux de retour</CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="text-3xl font-bold">76%</div>
                <p className="text-sm text-muted-foreground flex items-center mt-1">
                  <span className="text-green-500 flex items-center">
                    <ArrowUpDown className="h-4 w-4 mr-1" />
                    +2.1%
                  </span>
                  <span className="ml-2">vs période précédente</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Paramètres du graphique</CardTitle>
              <CardDescription>
                Personnalisez l&apos;apparence et les données de vos graphiques
              </CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configurer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chart-title">Titre du graphique</Label>
              <Input id="chart-title" placeholder="Saisissez un titre..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="chart-type">Type de graphique</Label>
              <Select defaultValue="pie">
                <SelectTrigger id="chart-type">
                  <SelectValue placeholder="Sélectionnez un type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pie">Camembert</SelectItem>
                  <SelectItem value="bar">Barres</SelectItem>
                  <SelectItem value="line">Courbe</SelectItem>
                  <SelectItem value="area">Aire</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="data-source">Source de données</Label>
              <Select defaultValue="patients">
                <SelectTrigger id="data-source">
                  <SelectValue placeholder="Sélectionnez une source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="patients">Patients</SelectItem>
                  <SelectItem value="procedures">Procédures</SelectItem>
                  <SelectItem value="revenue">Revenus</SelectItem>
                  <SelectItem value="custom">Personnalisé</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Rapports enregistrés</CardTitle>
              <CardDescription>
                Vos graphiques et rapports statistiques enregistrés
              </CardDescription>
            </div>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau rapport
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-md p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <BarChart2 className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">Aucun rapport enregistré</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                Vous n&apos;avez pas encore enregistré de rapports statistiques.
                Créez et enregistrez des visualisations de données pour les réutiliser dans vos rapports.
              </p>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Créer un rapport
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 