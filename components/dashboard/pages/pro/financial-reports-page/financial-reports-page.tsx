"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { DateRangePicker } from "@/components/ui/date-range-picker";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  FileText,
  Plus,
  Download,
  FileSpreadsheet,
  Filter,
  Printer,
  Share2,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Calendar,
  ChevronRight,
  ArrowUpRight,
  ArrowDownRight,
  Briefcase,
  Search,
  AlertTriangle,
  Award,
  Target,
  Banknote,
  FileQuestion,
  CreditCard,
  Settings,
  Clock,
  Tag,
  ChevronDown,
  RefreshCw,
  Book,
  PieChart,
  BarChart4,
  LineChart,
  BarChart2,
  LayoutGrid,
  Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/src/lib";

import { MetricsGrid } from "./components/MetricsGrid";
import { RevenueAnalytics } from "./components/RevenueAnalytics";
import { RevenueSourcesPieChart } from "./components/RevenueSourcesPieChart";
import { MonthlyReports } from "./components/MonthlyReports";
import { YearlyComparison } from "./components/YearlyComparison";
import { ExpenseBreakdown } from "./components/ExpenseBreakdown";
import { ReportActions } from "./components/ReportActions";

const mockData = {
  metrics: {
    totalRevenue: 124500,
    averageTicket: 850,
    profitMargin: 32,
    yearGrowth: 15,
    revenueTarget: 150000,
    cashflow: 18500,
    pendingInvoices: 12300,
    clientRetention: 86
  },
  monthlyData: [
    { month: "Jan", revenue: 14000, expenses: 8400, profit: 5600 },
    { month: "Feb", revenue: 13000, expenses: 7398, profit: 5602 },
    { month: "Mar", revenue: 12000, expenses: 6800, profit: 5200 },
    { month: "Apr", revenue: 12780, expenses: 7908, profit: 4872 },
    { month: "May", revenue: 11890, expenses: 6800, profit: 5090 },
    { month: "Jun", revenue: 12390, expenses: 7800, profit: 4590 },
  ],
  revenueBySource: [
    { name: "Consultations", value: 45000, growth: 8, color: "#4338ca" },
    { name: "Traitements", value: 32000, growth: 5, color: "#8b5cf6" },
    { name: "Produits", value: 21000, growth: -2, color: "#ec4899" },
    { name: "Chirurgies", value: 18500, growth: 12, color: "#06b6d4" },
    { name: "Autres", value: 8000, growth: 1, color: "#14b8a6" },
  ],
  monthlyReports: [
    {
      id: "rep_01",
      month: "Janvier 2024",
      revenue: 14000,
      expenses: 8400,
      profit: 5600,
      growth: 8.2,
      status: "generated",
    },
    {
      id: "rep_02",
      month: "Février 2024",
      revenue: 13000,
      expenses: 7398,
      profit: 5602,
      growth: 5.4,
      status: "generated",
    },
    {
      id: "rep_03",
      month: "Mars 2024",
      revenue: 12000,
      expenses: 6800,
      profit: 5200,
      growth: -2.1,
      status: "pending",
    },
  ],
  yearlyData: {
    currentYear: {
      revenue: 124500,
      expenses: 82300,
      profit: 42200,
    },
    previousYear: {
      revenue: 108200,
      expenses: 75400,
      profit: 32800,
    },
  },
  expenseCategories: [
    { category: "Équipement", amount: 28000, budget: 30000 },
    { category: "Marketing", amount: 15000, budget: 14000 },
    { category: "Personnel", amount: 25000, budget: 25000 },
    { category: "Fournitures", amount: 8000, budget: 7500 },
    { category: "Loyer", amount: 12000, budget: 12000 },
    { category: "Autres", amount: 4000, budget: 5000 },
  ],
  alerts: [
    { type: "warning", message: "Dépenses de marketing au-dessus du budget", date: "Aujourd'hui" },
    { type: "info", message: "Trésorerie en augmentation de 5% ce mois-ci", date: "Hier" },
    { type: "error", message: "3 factures en retard de paiement > 30 jours", date: "Il y a 2 jours" },
  ],
  topClients: [
    { name: "Clinique Saint-Bernard", revenue: 12400, growth: 15, avatar: "/avatars/clinic1.png" },
    { name: "Cabinet Vétérinaire du Parc", revenue: 8700, growth: 8, avatar: "/avatars/clinic2.png" },
    { name: "Centre Animalier Bellevue", revenue: 7200, growth: -3, avatar: "/avatars/clinic3.png" },
  ],
  predictiveInsights: [
    { title: "Prévision de croissance T3", value: "+8.5%", description: "Basée sur les tendances actuelles et saisonnalité" },
    { title: "Optimisation des prix", value: "+4.2% revenu", description: "Potentiel d'augmentation via ajustement tarifaire" },
    { title: "Réduction des coûts", value: "-5.1% dépenses", description: "Opportunités identifiées dans les fournitures" },
  ]
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
};

