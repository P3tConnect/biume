"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui";
import { ArrowRight, CheckCircle2, Clock4, AlertCircle } from "lucide-react";

interface Invoice {
  id: number;
  amount: number;
  client: string;
  status: "paid" | "pending" | "overdue";
  date: string;
}

interface RecentInvoicesProps {
  data: Invoice[];
}

export const RecentInvoices = ({ data }: RecentInvoicesProps) => {
  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader>
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
          {data.map((invoice) => (
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
  );
};
