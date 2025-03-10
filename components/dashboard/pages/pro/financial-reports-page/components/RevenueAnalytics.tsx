"use client"

import React from "react"
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MonthlyData {
  month: string
  revenue: number
  expenses: number
  profit: number
}

interface RevenueAnalyticsProps {
  data: MonthlyData[]
}

export const RevenueAnalytics = ({ data }: RevenueAnalyticsProps) => {
  return (
    <Card className="col-span-2 rounded-2xl overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Analyse des Revenus</CardTitle>
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
                <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="rgb(59 130 246)" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="rgb(59 130 246)" stopOpacity={0} />
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
              <Area
                type="monotone"
                dataKey="profit"
                stroke="rgb(59 130 246)"
                fill="url(#colorProfit)"
                strokeWidth={2}
                name="Profit"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-green-500" />
            <span className="text-sm text-muted-foreground">Revenus</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-red-500" />
            <span className="text-sm text-muted-foreground">Dépenses</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-3 rounded-full bg-blue-500" />
            <span className="text-sm text-muted-foreground">Profit</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