const formatPercent = (value: number) => {
  return `${value > 0 ? '+' : ''}${value}%`;
};

const FinancialDashboardHeader = () => {
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-100 dark:border-blue-900/50 p-6 rounded-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 border-blue-200 dark:border-blue-800">
                <LineChart className="size-3 mr-1" />
                Finance Pro
              </Badge>
              <Badge variant="outline" className="bg-white/50 dark:bg-gray-950/50">
                <Clock className="size-3 mr-1" />
                Mis à jour aujourd'hui
              </Badge>
            </div>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Tableau de Bord Financier
            </h1>
            <p className="text-muted-foreground max-w-xl">
              Visualisez, analysez et optimisez la performance financière de votre cabinet avec des données en temps réel
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 md:mt-0">
            <div className="flex w-full sm:w-auto">
              <Button variant="outline" className="rounded-r-none border-r-0 bg-white dark:bg-gray-950">
                <Calendar className="size-4 mr-2" />
                <span>Ce mois</span>
                <ChevronDown className="size-4 ml-2" />
              </Button>
              <Button className="rounded-l-none bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 transition-all duration-300">
                <Plus className="size-4 mr-2" />
                Nouveau rapport
              </Button>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white dark:bg-gray-950">
                  <Download className="size-4 mr-2" />
                  Exporter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem className="cursor-pointer">
                  <FileSpreadsheet className="size-4 mr-2" />
                  Excel (.xlsx)
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <FileText className="size-4 mr-2" />
                  PDF (.pdf)
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Share2 className="size-4 mr-2" />
                  Partager par email
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  <Printer className="size-4 mr-2" />
                  Imprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid grid-cols-4 w-full sm:w-auto max-w-md mb-0 bg-white/60 dark:bg-gray-900/60 p-1">
              <TabsTrigger value="dashboard" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600">
                <LayoutGrid className="size-4 mr-2" />
                <span>Vue globale</span>
              </TabsTrigger>
              <TabsTrigger value="revenue" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600">
                <BarChart4 className="size-4 mr-2" />
                <span>Revenus</span>
              </TabsTrigger>
              <TabsTrigger value="expenses" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600">
                <CreditCard className="size-4 mr-2" />
                <span>Dépenses</span>
              </TabsTrigger>
              <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white dark:data-[state=active]:bg-blue-600">
                <FileText className="size-4 mr-2" />
                <span>Rapports</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Select defaultValue="current">
              <SelectTrigger className="w-full sm:w-[180px] bg-white dark:bg-gray-950">
                <Calendar className="size-4 mr-2" />
                <SelectValue placeholder="Sélectionner la période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Mois en cours</SelectItem>
                <SelectItem value="last">Mois précédent</SelectItem>
                <SelectItem value="quarter">Trimestre en cours</SelectItem>
                <SelectItem value="year">Année en cours</SelectItem>
                <SelectItem value="custom">Période personnalisée</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="icon" className="bg-white dark:bg-gray-950">
              <Filter className="size-4" />
            </Button>

            <Button variant="outline" size="icon" className="bg-white dark:bg-gray-950">
              <RefreshCw className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const KeyMetricsSection = ({ data }: { data: typeof mockData.metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Chiffre d'affaires */}
      <Card className="overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-950 shadow-md hover:shadow-lg transition-all duration-300 border-blue-100 dark:border-blue-900">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-blue-600 dark:text-blue-400">Chiffre d'affaires</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-bold">{formatCurrency(data.totalRevenue)}</span>
              </div>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900/50 rounded-full p-2.5">
              <Banknote className="size-5 text-blue-600 dark:text-blue-400" />
            </div>
          </div>

          <div className="mt-5 space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-muted-foreground">Progression annuelle</span>
              <Badge variant={data.yearGrowth >= 0 ? "secondary" : "destructive"} className="font-medium px-2.5 py-0.5">
                {data.yearGrowth >= 0 ? <TrendingUp className="size-3 mr-1" /> : <TrendingDown className="size-3 mr-1" />}
                {formatPercent(data.yearGrowth)}
              </Badge>
            </div>

            <div className="mt-4 space-y-1.5">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Vers objectif</span>
                <span className="font-medium">{Math.round(data.totalRevenue / data.revenueTarget * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-blue-100 dark:bg-blue-900/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full"
                  style={{ width: `${Math.min(data.totalRevenue / data.revenueTarget * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-muted-foreground flex items-center">
                <Target className="size-3 inline mr-1" />
                Objectif: {formatCurrency(data.revenueTarget)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Marge bénéficiaire */}
      <Card className="overflow-hidden bg-gradient-to-br from-white to-green-50 dark:from-gray-900 dark:to-green-950 shadow-md hover:shadow-lg transition-all duration-300 border-green-100 dark:border-green-900">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-green-600 dark:text-green-400">Marge bénéficiaire</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-bold">{data.profitMargin}%</span>
                <span className="text-sm text-muted-foreground">du CA</span>
              </div>
            </div>
            <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-2.5">
              <TrendingUp className="size-5 text-green-600 dark:text-green-400" />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 dark:bg-red-600" style={{ width: '20%' }}></div>
              </div>
              <span className="text-xs text-muted-foreground w-10">Faible</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 dark:bg-amber-600" style={{ width: '40%' }}></div>
              </div>
              <span className="text-xs text-muted-foreground w-10">Moyen</span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex-1 h-2.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 dark:bg-green-600" style={{ width: `${data.profitMargin}%` }}></div>
              </div>
              <span className="text-xs text-muted-foreground w-10">Bon</span>
            </div>

            <div className="flex items-center justify-between mt-1">
              <Badge variant="outline" className="bg-green-100/50 text-green-700 dark:bg-green-900/50 dark:text-green-400 border-green-200 dark:border-green-800">
                <Target className="size-3 mr-1" />
                Objectif: 35%
              </Badge>
              <span className="text-xs text-muted-foreground">+2% vs n-1</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trésorerie disponible */}
      <Card className="overflow-hidden bg-gradient-to-br from-white to-purple-50 dark:from-gray-900 dark:to-purple-950 shadow-md hover:shadow-lg transition-all duration-300 border-purple-100 dark:border-purple-900">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-purple-600 dark:text-purple-400">Trésorerie disponible</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-bold">{formatCurrency(data.cashflow)}</span>
              </div>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900/50 rounded-full p-2.5">
              <Briefcase className="size-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center justify-between p-3 bg-background rounded-lg border border-border/60">
              <div className="flex items-center gap-2">
                <CreditCard className="size-4 text-purple-500" />
                <span className="text-sm font-medium">Factures en attente</span>
              </div>
              <span className="text-sm font-bold">{formatCurrency(data.pendingInvoices)}</span>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center justify-between mt-2">
                <Badge variant="outline" className="bg-amber-100/50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400 border-amber-200 dark:border-amber-800">
                  <AlertCircle className="size-3 mr-1" />
                  3 retards de paiement
                </Badge>
                <Button variant="link" size="sm" className="h-auto p-0 text-purple-600 dark:text-purple-400">
                  Gérer
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fidélisation clients */}
      <Card className="overflow-hidden bg-gradient-to-br from-white to-amber-50 dark:from-gray-900 dark:to-amber-950 shadow-md hover:shadow-lg transition-all duration-300 border-amber-100 dark:border-amber-900">
        <CardContent className="p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-amber-600 dark:text-amber-400">Fidélisation clients</h3>
              <div className="flex items-baseline gap-2 mt-2">
                <span className="text-3xl font-bold">{data.clientRetention}%</span>
              </div>
            </div>
            <div className="bg-amber-100 dark:bg-amber-900/50 rounded-full p-2.5">
              <Users className="size-5 text-amber-600 dark:text-amber-400" />
            </div>
          </div>

          <div className="mt-5">
            <div className="w-full h-24">
              <div className="relative h-full w-full">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative size-16 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#E5E7EB"
                        strokeWidth="3"
                        strokeDasharray="100, 100"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="#F59E0B"
                        strokeWidth="3"
                        strokeDasharray={`${data.clientRetention}, 100`}
                        className="dark:stroke-amber-500"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-xs text-amber-600 dark:text-amber-400 font-medium">
                      Fidèles
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Nouveaux clients</span>
                <span className="text-sm font-medium">+15 ce mois</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-sm text-muted-foreground">Ticket moyen</span>
                <span className="text-sm font-medium">{formatCurrency(data.averageTicket)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const RevenueInsightsSection = ({
  monthlyData,
  revenueBySource
}: {
  monthlyData: typeof mockData.monthlyData,
  revenueBySource: typeof mockData.revenueBySource
}) => {
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar');
  const [timeframe, setTimeframe] = useState<'6m' | '1y' | 'all'>('6m');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <Card className="col-span-2 overflow-hidden bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30 border-blue-100/60 dark:border-blue-900/40">
        <CardHeader className="pb-2">
          <div className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-md font-semibold">Évolution des revenus</CardTitle>
              <CardDescription>Analyse mensuelle de croissance</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-secondary/50 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-3 rounded-md ${chartType === 'bar' ? 'bg-background shadow-sm' : ''}`}
                  onClick={() => setChartType('bar')}
                >
                  <BarChart2 className="size-3.5 mr-1" />
                  <span className="text-xs">Barres</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-3 rounded-md ${chartType === 'line' ? 'bg-background shadow-sm' : ''}`}
                  onClick={() => setChartType('line')}
                >
                  <LineChart className="size-3.5 mr-1" />
                  <span className="text-xs">Ligne</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-7 px-3 rounded-md ${chartType === 'area' ? 'bg-background shadow-sm' : ''}`}
                  onClick={() => setChartType('area')}
                >
                  <LineChart className="size-3.5 mr-1" />
                  <span className="text-xs">Aires</span>
                </Button>
              </div>

              <Select value={timeframe} onValueChange={(value) => setTimeframe(value as any)}>
                <SelectTrigger className="w-[100px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="6m">6 mois</SelectItem>
                  <SelectItem value="1y">1 an</SelectItem>
                  <SelectItem value="all">Tout</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-6">
          <div className="h-[260px] flex items-center justify-center">
            <RevenueAnalytics data={monthlyData} />
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mt-4 pt-4 border-t border-border/30">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/40">
                <div className="flex items-center gap-2 mb-1">
                  <div className="size-3 rounded-full bg-blue-500"></div>
                  <span className="text-xs font-medium">Revenus</span>
                </div>
                <span className="text-sm font-semibold">{formatCurrency(monthlyData.reduce((sum, item) => sum + item.revenue, 0))}</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/40">
                <div className="flex items-center gap-2 mb-1">
                  <div className="size-3 rounded-full bg-red-500"></div>
                  <span className="text-xs font-medium">Dépenses</span>
                </div>
                <span className="text-sm font-semibold">{formatCurrency(monthlyData.reduce((sum, item) => sum + item.expenses, 0))}</span>
              </div>
              <div className="flex flex-col items-center p-2 rounded-lg bg-secondary/40">
                <div className="flex items-center gap-2 mb-1">
                  <div className="size-3 rounded-full bg-emerald-500"></div>
                  <span className="text-xs font-medium">Bénéfice</span>
                </div>
                <span className="text-sm font-semibold">{formatCurrency(monthlyData.reduce((sum, item) => sum + item.profit, 0))}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-8">
                <FileSpreadsheet className="size-3.5 mr-1.5" />
                Exporter
              </Button>
              <Button size="sm" variant="outline" className="h-8">
                <Printer className="size-3.5 mr-1.5" />
                Imprimer
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/30 border-purple-100/60 dark:border-purple-900/40">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-md font-semibold">Sources de revenus</CardTitle>
              <CardDescription>Répartition par catégorie</CardDescription>
            </div>
            <Select defaultValue="percentage">
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percentage">Pourcentage</SelectItem>
                <SelectItem value="amount">Montant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[220px] flex items-center justify-center">
            <RevenueSourcesPieChart data={revenueBySource} />
          </div>

          <div className="mt-4">
            <div className="space-y-0.5">
              {revenueBySource.map((source, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary/50 transition-colors">
                  <div className="size-8 rounded-md flex items-center justify-center" style={{ backgroundColor: source.color + '20' }}>
                    <div className="size-3 rounded-full" style={{ backgroundColor: source.color }}></div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{source.name}</span>
                      <span className="text-sm font-bold">{formatCurrency(source.value)}</span>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="text-xs text-muted-foreground">{Math.round(source.value / revenueBySource.reduce((sum, src) => sum + src.value, 0) * 100)}%</span>
                      <Badge variant={source.growth >= 0 ? "secondary" : "destructive"} className="text-xs py-0 h-5">
                        {source.growth >= 0 ? <TrendingUp className="size-3 mr-1" /> : <TrendingDown className="size-3 mr-1" />}
                        {formatPercent(source.growth)}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const InsightsAndAlertsSection = ({
  predictiveInsights,
  alerts,
  topClients,
  expenseCategories
}: {
  predictiveInsights: typeof mockData.predictiveInsights,
  alerts: typeof mockData.alerts,
  topClients: typeof mockData.topClients,
  expenseCategories: typeof mockData.expenseCategories
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <Card className="overflow-hidden bg-gradient-to-br from-white to-amber-50/30 dark:from-gray-900 dark:to-amber-950/30 border-amber-100/60 dark:border-amber-900/40">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-md font-semibold flex items-center gap-2">
                <AlertTriangle className="size-4 text-amber-500" />
                <span>Alertes financières</span>
              </CardTitle>
              <CardDescription>Actions requises et informations</CardDescription>
            </div>
            <Badge variant="outline" className="font-medium bg-amber-100/50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400 border-amber-200 dark:border-amber-800">
              {alerts.length} alertes
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="max-h-[320px] overflow-auto">
            {alerts.map((alert, index) => {
              // Configuration des couleurs et icônes selon le type d'alerte
              const alertConfig = {
                warning: {
                  borderColor: "border-amber-500",
                  bgHover: "hover:bg-amber-50/50 dark:hover:bg-amber-900/20",
                  icon: <AlertTriangle className="size-4 text-amber-500" />
                },
                error: {
                  borderColor: "border-red-500",
                  bgHover: "hover:bg-red-50/50 dark:hover:bg-red-900/20",
                  icon: <AlertCircle className="size-4 text-red-500" />
                },
                info: {
                  borderColor: "border-blue-500",
                  bgHover: "hover:bg-blue-50/50 dark:hover:bg-blue-900/20",
                  icon: <FileQuestion className="size-4 text-blue-500" />
                }
              };

              const config = alertConfig[alert.type as keyof typeof alertConfig];

              return (
                <div
                  key={index}
                  className={cn(
                    "px-6 py-3 border-l-2 flex justify-between transition-colors",
                    config.borderColor,
                    config.bgHover
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {config.icon}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{alert.message}</p>
                      <div className="flex items-center gap-1.5">
                        <Clock className="size-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{alert.date}</p>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost" className="h-8">
                    <ChevronRight className="size-4" />
                  </Button>
                </div>
              );
            })}

            <div className="px-6 py-4 mt-2 border-t border-border/50">
              <Button variant="outline" className="w-full">
                <span>Voir toutes les alertes</span>
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-gradient-to-br from-white to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30 border-blue-100/60 dark:border-blue-900/40">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-md font-semibold flex items-center gap-2">
                <Award className="size-4 text-blue-500" />
                <span>Top clients</span>
              </CardTitle>
              <CardDescription>Clients générant le plus de CA</CardDescription>
            </div>
            <Select defaultValue="revenue">
              <SelectTrigger className="w-[120px] h-8">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">Par revenu</SelectItem>
                <SelectItem value="growth">Par croissance</SelectItem>
                <SelectItem value="frequency">Par fréquence</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="max-h-[320px] overflow-auto">
            {topClients.map((client, index) => (
              <div key={index} className="px-6 py-3 hover:bg-blue-50/40 dark:hover:bg-blue-900/20 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="size-10 border-2 border-blue-100 dark:border-blue-900 shadow-sm">
                      <AvatarImage src={client.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{client.name}</p>
                        {client.growth >= 10 && (
                          <Badge variant="secondary" className="h-5 px-1.5 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                            <Award className="size-3 mr-1" />
                            VIP
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <p className="text-xs text-muted-foreground">Revenu annuel: <span className="font-semibold text-foreground">{formatCurrency(client.revenue)}</span></p>
                        <div className="flex items-center gap-1">
                          <Badge variant={client.growth >= 0 ? "secondary" : "destructive"} className="h-5 text-xs">
                            {client.growth >= 0 ? <ArrowUpRight className="size-3 mr-1" /> : <ArrowDownRight className="size-3 mr-1" />}
                            {formatPercent(client.growth)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 bg-white dark:bg-gray-950">
                    <Search className="size-3.5" />
                  </Button>
                </div>
              </div>
            ))}

            <div className="px-6 py-4 mt-2 border-t border-border/50">
              <Button variant="outline" className="w-full">
                <span>Voir tous les clients</span>
                <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="overflow-hidden bg-gradient-to-br from-white to-purple-50/30 dark:from-gray-900 dark:to-purple-950/30 border-purple-100/60 dark:border-purple-900/40">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-md font-semibold flex items-center gap-2">
                <Briefcase className="size-4 text-purple-500" />
                <span>Budget par catégorie</span>
              </CardTitle>
              <CardDescription>Suivi des dépenses vs budget</CardDescription>
            </div>
            <Badge variant="outline" className="font-medium">
              <Calendar className="size-3.5 mr-1" />
              Ce mois-ci
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="max-h-[320px] overflow-auto">
            {expenseCategories.map((category, index) => {
              const percentage = (category.amount / category.budget) * 100;
              const isOverBudget = category.amount > category.budget;

              let progressColor = "bg-purple-500";
              let progressBg = "bg-purple-100 dark:bg-purple-950";

              if (percentage > 90) {
                progressColor = isOverBudget ? "bg-red-500" : "bg-amber-500";
                progressBg = isOverBudget ? "bg-red-100 dark:bg-red-950" : "bg-amber-100 dark:bg-amber-950";
              }

              return (
                <div key={index} className="px-6 py-3 hover:bg-purple-50/40 dark:hover:bg-purple-900/20 transition-colors">
                  <div className="flex justify-between items-center mb-1">
                    <div className="flex items-center gap-2">
                      <div className={`size-2 rounded-full ${progressColor}`}></div>
                      <p className="text-sm font-medium">{category.category}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-xs">
                        <span className="font-semibold">{formatCurrency(category.amount)}</span>
                        <span className="text-muted-foreground"> / {formatCurrency(category.budget)}</span>
                      </p>
                      {isOverBudget && (
                        <Badge variant="destructive" className="text-xs font-medium h-5">
                          Dépassé
                        </Badge>
                      )}
                      {!isOverBudget && percentage > 90 && (
                        <Badge variant="outline" className="bg-amber-100/50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-400 border-amber-200 dark:border-amber-800 text-xs font-medium h-5">
                          Proche
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className={`w-full h-2 ${progressBg} rounded-full overflow-hidden mt-1`}>
                    <div
                      className={`h-full ${progressColor} rounded-full transition-all duration-500`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}

            <div className="p-6 mt-2 border-t border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-semibold">Résumé du budget</p>
                  <p className="text-xs text-muted-foreground">Total dépensé vs alloué</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{formatCurrency(expenseCategories.reduce((sum, cat) => sum + cat.amount, 0))}</p>
                  <p className="text-xs text-muted-foreground">{formatCurrency(expenseCategories.reduce((sum, cat) => sum + cat.budget, 0))}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                <Settings className="size-3.5 mr-1.5" />
                <span>Gérer les budgets</span>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PredictiveInsightsSection = ({ insights }: { insights: typeof mockData.predictiveInsights }) => {
  const [view, setView] = useState('cards');

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-white to-indigo-50/20 dark:from-gray-900 dark:to-indigo-950/20 border-indigo-100/60 dark:border-indigo-900/40">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-md font-semibold flex items-center gap-2">
              <Target className="size-4 text-indigo-500" />
              Insights prédictifs
            </CardTitle>
            <CardDescription>Prévisions et optimisations basées sur vos données</CardDescription>
          </div>
          <div className="flex items-center gap-2 bg-secondary/50 rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 px-3 rounded-md ${view === 'cards' ? 'bg-background shadow-sm' : ''}`}
              onClick={() => setView('cards')}
            >
              <LayoutGrid className="size-3.5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-7 px-3 rounded-md ${view === 'chart' ? 'bg-background shadow-sm' : ''}`}
              onClick={() => setView('chart')}
            >
              <BarChart2 className="size-3.5" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {view === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {insights.map((insight, index) => {
              // Couleurs différentes pour chaque carte
              const colors = [
                {
                  bg: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40",
                  border: "border-blue-100 dark:border-blue-900/50",
                  icon: "text-blue-500 dark:text-blue-400 bg-blue-100/80 dark:bg-blue-900/50",
                  accent: "from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400"
                },
                {
                  bg: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40",
                  border: "border-emerald-100 dark:border-emerald-900/50",
                  icon: "text-emerald-500 dark:text-emerald-400 bg-emerald-100/80 dark:bg-emerald-900/50",
                  accent: "from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400"
                },
                {
                  bg: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/40",
                  border: "border-amber-100 dark:border-amber-900/50",
                  icon: "text-amber-500 dark:text-amber-400 bg-amber-100/80 dark:bg-amber-900/50",
                  accent: "from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400"
                }
              ];

              const colorSet = colors[index % colors.length];

              // Icônes pour chaque type d'insight
              const icons = [
                <TrendingUp key="trend" className="size-4" />,
                <Tag key="tag" className="size-4" />,
                <CreditCard key="card" className="size-4" />
              ];

              return (
                <div key={index} className={`rounded-xl p-5 border ${colorSet.border} ${colorSet.bg} hover:shadow-md transition-all duration-200`}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`size-9 rounded-full ${colorSet.icon} flex items-center justify-center`}>
                      {icons[index % icons.length]}
                    </div>
                    <Badge variant="outline" className="font-medium h-6 bg-background/80">Prévision</Badge>
                  </div>

                  <h3 className="text-base font-semibold mb-1">{insight.title}</h3>
                  <p className={`text-2xl font-bold mb-3 bg-gradient-to-r ${colorSet.accent} bg-clip-text text-transparent`}>
                    {insight.value}
                  </p>
                  <p className="text-sm text-muted-foreground mb-4">{insight.description}</p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" />
                      <span>Mis à jour aujourd'hui</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-7 px-2.5 rounded-full">
                      <ChevronRight className="size-4" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-secondary/30 border-secondary">
                <CardContent className="p-4 flex flex-col items-center">
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">Prévision CA</h4>
                  <p className="text-lg font-bold">+8.5%</p>
                </CardContent>
              </Card>
              <Card className="bg-secondary/30 border-secondary">
                <CardContent className="p-4 flex flex-col items-center">
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">Optimisation prix</h4>
                  <p className="text-lg font-bold">+4.2%</p>
                </CardContent>
              </Card>
              <Card className="bg-secondary/30 border-secondary">
                <CardContent className="p-4 flex flex-col items-center">
                  <h4 className="text-xs font-medium text-muted-foreground mb-1">Économies</h4>
                  <p className="text-lg font-bold">-5.1%</p>
                </CardContent>
              </Card>
            </div>

            <div className="h-[180px] bg-secondary/30 rounded-xl border border-dashed border-muted-foreground/20 flex items-center justify-center">
              <div className="text-center">
                <BarChart4 className="size-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-muted-foreground text-sm">Graphique de prévisions</p>
                <p className="text-xs text-muted-foreground/60">Données en cours de traitement</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button size="sm" variant="outline" className="h-8">
                <FileText className="size-3.5 mr-1.5" />
                Rapport détaillé
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const FinancialReportsPage = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <FinancialDashboardHeader />

      <Tabs defaultValue="dashboard" className="w-full">
        <TabsContent value="dashboard" className="m-0 space-y-6">
          <KeyMetricsSection data={mockData.metrics} />

          <RevenueInsightsSection
            monthlyData={mockData.monthlyData}
            revenueBySource={mockData.revenueBySource}
          />

          <InsightsAndAlertsSection
            predictiveInsights={mockData.predictiveInsights}
            alerts={mockData.alerts}
            topClients={mockData.topClients}
            expenseCategories={mockData.expenseCategories}
          />

          <PredictiveInsightsSection insights={mockData.predictiveInsights} />
        </TabsContent>

        <TabsContent value="revenue" className="m-0 space-y-6">
          <div className="flex items-center justify-center h-[200px] bg-secondary/30 rounded-xl border border-dashed border-muted-foreground/20">
            <div className="text-center">
              <BarChart4 className="size-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Analyse détaillée des revenus</p>
              <p className="text-xs text-muted-foreground/60">Module en cours de développement</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="expenses" className="m-0 space-y-6">
          <div className="flex items-center justify-center h-[200px] bg-secondary/30 rounded-xl border border-dashed border-muted-foreground/20">
            <div className="text-center">
              <CreditCard className="size-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground">Analyse détaillée des dépenses</p>
              <p className="text-xs text-muted-foreground/60">Module en cours de développement</p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="reports" className="m-0 space-y-6">
          <MonthlyReports
            data={mockData.monthlyReports.map(report => ({
              ...report,
              status: report.status as "generated" | "pending",
            }))}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialReportsPage;

const Table = (props: any) => {
  return props.children;
};
