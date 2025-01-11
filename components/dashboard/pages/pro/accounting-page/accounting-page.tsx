"use client";

import React from "react";
import { AccountingHeader } from "./components/AccountingHeader";
import { MetricsGrid } from "./components/MetricsGrid";
import { RevenueAnalytics } from "./components/RevenueAnalytics";
import { RevenueSourcesPieChart } from "./components/RevenueSourcesPieChart";
import { RecentInvoices } from "./components/RecentInvoices";
import { UpcomingPayments } from "./components/UpcomingPayments";
import { TopClients } from "./components/TopClients";
import { QuickActions } from "./components/QuickActions";

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
      status: "pending" as const,
    },
    {
      id: 2,
      amount: 1200,
      date: "2024-02-18",
      client: "Lucas Bernard",
      status: "scheduled" as const,
    },
    {
      id: 3,
      amount: 750,
      date: "2024-02-20",
      client: "Emma Dubois",
      status: "pending" as const,
    },
  ],
  recentInvoices: [
    {
      id: 1,
      amount: 950,
      client: "Marie Dupont",
      status: "paid" as const,
      date: "2024-02-10",
    },
    {
      id: 2,
      amount: 1100,
      client: "Thomas Petit",
      status: "pending" as const,
      date: "2024-02-09",
    },
    {
      id: 3,
      amount: 800,
      client: "Julie Martin",
      status: "overdue" as const,
      date: "2024-02-05",
    },
    {
      id: 4,
      amount: 1300,
      client: "Pierre Simon",
      status: "paid" as const,
      date: "2024-02-08",
    },
  ],
  topClients: [
    { name: "Centre Médical St. Michel", total: 12500, appointments: 45 },
    { name: "Clinique du Sport", total: 8900, appointments: 32 },
    { name: "Cabinet Santé Plus", total: 7600, appointments: 28 },
  ],
};

const AccountingPageComponent = () => {
  return (
    <div className="flex flex-col gap-4">
      <AccountingHeader />

      <MetricsGrid
        data={{
          revenue: mockData.revenue,
          expenses: mockData.expenses,
          profit: mockData.profit,
          unpaidInvoices: mockData.unpaidInvoices,
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <RevenueAnalytics data={mockData.monthlyData} />
        <RevenueSourcesPieChart data={mockData.revenueBySource} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <RecentInvoices data={mockData.recentInvoices} />
        <UpcomingPayments data={mockData.upcomingPayments} />
      </div>

      <TopClients data={mockData.topClients} />

      <QuickActions />
    </div>
  );
};

export default AccountingPageComponent;
