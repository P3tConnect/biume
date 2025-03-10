"use client"

import React from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface YearlyData {
  currentYear: {
    revenue: number
    expenses: number
    profit: number
  }
  previousYear: {
    revenue: number
    expenses: number
    profit: number
  }
}

interface YearlyComparisonProps {
  data: YearlyData
}

export const YearlyComparison = ({ data }: YearlyComparisonProps) => {
  const chartData = [
    {
      name: "Revenus",
      "Année Précédente": data.previousYear.revenue,
      "Année Courante": data.currentYear.revenue,
    },
    {
      name: "Dépenses",
      "Année Précédente": data.previousYear.expenses,
      "Année Courante": data.currentYear.expenses,
    },
    {
      name: "Profit",
      "Année Précédente": data.previousYear.profit,
      "Année Courante": data.currentYear.profit,
    },
  ]

  const getGrowthPercentage = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100
    return growth.toFixed(1)
  }

  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Comparaison Annuelle</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Revenus</p>
              <p className="text-2xl font-bold">{data.currentYear.revenue.toLocaleString()}€</p>
              <p className="text-sm text-muted-foreground">
                <span
                  className={
                    Number(getGrowthPercentage(data.currentYear.revenue, data.previousYear.revenue)) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {getGrowthPercentage(data.currentYear.revenue, data.previousYear.revenue)}%
                </span>{" "}
                vs année précédente
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Dépenses</p>
              <p className="text-2xl font-bold">{data.currentYear.expenses.toLocaleString()}€</p>
              <p className="text-sm text-muted-foreground">
                <span
                  className={
                    Number(getGrowthPercentage(data.currentYear.expenses, data.previousYear.expenses)) <= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {getGrowthPercentage(data.currentYear.expenses, data.previousYear.expenses)}%
                </span>{" "}
                vs année précédente
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Profit</p>
              <p className="text-2xl font-bold">{data.currentYear.profit.toLocaleString()}€</p>
              <p className="text-sm text-muted-foreground">
                <span
                  className={
                    Number(getGrowthPercentage(data.currentYear.profit, data.previousYear.profit)) >= 0
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {getGrowthPercentage(data.currentYear.profit, data.previousYear.profit)}%
                </span>{" "}
                vs année précédente
              </p>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="name" className="text-muted-foreground" />
                <YAxis className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value: number) => `${value.toLocaleString()}€`}
                />
                <Legend />
                <Bar dataKey="Année Précédente" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Année Courante" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
