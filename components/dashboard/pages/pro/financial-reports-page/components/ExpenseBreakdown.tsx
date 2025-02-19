"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ExpenseCategory {
  category: string;
  amount: number;
}

interface ExpenseBreakdownProps {
  data: ExpenseCategory[];
}

export const ExpenseBreakdown = ({ data }: ExpenseBreakdownProps) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);
  const sortedData = [...data].sort((a, b) => b.amount - a.amount);

  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">
            Répartition des Dépenses
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={sortedData}
                layout="vertical"
                margin={{ top: 0, right: 0, left: 40, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis type="number" className="text-muted-foreground" />
                <YAxis
                  type="category"
                  dataKey="category"
                  className="text-muted-foreground"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "0.5rem",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                  formatter={(value: number) =>
                    `${value.toLocaleString()}€ (${(
                      (value / total) *
                      100
                    ).toFixed(1)}%)`
                  }
                  label={{ value: "Montant" }}
                />
                <Bar
                  dataKey="amount"
                  fill="hsl(var(--primary))"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {sortedData.map((item) => (
              <div key={item.category} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  {item.category}
                </span>
                <div className="text-sm">
                  <span className="font-medium">
                    {item.amount.toLocaleString()}€
                  </span>
                  <span className="text-muted-foreground ml-1">
                    ({((item.amount / total) * 100).toFixed(1)}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}; 