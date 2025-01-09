"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui";
import {
  Euro,
  TrendingUp,
  TrendingDown,
  FileText,
  PieChart,
  ArrowRight,
  Users,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Clock4,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart as RePieChart,
  Pie,
  Cell,
} from "recharts";
import CountAnimation from "@/components/magicui/count-animation";

const mockData = {
  revenue: 12450,
  expenses: 8230,
  profit: 4220,
  unpaidInvoices: 2800,
  monthlyData: [
    { month: "Jan", revenue: 4000, expenses: 2400 },
    { month: "Feb", revenue: 3000, expenses: 1398 },
    { month: "Mar", revenue: 2000, expenses: 9800 },
    { month: "Apr", revenue: 2780, expenses: 3908 },
    { month: "May", revenue: 1890, expenses: 4800 },
    { month: "Jun", revenue: 2390, expenses: 3800 },
  ],
  revenueBySource: [
    { name: "Consultations", value: 4500 },
    { name: "Traitements", value: 3200 },
    { name: "Produits", value: 2100 },
    { name: "Autres", value: 1200 },
  ],
  upcomingPayments: [
    {
      id: 1,
      amount: 850,
      date: "2024-02-15",
      client: "Sophie Martin",
      status: "pending",
    },
    {
      id: 2,
      amount: 1200,
      date: "2024-02-18",
      client: "Lucas Bernard",
      status: "scheduled",
    },
    {
      id: 3,
      amount: 750,
      date: "2024-02-20",
      client: "Emma Dubois",
      status: "pending",
    },
  ],
  recentInvoices: [
    {
      id: 1,
      amount: 950,
      client: "Marie Dupont",
      status: "paid",
      date: "2024-02-10",
    },
    {
      id: 2,
      amount: 1100,
      client: "Thomas Petit",
      status: "pending",
      date: "2024-02-09",
    },
    {
      id: 3,
      amount: 800,
      client: "Julie Martin",
      status: "overdue",
      date: "2024-02-05",
    },
    {
      id: 4,
      amount: 1300,
      client: "Pierre Simon",
      status: "paid",
      date: "2024-02-08",
    },
  ],
  topClients: [
    { name: "Centre Médical St. Michel", total: 12500, appointments: 45 },
    { name: "Clinique du Sport", total: 8900, appointments: 32 },
    { name: "Cabinet Santé Plus", total: 7600, appointments: 28 },
  ],
};

const COLORS = ["#22c55e", "#3b82f6", "#a855f7", "#f97316"];

