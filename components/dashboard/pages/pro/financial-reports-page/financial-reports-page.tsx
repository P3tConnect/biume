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
  Wallet,
  Percent,
  ReceiptText,
  CircleDollarSign,
  ArrowRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/src/lib";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { MetricsGrid } from "./components/MetricsGrid";
import { RevenueAnalytics } from "./components/RevenueAnalytics";
import { RevenueSourcesPieChart } from "./components/RevenueSourcesPieChart";
import { MonthlyReports } from "./components/MonthlyReports";
import { YearlyComparison } from "./components/YearlyComparison";
import { ExpenseBreakdown } from "./components/ExpenseBreakdown";
import { ReportActions } from "./components/ReportActions";

const mockData = {
  financialOverview: {
    revenue: 124500,
    expenses: 82300,
    profit: 42200,
    yearGrowth: 15
  },
  revenueBreakdown: [
    { category: "Consultations", amount: 45000, percentage: 36 },
    { category: "Traitements", amount: 32000, percentage: 26 },
    { category: "Produits", amount: 21000, percentage: 17 },
    { category: "Chirurgies", amount: 18500, percentage: 15 },
    { category: "Autres", amount: 8000, percentage: 6 },
  ],
  expenseBreakdown: [
    { category: "Personnel", amount: 45000, percentage: 55 },
    { category: "Équipement", amount: 15000, percentage: 18 },
    { category: "Loyer", amount: 12000, percentage: 15 },
    { category: "Marketing", amount: 5300, percentage: 6 },
    { category: "Autres", amount: 5000, percentage: 6 },
  ],
  kpis: [
    { label: "Ticket moyen", value: "850 €", change: "+5%" },
    { label: "Marge brute", value: "32%", change: "+2%" },
    { label: "Trésorerie", value: "18 500 €", change: "+12%" },
    { label: "Clients actifs", value: "245", change: "+8%" },
  ],
  recentTransactions: [
    { id: "TX-001", client: "Clinique Saint-Bernard", amount: 1250, date: "Aujourd'hui", type: "Consultation" },
    { id: "TX-002", client: "Cabinet Vétérinaire du Parc", amount: 3200, date: "Hier", type: "Traitement" },
    { id: "TX-003", client: "Centre Animalier Bellevue", amount: 780, date: "Il y a 2 jours", type: "Produits" },
    { id: "TX-004", client: "Clinique des Alpes", amount: 4500, date: "Il y a 3 jours", type: "Chirurgie" },
  ],
  alerts: [
    { type: "warning", message: "Dépenses de marketing dépassent le budget" },
    { type: "error", message: "3 factures en retard de paiement" },
    { type: "info", message: "Progression du CA de 5% ce mois-ci" },
  ]
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
};

const formatPercent = (value: number) => {
  return `${value > 0 ? '+' : ''}${value}%`;
};

