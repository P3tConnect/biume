"use client";

import React from "react";
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

const FinancialReportsPage = () => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Rapports Financiers</h1>
        <ReportActions />
      </div>

      <MetricsGrid data={mockData.metrics} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RevenueAnalytics data={mockData.monthlyData} />
        <RevenueSourcesPieChart data={mockData.revenueBySource} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <YearlyComparison data={mockData.yearlyData} />
        <ExpenseBreakdown data={mockData.expenseCategories} />
      </div>

      <MonthlyReports data={mockData.monthlyReports.map(report => ({
        ...report,
        status: report.status as "generated" | "pending",
      }))} />
    </div>
  );
};

export default FinancialReportsPage;
