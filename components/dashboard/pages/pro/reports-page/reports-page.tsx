"use client"

import { BarChart4, FileText, HeartPulse, PenSquare, Plus, Sparkles, Table } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React, { useState } from "react"
import { useSubscriptionCheck } from "@/src/hooks/use-subscription-check"
import SubscriptionNonPayedAlert from "@/components/subscription-non-payed-card/subscription-non-payed-card"

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
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
      <div className="flex flex-col gap-6">
        {/* En-tête avec statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-sm text-blue-600 dark:text-blue-400">Total des rapports</p>
                  <h3 className="text-2xl font-bold">124</h3>
                </div>
                <div className="p-2 bg-blue-500/10 rounded-xl">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-sm text-purple-600 dark:text-purple-400">Rapports ce mois</p>
                  <h3 className="text-2xl font-bold">28</h3>
                </div>
                <div className="p-2 bg-purple-500/10 rounded-xl">
                  <BarChart4 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 border-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">Modèles disponibles</p>
                  <h3 className="text-2xl font-bold">12</h3>
                </div>
                <div className="p-2 bg-emerald-500/10 rounded-xl">
                  <PenSquare className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
            </CardHeader>
          </Card>

          <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 border-none">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <p className="text-sm text-amber-600 dark:text-amber-400">Rapports partagés</p>
                  <h3 className="text-2xl font-bold">45</h3>
                </div>
                <div className="p-2 bg-amber-500/10 rounded-xl">
                  <HeartPulse className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        {/* Actions rapides */}
        <div className="flex flex-wrap gap-4">
          <Button
            onClick={() => router.push(`/dashboard/organization/${orgId}/reports/new`)}
            className="flex-1 md:flex-none bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl py-6"
          >
            <Plus className="size-5 mr-2" />
            Nouveau rapport
          </Button>
          <Button
            variant="outline"
            className="flex-1 md:flex-none rounded-xl py-6 border-2 hover:bg-secondary/30 hover:border-secondary/70"
          >
            <Table className="size-5 mr-2" />
            Liste des rapports
          </Button>
        </div>

        {/* Onglets principaux */}
        <Tabs defaultValue="all" className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Rapports
              </h1>
              <p className="text-sm text-muted-foreground">Gérez et analysez vos rapports d&apos;activité</p>
            </div>
            <TabsList className="bg-background border rounded-xl">
              <TabsTrigger value="all" className="rounded-xl data-[state=active]:bg-primary/10">
                Tous
              </TabsTrigger>
              <TabsTrigger value="recent" className="rounded-xl data-[state=active]:bg-primary/10">
                Récents
              </TabsTrigger>
              <TabsTrigger value="archived" className="rounded-xl data-[state=active]:bg-primary/10">
                Archivés
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Carte des outils */}
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                <CardHeader className="relative pb-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 group-hover:from-blue-600/30 group-hover:to-purple-600/30 transition-all duration-300" />
                  <div className="relative">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-sm">
                        <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                      </div>
                    </div>
                    <CardTitle className="mt-4 text-lg">Générateur de Rapports</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      Créez des rapports professionnels à partir de modèles prédéfinis
                    </p>
                  </div>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                <CardHeader className="relative pb-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-green-600/20 group-hover:from-emerald-600/30 group-hover:to-green-600/30 transition-all duration-300" />
                  <div className="relative">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-sm">
                        <PenSquare className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                      </div>
                    </div>
                    <CardTitle className="mt-4 text-lg">Éditeur de Modèles</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      Personnalisez vos modèles selon vos besoins spécifiques
                    </p>
                  </div>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden">
                <CardHeader className="relative pb-2">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 group-hover:from-purple-600/30 group-hover:to-pink-600/30 transition-all duration-300" />
                  <div className="relative">
                    <div className="flex justify-between items-start">
                      <div className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-xl shadow-sm">
                        <Sparkles className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                      </div>
                    </div>
                    <CardTitle className="mt-4 text-lg">Assistant IA</CardTitle>
                    <p className="text-sm text-muted-foreground mt-2">
                      Générez des rapports automatiquement avec l&apos;IA
                    </p>
                    <div className="mt-3 text-xs px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 inline-block rounded-full">
                      Prochainement
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recent">
            <Card className="border-dashed">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Aucun rapport récent</p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => router.push(`/dashboard/organization/${orgId}/reports/new`)}
                  >
                    Créer un nouveau rapport
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archived">
            <Card className="border-dashed">
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-muted-foreground">Aucun rapport archivé</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

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
