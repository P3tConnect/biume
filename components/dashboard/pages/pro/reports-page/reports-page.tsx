"use client"

import { BarChart4, FileText, HeartPulse, Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React, { useState } from "react"
import { useSubscriptionCheck } from "@/src/hooks/use-subscription-check"
import SubscriptionNonPayedAlert from "@/components/subscription-non-payed-card/subscription-non-payed-card"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Separator,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui"

import ReportDetailsDrawer, { type Report } from "./report-details-drawer"

const ReportsPageComponent = () => {
  const router = useRouter()
  const params = useParams()
  const orgId = params.orgId as string
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const { shouldShowAlert, organizationId } = useSubscriptionCheck()

  return (
    <>
      {shouldShowAlert && organizationId && <SubscriptionNonPayedAlert organizationId={organizationId} />}
      <div className="flex flex-col gap-6 mx-auto p-2">
        {/* En-tête */}
        <Card className="rounded-2xl">
          <CardHeader className="border-b border-gray-100 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Documents médicaux
                </CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                  Gérez vos ordonnances et rapports en toute simplicité
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className="bg-background"
                  onClick={() => router.push(`/dashboard/organization/${orgId}/prescriptions/new`)}
                >
                  <HeartPulse className="h-4 w-4 mr-2" />
                  Nouvelle Ordonnance
                </Button>
                <Button
                  variant="outline"
                  className="bg-background"
                  onClick={() => router.push(`/dashboard/organization/${orgId}/reports/new`)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Nouveau Rapport
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Documents</p>
                  <p className="text-2xl font-semibold">124</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <HeartPulse className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ordonnances</p>
                  <p className="text-2xl font-semibold">45</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rapports</p>
                  <p className="text-2xl font-semibold">79</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <BarChart4 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ce mois</p>
                  <p className="text-2xl font-semibold">28</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Récents */}
        <Card>
          <CardHeader>
            <CardTitle>Documents Récents</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
                <TabsTrigger value="all" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">
                  Tous
                </TabsTrigger>
                <TabsTrigger value="prescriptions" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">
                  Ordonnances
                </TabsTrigger>
                <TabsTrigger value="reports" className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow">
                  Rapports
                </TabsTrigger>
              </TabsList>

              <div className="mt-4">
                <TabsContent value="all">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-primary/10 p-4 mb-4">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-lg font-medium mb-2">Aucun document récent</p>
                    <p className="text-sm text-muted-foreground">Commencez par créer une ordonnance ou un rapport</p>
                  </div>
                </TabsContent>
                <TabsContent value="prescriptions">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-primary/10 p-4 mb-4">
                      <HeartPulse className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-lg font-medium mb-2">Aucune ordonnance récente</p>
                    <p className="text-sm text-muted-foreground">Créez votre première ordonnance</p>
                  </div>
                </TabsContent>
                <TabsContent value="reports">
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="rounded-full bg-primary/10 p-4 mb-4">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <p className="text-lg font-medium mb-2">Aucun rapport récent</p>
                    <p className="text-sm text-muted-foreground">Créez votre premier rapport</p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <ReportDetailsDrawer
          report={selectedReport}
          isOpen={!!selectedReport}
          onClose={() => setSelectedReport(null)}
          onEdit={report => {
            // TODO: Implement edit functionality
            console.log("Edit report:", report)
          }}
          onDelete={report => {
            // TODO: Implement delete functionality
            console.log("Delete report:", report)
          }}
          onDownload={report => {
            // TODO: Implement download functionality
            console.log("Download report:", report)
          }}
          onShare={report => {
            // TODO: Implement share functionality
            console.log("Share report:", report)
          }}
        />
      </div>
    </>
  )
}

export default ReportsPageComponent

