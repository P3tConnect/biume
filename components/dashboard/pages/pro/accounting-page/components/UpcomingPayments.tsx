"use client"

import { ArrowRight, Calendar } from "lucide-react"
import React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Payment {
  id: number
  amount: number
  date: string
  client: string
  status: "scheduled" | "pending"
}

interface UpcomingPaymentsProps {
  data: Payment[]
}

export const UpcomingPayments = ({ data }: UpcomingPaymentsProps) => {
  return (
    <Card className="rounded-2xl overflow-hidden">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-base font-medium">Paiements à venir</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-4">
          {data.map(payment => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 hover:bg-gradient-to-r hover:from-gray-100/80 dark:hover:from-gray-800/80 rounded-xl transition-all duration-200 cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-100 to-purple-50 text-purple-700 dark:from-purple-900 dark:to-purple-950 dark:text-purple-400">
                  <Calendar className="size-5" />
                </div>
                <div>
                  <p className="font-medium">{payment.client}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(payment.date).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "short",
                    })}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-medium">{payment.amount}€</p>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    {payment.status === "scheduled" ? "Programmé" : "En attente"}
                  </p>
                </div>
                <ArrowRight className="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
