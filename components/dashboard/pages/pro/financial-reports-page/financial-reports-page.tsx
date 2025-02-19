"use client";

import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
} from "lucide-react";
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
    { name: "Consultations", value: 45000 },
    { name: "Traitements", value: 32000 },
    { name: "Produits", value: 21000 },
    { name: "Autres", value: 12000 },
  ],
  monthlyReports: [
    {
      id: "rep_01",
      month: "Janvier 2024",
      revenue: 14000,
      expenses: 8400,
      profit: 5600,
      status: "generated",
    },
    {
      id: "rep_02",
      month: "Février 2024",
      revenue: 13000,
      expenses: 7398,
      profit: 5602,
      status: "generated",
    },
    {
      id: "rep_03",
      month: "Mars 2024",
      revenue: 12000,
      expenses: 6800,
      profit: 5200,
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
    { category: "Équipement", amount: 28000 },
    { category: "Marketing", amount: 15000 },
    { category: "Personnel", amount: 25000 },
    { category: "Fournitures", amount: 8000 },
    { category: "Loyer", amount: 12000 },
    { category: "Autres", amount: 4000 },
  ],
};

const FinancialReportsHeader = () => {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <CardHeader className="border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Rapports Financiers
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Analysez et gérez vos rapports financiers
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-end md:items-center gap-3">
            <Select defaultValue="current">
              <SelectTrigger className="w-[180px] rounded-xl">
                <SelectValue placeholder="Sélectionner la période" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Année en cours</SelectItem>
                <SelectItem value="last">Année précédente</SelectItem>
                <SelectItem value="custom">Période personnalisée</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="icon"
              className="rounded-xl hover:bg-secondary/30 hover:border-secondary/70 transition-all duration-300 dark:border-gray-700"
            >
              <Filter className="size-4" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="rounded-xl hover:bg-secondary/30 hover:border-secondary/70 transition-all duration-300 dark:border-gray-700"
                >
                  <Download className="size-4 mr-2" />
                  Exporter
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileSpreadsheet className="size-4 mr-2" />
                  Excel
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Share2 className="size-4 mr-2" />
                  Partager
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Printer className="size-4 mr-2" />
                  Imprimer
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300">
              <Plus className="size-4 mr-2" />
              Nouveau rapport
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

const FinancialReportsPage = () => {
  return (
    <div className="space-y-4">
      <FinancialReportsHeader />

      <MetricsGrid data={mockData.metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueAnalytics data={mockData.monthlyData} />
        <RevenueSourcesPieChart data={mockData.revenueBySource} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <YearlyComparison data={mockData.yearlyData} />
        <ExpenseBreakdown data={mockData.expenseCategories} />
      </div>

      <MonthlyReports
        data={mockData.monthlyReports.map(report => ({
          ...report,
          status: report.status as "generated" | "pending",
        }))}
      />
    </div>
  );
};

export default FinancialReportsPage;
