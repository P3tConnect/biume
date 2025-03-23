"use client"

import { Download, Euro, TrendingUp, Calendar } from "lucide-react"
import React from "react"
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { cn } from "@/src/lib/utils"
import { useSubscriptionCheck } from "@/src/hooks/use-subscription-check"
import SubscriptionNonPayedAlert from "@/components/subscription-non-payed-card/subscription-non-payed-card"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AccountingHeader from "../../../shortcuts/pro/dashboard-tabs/accounting-tab/accounting-header"

const AccountingPageComponent = () => {
  const { shouldShowAlert, organizationId } = useSubscriptionCheck()
  const mockData = {
    chiffreAffaires: {
      montant: 13550,
      evolution: 7,
      periode: "ce mois",
      historique: [
        { mois: "Jan", montant: 11200 },
        { mois: "Fév", montant: 12100 },
        { mois: "Mar", montant: 11800 },
        { mois: "Avr", montant: 12500 },
        { mois: "Mai", montant: 12800 },
        { mois: "Juin", montant: 13550 },
      ],
      repartition: [
        { categorie: "Consultations", montant: 5500, pourcentage: 40.6 },
        { categorie: "Chirurgies", montant: 3200, pourcentage: 23.6 },
        { categorie: "Vaccinations", montant: 2100, pourcentage: 15.5 },
        { categorie: "Produits", montant: 1750, pourcentage: 12.9 },
        { categorie: "Autres", montant: 1000, pourcentage: 7.4 },
      ],
    },
    paiements: [
      { client: "Marie Dupont", montant: 180, date: "15/06/2024", statut: "en_attente" },
      { client: "Thomas Petit", montant: 345, date: "18/06/2024", statut: "en_retard" },
      { client: "Julie Martin", montant: 560, date: "22/06/2024", statut: "en_attente" },
    ],
  }

  return (
    <>
      {shouldShowAlert && organizationId && <SubscriptionNonPayedAlert organizationId={organizationId} />}
      <div className="flex flex-col gap-6 p-4">
        <AccountingHeader />

        {/* Chiffre d'affaires et répartition */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <TrendingUp className="h-5 w-5 text-muted-foreground" />
                Chiffre d'affaires
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-3xl font-bold text-foreground">{mockData.chiffreAffaires.montant} €</p>
                  <div className="flex items-center gap-2 mt-2">
                    <p
                      className={cn(
                        "text-sm font-medium",
                        mockData.chiffreAffaires.evolution > 0
                          ? "text-emerald-500 dark:text-emerald-400"
                          : "text-rose-500 dark:text-rose-400"
                      )}
                    >
                      {mockData.chiffreAffaires.evolution > 0 ? "+" : ""}
                      {mockData.chiffreAffaires.evolution}%
                    </p>
                    <p className="text-sm text-muted-foreground">{mockData.chiffreAffaires.periode}</p>
                  </div>
                </div>
                <div className="h-[200px] mt-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockData.chiffreAffaires.historique}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="mois"
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                      />
                      <YAxis
                        stroke="hsl(var(--muted-foreground))"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={value => `${value}€`}
                      />
                      <Tooltip
                        content={({ active, payload }) => {
                          if (active && payload && payload.length) {
                            return (
                              <div className="rounded-lg border bg-background p-2 shadow-sm">
                                <div className="grid grid-cols-2 gap-2">
                                  <div className="flex flex-col">
                                    <span className="text-[0.70rem] uppercase text-muted-foreground">
                                      {payload[0].payload.mois}
                                    </span>
                                    <span className="font-bold text-muted-foreground">{payload[0].value}€</span>
                                  </div>
                                </div>
                              </div>
                            )
                          }
                          return null
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="montant"
                        stroke="hsl(var(--primary))"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Euro className="h-5 w-5 text-muted-foreground" />
                Répartition du CA
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px] mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={mockData.chiffreAffaires.repartition}>
                    <XAxis
                      dataKey="categorie"
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="hsl(var(--muted-foreground))"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={value => `${value}%`}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    {payload[0].payload.categorie}
                                  </span>
                                  <span className="font-bold text-muted-foreground">
                                    {payload[0].payload.pourcentage}%
                                  </span>
                                  <span className="text-[0.70rem] text-muted-foreground">
                                    {payload[0].payload.montant}€
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Bar dataKey="pourcentage" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Paiements en attente */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              Paiements à suivre
            </CardTitle>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockData.paiements.map((paiement, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 hover:bg-muted rounded-md transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="font-medium text-foreground">{paiement.client}</p>
                      <p className="text-sm text-muted-foreground">Échéance : {paiement.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-foreground">{paiement.montant} €</p>
                    <div
                      className={cn(
                        "px-2 py-1 rounded-md text-xs font-medium",
                        paiement.statut === "en_retard"
                          ? "bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300"
                          : "bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300"
                      )}
                    >
                      {paiement.statut === "en_retard" ? "En retard" : "En attente"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default AccountingPageComponent
