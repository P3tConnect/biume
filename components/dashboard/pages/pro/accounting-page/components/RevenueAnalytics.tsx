"use client"

import React from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Button } from "@/components/ui"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MonthlyData {
  month: string
  revenue: number
  expenses: number
}

interface RevenueAnalyticsProps {
  data: MonthlyData[]
}

export const RevenueAnalytics = ({ data }: RevenueAnalyticsProps) => {
  return (
    <Card className="lg:col-span-2 rounded-2xl overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Revenus vs Dépenses</CardTitle>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
            6 derniers mois
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(34 197 94)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="rgb(34 197 94)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(239 68 68)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="rgb(239 68 68)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
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
  )
}