const AccountingPageComponent = () => {
  return (
    <div className="flex flex-col gap-4">
      {/* Header Card */}
      <Card className="overflow-hidden rounded-2xl">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Comptabilité
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Aperçu de vos finances
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-xl hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-secondary/30 dark:hover:border-secondary/70 transition-all duration-300 dark:border-gray-700"
              >
                <FileText className="size-4 mr-2" />
                Créer un devis
              </Button>
              <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300">
                <Euro className="size-4 mr-2" />
                Créer une facture
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Metrics Grid */}
      <Card className="overflow-hidden rounded-2xl">
        <div className="grid space-y-2 md:grid-cols-2 lg:grid-cols-4 lg:space-y-0">
          <Card className="rounded-none border-y-transparent border-s-transparent hover:bg-gradient-to-br hover:from-green-50 hover:to-transparent dark:hover:from-green-950/30 dark:hover:to-transparent transition-all duration-300">
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-medium">
                Revenus du mois
              </CardTitle>
              <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-green-900 dark:to-green-950 p-4">
                <TrendingUp className="size-5 text-green-700 dark:text-green-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold text-green-700 dark:text-green-400">
                <CountAnimation number={mockData.revenue} />€
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12.5%</span> vs dernier mois
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none border-y-transparent border-s-transparent hover:bg-gradient-to-br hover:from-red-50 hover:to-transparent dark:hover:from-red-950/30 dark:hover:to-transparent transition-all duration-300">
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-medium">
                Dépenses du mois
              </CardTitle>
              <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-red-200 to-red-100 dark:from-red-900 dark:to-red-950 p-4">
                <TrendingDown className="size-5 text-red-700 dark:text-red-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold text-red-700 dark:text-red-400">
                <CountAnimation number={mockData.expenses} />€
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">-8.3%</span> vs dernier mois
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none border-y-transparent border-s-transparent hover:bg-gradient-to-br hover:from-blue-50 hover:to-transparent dark:hover:from-blue-950/30 dark:hover:to-transparent transition-all duration-300">
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-medium">
                Bénéfice net
              </CardTitle>
              <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-blue-100 dark:from-blue-900 dark:to-blue-950 p-4">
                <PieChart className="size-5 text-blue-700 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">
                <CountAnimation number={mockData.profit} />€
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+15.2%</span> vs dernier mois
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-none border-transparent hover:bg-gradient-to-br hover:from-orange-50 hover:to-transparent dark:hover:from-orange-950/30 dark:hover:to-transparent transition-all duration-300">
            <CardHeader className="relative flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-base font-medium">
                Factures impayées
              </CardTitle>
              <div className="absolute end-4 top-4 flex size-12 items-center justify-center rounded-full bg-gradient-to-br from-orange-200 to-orange-100 dark:from-orange-900 dark:to-orange-950 p-4">
                <FileText className="size-5 text-orange-700 dark:text-orange-400" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-3xl font-bold text-orange-700 dark:text-orange-400">
                <CountAnimation number={mockData.unpaidInvoices} />€
              </div>
              <p className="text-xs text-muted-foreground">
                4 factures en attente
              </p>
            </CardContent>
          </Card>
        </div>
      </Card>

      {/* New Layout: Revenue Analytics & Recent Invoices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue vs Expenses Chart - Spans 2 columns */}
        <Card className="lg:col-span-2 rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">
                Revenus vs Dépenses
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                6 derniers mois
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockData.monthlyData}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="rgb(34 197 94)"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="rgb(34 197 94)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorExpenses"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="rgb(239 68 68)"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="rgb(239 68 68)"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    className="stroke-muted"
                  />
                  <XAxis dataKey="month" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "0.5rem",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="rgb(34 197 94)"
                    fill="url(#colorRevenue)"
                    strokeWidth={2}
                    name="Revenus"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="rgb(239 68 68)"
                    fill="url(#colorExpenses)"
                    strokeWidth={2}
                    name="Dépenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Sources Pie Chart */}
        <Card className="rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">
                Sources de revenus
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                  <Pie
                    data={mockData.revenueBySource}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockData.revenueBySource.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </RePieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {mockData.revenueBySource.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div
                    className="size-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span className="text-sm text-muted-foreground">
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Invoices & Upcoming Payments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Recent Invoices */}
        <Card className="rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">
                Factures récentes
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                Voir tout
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {mockData.recentInvoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-gray-100/80 dark:hover:from-gray-800/80 rounded-xl transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 rounded-xl ${
                        invoice.status === "paid"
                          ? "bg-gradient-to-br from-green-100 to-green-50 text-green-700 dark:from-green-900 dark:to-green-950 dark:text-green-400"
                          : invoice.status === "pending"
                            ? "bg-gradient-to-br from-orange-100 to-orange-50 text-orange-700 dark:from-orange-900 dark:to-orange-950 dark:text-orange-400"
                            : "bg-gradient-to-br from-red-100 to-red-50 text-red-700 dark:from-red-900 dark:to-red-950 dark:text-red-400"
                      }`}
                    >
                      {invoice.status === "paid" ? (
                        <CheckCircle2 className="size-5" />
                      ) : invoice.status === "pending" ? (
                        <Clock4 className="size-5" />
                      ) : (
                        <AlertCircle className="size-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{invoice.client}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(invoice.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{invoice.amount}€</p>
                      <p
                        className={`text-sm ${
                          invoice.status === "paid"
                            ? "text-green-600 dark:text-green-400"
                            : invoice.status === "pending"
                              ? "text-orange-600 dark:text-orange-400"
                              : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {invoice.status === "paid"
                          ? "Payée"
                          : invoice.status === "pending"
                            ? "En attente"
                            : "En retard"}
                      </p>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card className="rounded-2xl overflow-hidden">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center">
              <CardTitle className="text-base font-medium">
                Paiements à venir
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              {mockData.upcomingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-gray-100/80 dark:hover:from-gray-800/80 rounded-xl transition-all duration-200 cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 text-purple-700 dark:from-purple-900 dark:to-purple-950 dark:text-purple-400">
                      <Calendar className="size-5" />
                    </div>
                    <div>
                      <p className="font-medium">{payment.client}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(payment.date).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "short",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="font-medium">{payment.amount}€</p>
                      <p className="text-sm text-purple-600 dark:text-purple-400">
                        {payment.status === "scheduled"
                          ? "Programmé"
                          : "En attente"}
                      </p>
                    </div>
                    <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Clients */}
      <Card className="rounded-2xl overflow-hidden">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <div className="flex justify-between items-center">
            <CardTitle className="text-base font-medium">
              Meilleurs clients
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="text-muted-foreground hover:text-foreground"
            >
              Voir tout
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockData.topClients.map((client, index) => (
              <Card
                key={client.name}
                className="rounded-xl overflow-hidden hover:bg-gradient-to-br hover:from-gray-100/80 dark:hover:from-gray-800/80 transition-all duration-200"
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 text-blue-700 dark:from-blue-900 dark:to-blue-950 dark:text-blue-400">
                      <Users className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{client.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {client.appointments} rendez-vous
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {client.total}€
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total facturé
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="rounded-2xl overflow-hidden hover:bg-muted transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-br from-blue-200 to-blue-100 dark:from-blue-900 dark:to-blue-950">
              <FileText className="size-6 text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="text-lg font-medium">Gérer les devis</h3>
            <p className="text-sm text-muted-foreground text-center">
              Voir et créer des devis
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl overflow-hidden hover:bg-muted transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-br from-purple-200 to-purple-100 dark:from-purple-900 dark:to-purple-950">
              <Euro className="size-6 text-purple-700 dark:text-purple-400 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="text-lg font-medium">Gérer les factures</h3>
            <p className="text-sm text-muted-foreground text-center">
              Voir et créer des factures
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl overflow-hidden hover:bg-muted transition-all duration-300 cursor-pointer group">
          <CardContent className="p-6 flex flex-col items-center gap-3">
            <div className="p-3 rounded-full bg-gradient-to-br from-green-200 to-green-100 dark:from-green-900 dark:to-green-950">
              <PieChart className="size-6 text-green-700 dark:text-green-400 group-hover:scale-110 transition-transform duration-200" />
            </div>
            <h3 className="text-lg font-medium">Rapports financiers</h3>
            <p className="text-sm text-muted-foreground text-center">
              Générer des rapports détaillés
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountingPageComponent;
