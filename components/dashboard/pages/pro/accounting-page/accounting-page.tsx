"use client"

import { Euro, TrendingUp, Calendar, Users } from "lucide-react"
import React from "react"
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { cn } from "@/src/lib/utils"
import { useSubscriptionCheck } from "@/src/hooks/use-subscription-check"
import SubscriptionNonPayedAlert from "@/components/subscription-non-payed-card/subscription-non-payed-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AccountingHeader from "./accounting-header"

const AccountingPageComponent = () => {
  const { shouldShowAlert, organizationId } = useSubscriptionCheck()

  // Données simulées plus pertinentes pour un cabinet vétérinaire
  const mockData = {
    revenus: {
      montant: 13550,
      evolution: 7,
      periode: "ce mois",
      historique: [
        { mois: "Jan", consultations: 8200, produits: 3000 },
        { mois: "Fév", consultations: 8800, produits: 3300 },
        { mois: "Mar", consultations: 8500, produits: 3300 },
        { mois: "Avr", consultations: 9000, produits: 3500 },
        { mois: "Mai", consultations: 9200, produits: 3600 },
        { mois: "Juin", consultations: 9800, produits: 3750 },
      ],
    },
    statistiques: {
      nombreClients: 145,
      evolutionClients: 12,
      ticketMoyen: 93.45,
      evolutionTicket: 3,
      tauxRemplissage: 85,
      evolutionRemplissage: 5
    },
    prochainsReglements: [
      { client: "Marie Dupont", montant: 180, date: "15/06/2024", type: "Consultation + Vaccins" },
      { client: "Thomas Petit", montant: 345, date: "18/06/2024", type: "Chirurgie" },
      { client: "Julie Martin", montant: 95, date: "22/06/2024", type: "Consultation" },
    ],
  }

  return (
    <>
      {shouldShowAlert && organizationId && <SubscriptionNonPayedAlert organizationId={organizationId} />}
      <div className="flex flex-col gap-3 p-3">
        <AccountingHeader />

        {/* KPIs principaux */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Card className="rounded-xl">
            <CardHeader className="pb-2 pt-3 px-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Users className="h-4 w-4" />
                Clients du mois
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-3">
              <div className="flex flex-col gap-1">
                <p className="text-2xl font-bold">{mockData.statistiques.nombreClients}</p>
                <p className={cn(
                  "text-xs",
                  mockData.statistiques.evolutionClients > 0
                    ? "text-emerald-500"
                    : "text-rose-500"
                )}>
                  {mockData.statistiques.evolutionClients > 0 ? "+" : ""}
                  {mockData.statistiques.evolutionClients}% vs mois dernier
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader className="pb-2 pt-3 px-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Euro className="h-4 w-4" />
                Ticket moyen
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-3">
              <div className="flex flex-col gap-1">
                <p className="text-2xl font-bold">{mockData.statistiques.ticketMoyen}€</p>
                <p className={cn(
                  "text-xs",
                  mockData.statistiques.evolutionTicket > 0
                    ? "text-emerald-500"
                    : "text-rose-500"
                )}>
                  {mockData.statistiques.evolutionTicket > 0 ? "+" : ""}
                  {mockData.statistiques.evolutionTicket}% vs mois dernier
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl">
            <CardHeader className="pb-2 pt-3 px-3">
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Calendar className="h-4 w-4" />
                Taux de remplissage
              </CardTitle>
            </CardHeader>
            <CardContent className="pb-3 px-3">
              <div className="flex flex-col gap-1">
                <p className="text-2xl font-bold">{mockData.statistiques.tauxRemplissage}%</p>
                <p className={cn(
                  "text-xs",
                  mockData.statistiques.evolutionRemplissage > 0
                    ? "text-emerald-500"
                    : "text-rose-500"
                )}>
                  {mockData.statistiques.evolutionRemplissage > 0 ? "+" : ""}
                  {mockData.statistiques.evolutionRemplissage}% vs mois dernier
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Graphique d'évolution */}
        <Card className="rounded-xl">
          <CardHeader className="pb-2 pt-3 px-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              Évolution du chiffre d'affaires
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3 px-3">
            <div className="space-y-3">
              <div>
                <p className="text-2xl font-bold">{mockData.revenus.montant}€</p>
                <div className="flex items-center gap-2 mt-1">
                  <p className={cn(
                    "text-xs font-medium",
                    mockData.revenus.evolution > 0
                      ? "text-emerald-500"
                      : "text-rose-500"
                  )}>
                    {mockData.revenus.evolution > 0 ? "+" : ""}
                    {mockData.revenus.evolution}%
                  </p>
                  <p className="text-xs text-muted-foreground">vs mois dernier</p>
                </div>
              </div>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={mockData.revenus.historique}>
                    <defs>
                      <linearGradient id="colorConsultations" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorProduits" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0} />
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
                              <div className="grid gap-1">
                                <p className="text-[0.70rem] font-medium uppercase text-muted-foreground">
                                  {payload[0].payload.mois}
                                </p>
                                <div className="flex flex-col gap-1">
                                  <p className="text-[0.70rem] text-muted-foreground">
                                    Consultations: {payload[0].value}€
                                  </p>
                                  <p className="text-[0.70rem] text-muted-foreground">
                                    Produits: {payload[1].value}€
                                  </p>
                                  <p className="text-[0.70rem] font-bold text-muted-foreground">
                                    Total: {Number(payload[0]?.value || 0) + Number(payload[1]?.value || 0)}€
                                  </p>
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
                      dataKey="consultations"
                      stackId="1"
                      stroke="hsl(var(--primary))"
                      fill="url(#colorConsultations)"
                    />
                    <Area
                      type="monotone"
                      dataKey="produits"
                      stackId="1"
                      stroke="hsl(var(--secondary))"
                      fill="url(#colorProduits)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Prochains règlements */}
        <Card className="rounded-xl">
          <CardHeader className="pb-2 pt-3 px-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              Prochains règlements
            </CardTitle>
          </CardHeader>
          <CardContent className="pb-3 px-3">
            <div className="space-y-2">
              {mockData.prochainsReglements.map((reglement, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-2 hover:bg-muted rounded-md transition-colors"
                >
                  <div className="flex flex-col gap-0.5">
                    <p className="font-medium text-sm">{reglement.client}</p>
                    <p className="text-xs text-muted-foreground">{reglement.type}</p>
                  </div>
                  <div className="flex flex-col items-end gap-0.5">
                    <p className="font-bold text-sm">{reglement.montant}€</p>
                    <p className="text-xs text-muted-foreground">{reglement.date}</p>
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
