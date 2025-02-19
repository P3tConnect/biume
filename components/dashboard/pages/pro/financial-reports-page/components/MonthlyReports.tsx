"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download, Eye } from "lucide-react";

interface MonthlyReport {
  id: string;
  month: string;
  revenue: number;
  expenses: number;
  profit: number;
  status: "generated" | "pending";
}

interface MonthlyReportsProps {
  data: MonthlyReport[];
}

export const MonthlyReports = ({ data }: MonthlyReportsProps) => {
  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">
            Rapports Mensuels
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Période</TableHead>
              <TableHead className="text-right">Revenus</TableHead>
              <TableHead className="text-right">Dépenses</TableHead>
              <TableHead className="text-right">Profit</TableHead>
              <TableHead className="text-right">Marge</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((report) => (
              <TableRow key={report.id}>
                <TableCell className="font-medium">{report.month}</TableCell>
                <TableCell className="text-right">
                  {report.revenue.toLocaleString()}€
                </TableCell>
                <TableCell className="text-right">
                  {report.expenses.toLocaleString()}€
                </TableCell>
                <TableCell className="text-right">
                  {report.profit.toLocaleString()}€
                </TableCell>
                <TableCell className="text-right">
                  {((report.profit / report.revenue) * 100).toFixed(1)}%
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${report.status === "generated"
                      ? "bg-green-50 text-green-700 dark:bg-green-950/50 dark:text-green-400"
                      : "bg-yellow-50 text-yellow-700 dark:bg-yellow-950/50 dark:text-yellow-400"
                      }`}
                  >
                    {report.status === "generated" ? "Généré" : "En attente"}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      disabled={report.status !== "generated"}
                    >
                      <Eye className="size-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-8"
                      disabled={report.status !== "generated"}
                    >
                      <Download className="size-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}; 