const FinancialDashboardHeader = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("juin-2024");

  // Données pour les statistiques rapides
  const stats = {
    revenue: 124500,
    revenueChange: 15,
    expenses: 82300,
    expensesChange: 8.2,
    profit: 42200,
    profitChange: 18.5,
    reports: 5
  };

  return (
    <Card className="overflow-hidden rounded-2xl mb-6">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800 pb-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <LineChart className="h-8 w-8 text-primary" />
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent">
                  Rapports Financiers
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Visualisez et analysez les performances financières de votre cabinet
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            <Tabs defaultValue="month" className="w-fit">
              <TabsList>
                <TabsTrigger value="month">Mois</TabsTrigger>
                <TabsTrigger value="quarter">Trimestre</TabsTrigger>
                <TabsTrigger value="year">Année</TabsTrigger>
              </TabsList>
            </Tabs>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Juin 2024
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="font-medium leading-none">Période</h4>
                    <p className="text-sm text-muted-foreground">
                      Sélectionnez la période pour les rapports financiers
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Select
                      value={selectedPeriod}
                      onValueChange={setSelectedPeriod}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez une période" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="juin-2024">Juin 2024</SelectItem>
                        <SelectItem value="mai-2024">Mai 2024</SelectItem>
                        <SelectItem value="avril-2024">Avril 2024</SelectItem>
                        <SelectItem value="q2-2024">T2 2024</SelectItem>
                        <SelectItem value="q1-2024">T1 2024</SelectItem>
                        <SelectItem value="2024">Année 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtres
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Tous les revenus</DropdownMenuItem>
                <DropdownMenuItem>Par service</DropdownMenuItem>
                <DropdownMenuItem>Par client</DropdownMenuItem>
                <DropdownMenuItem>Par période</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nouveau rapport
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Download className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileSpreadsheet className="h-4 w-4 mr-2" />
                  Excel (.xlsx)
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  PDF (.pdf)
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager par email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Printer className="h-4 w-4 mr-2" />
                  Imprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-4 pb-2">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Revenus totaux</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{formatCurrency(stats.revenue)}</p>
              <Badge variant={stats.revenueChange > 0 ? "secondary" : "destructive"} className="flex items-center">
                {stats.revenueChange > 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                {stats.revenueChange}%
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Dépenses totales</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{formatCurrency(stats.expenses)}</p>
              <Badge variant={stats.expensesChange < 0 ? "secondary" : "destructive"} className="flex items-center">
                {stats.expensesChange < 0 ? <ArrowDownRight className="mr-1 h-3 w-3" /> : <ArrowUpRight className="mr-1 h-3 w-3" />}
                {stats.expensesChange}%
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Bénéfice net</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{formatCurrency(stats.profit)}</p>
              <Badge variant={stats.profitChange > 0 ? "secondary" : "destructive"} className="flex items-center">
                {stats.profitChange > 0 ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                {stats.profitChange}%
              </Badge>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-muted-foreground">Rapports disponibles</p>
            <div className="flex items-center gap-2">
              <p className="text-2xl font-bold">{stats.reports}</p>
              <Button variant="link" className="h-auto p-0 text-primary" size="sm">
                <FileText className="mr-1 h-3 w-3" />
                Voir tous
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const FinancialOverview = ({ data }: { data: typeof mockData.financialOverview }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vue d'ensemble</CardTitle>
        <CardDescription>Synthèse des résultats financiers</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Banknote className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">Revenus</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{formatCurrency(data.revenue)}</span>
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="mr-1 h-3 w-3" />
                +{data.yearGrowth}%
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-destructive" />
              <span className="text-sm font-medium text-muted-foreground">Dépenses</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{formatCurrency(data.expenses)}</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium text-muted-foreground">Bénéfice</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{formatCurrency(data.profit)}</span>
              <span className="text-sm text-muted-foreground">
                ({Math.round((data.profit / data.revenue) * 100)}%)
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between text-sm mb-2">
            <span>Répartition des revenus et dépenses</span>
            <span className="text-muted-foreground">{formatCurrency(data.revenue)} / {formatCurrency(data.expenses)}</span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(data.expenses / data.revenue) * 100}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span>Dépenses</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span>Bénéfice ({formatCurrency(data.profit)})</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const KpiCards = ({ data }: { data: typeof mockData.kpis }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {data.map((kpi, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="text-sm font-medium text-muted-foreground mb-2">{kpi.label}</div>
            <div className="flex items-baseline justify-between">
              <div className="text-2xl font-bold">{kpi.value}</div>
              <Badge
                variant={kpi.change.startsWith('+') ? "secondary" : "destructive"}
                className="text-xs"
              >
                {kpi.change.startsWith('+') ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {kpi.change}
              </Badge>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

const RevenueAndExpenseDetails = ({
  revenueData,
  expenseData
}: {
  revenueData: typeof mockData.revenueBreakdown,
  expenseData: typeof mockData.expenseBreakdown
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Répartition des revenus</CardTitle>
              <CardDescription>Par catégorie de services</CardDescription>
            </div>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {revenueData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: `hsl(var(--primary)/${0.4 + index * 0.15})` }}
                    />
                    <span className="text-sm font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{formatCurrency(item.amount)}</span>
                    <span className="text-xs text-muted-foreground">{item.percentage}%</span>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Répartition des dépenses</CardTitle>
              <CardDescription>Par catégorie</CardDescription>
            </div>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenseData.map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: `hsl(var(--destructive)/${0.4 + index * 0.15})` }}
                    />
                    <span className="text-sm font-medium">{item.category}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">{formatCurrency(item.amount)}</span>
                    <span className="text-xs text-muted-foreground">{item.percentage}%</span>
                  </div>
                </div>
                <Progress value={item.percentage} className="h-1" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const TransactionsAndAlerts = ({
  transactions,
  alerts
}: {
  transactions: typeof mockData.recentTransactions,
  alerts: typeof mockData.alerts
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Transactions récentes</CardTitle>
          <CardDescription>Dernières activités financières</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                    <ReceiptText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{transaction.client}</div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <span>{transaction.id}</span>
                      <span>•</span>
                      <span>{transaction.type}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatCurrency(transaction.amount)}</div>
                  <div className="text-xs text-muted-foreground">{transaction.date}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full">
              <span>Voir toutes les transactions</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alertes financières</CardTitle>
          <CardDescription>Notifications importantes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert, index) => {
              const alertIcons = {
                warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
                error: <AlertCircle className="h-5 w-5 text-destructive" />,
                info: <CircleDollarSign className="h-5 w-5 text-primary" />
              };

              const icon = alertIcons[alert.type as keyof typeof alertIcons];

              return (
                <div key={index} className="flex gap-3 p-3 rounded-lg bg-secondary/30 border border-border">
                  <div className="flex-shrink-0 mt-0.5">{icon}</div>
                  <div className="flex-1">
                    <p className="text-sm">{alert.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const FinancialReportsPage = () => {
  return (
    <div className="space-y-6">
      <FinancialDashboardHeader />

      <Tabs defaultValue="overview" className="w-full">
        <TabsContent value="overview" className="space-y-6 mt-0">
          <FinancialOverview data={mockData.financialOverview} />
          <KpiCards data={mockData.kpis} />
          <RevenueAndExpenseDetails
            revenueData={mockData.revenueBreakdown}
            expenseData={mockData.expenseBreakdown}
          />
          <TransactionsAndAlerts
            transactions={mockData.recentTransactions}
            alerts={mockData.alerts}
          />
        </TabsContent>

        <TabsContent value="revenue" className="space-y-6 mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-[200px]">
                <div className="text-center">
                  <BarChart4 className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Analyse détaillée des revenus</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Cette section est en cours de développement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expenses" className="space-y-6 mt-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-center h-[200px]">
                <div className="text-center">
                  <CreditCard className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                  <h3 className="text-lg font-medium">Analyse détaillée des dépenses</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    Cette section est en cours de développement
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FinancialReportsPage;

const Table = (props: any) => {
  return props.children;
};
