"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const GraphSalesWidget = () => {
  const chartData = [
    { month: "Janvier", revenues: 345 },
    { month: "Fevrier", revenues: 876 },
    { month: "Mars", revenues: 562 },
    { month: "Avril", revenues: 123 },
    { month: "Mai", revenues: 789 },
    { month: "Juin", revenues: 234 },
    { month: "Juillet", revenues: 543 },
    { month: "Août", revenues: 876 },
    { month: "Septembre", revenues: 321 },
    { month: "Octobre", revenues: 654 },
    { month: "Novembre", revenues: 890 },
    { month: "Décembre", revenues: 432 },
  ];

  const chartConfig = {
    revenues: {
      label: "revenues",
      color: "#9000FF",
    },
  } satisfies ChartConfig;

  return (
    <Card className="h-full w-full rounded-2xl">
      <CardHeader className="flex flex-wrap items-start justify-start content-start text-start">
        <h1 className="text-2xl font-bold">Graphique des revenues</h1>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[340px] w-full">
          <BarChart data={chartData}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip
              contentStyle={{
                borderRadius: '0.7rem',
              }}
            />
            <Bar
              dataKey="revenues"
              fill={chartConfig.revenues.color}
              width={10}
              barSize={20}
              radius={25}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default GraphSalesWidget;
