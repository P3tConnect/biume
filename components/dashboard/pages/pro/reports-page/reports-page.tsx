"use client"

import { BarChart4, FileText, HeartPulse, PenSquare, Plus, Sparkles, Table } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import React, { useState } from "react"

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

  return (
    <div className="flex flex-col gap-6">
      {/* Header Card */}
      <Card className="overflow-hidden rounded-2xl">
        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Rapports
              </CardTitle>
              <p className="text-sm text-muted-foreground">Gérez et analysez vos rapports d&apos;activité</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-xl hover:bg-secondary/30 hover:border-secondary/70 transition-all duration-300 dark:border-gray-700"
              >
                <Table className="size-4 mr-2" />
                Liste des rapports
              </Button>
              <Button
                className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300"
                onClick={() => router.push(`/dashboard/organization/${orgId}/reports/new`)}
              >
                <Plus className="size-4 mr-2" />
                Nouveau rapport
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all" className="gap-2">
            <FileText className="h-4 w-4" />
            Tous les rapports
          </TabsTrigger>
          <TabsTrigger value="recent">Récents</TabsTrigger>
          <TabsTrigger value="archived">Archivés</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center py-8">Aucun rapport disponible</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center py-8">Aucun rapport récent</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center py-8">Aucun rapport archivé</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Module de Rapports - Accès aux composants */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Outils de rapports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Générateur de Rapports */}
          <Card
            className="hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => router.push(`/dashboard/organization/${orgId}/reports/generator`)}
          >
            <CardHeader className="pb-2">
              <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 w-full absolute top-0 left-0 right-0"></div>
              <div className="flex justify-between items-start pt-4">
                <FileText className="h-8 w-8 text-blue-500" />
              </div>
              <CardTitle className="text-lg mt-2">Générateur de Rapports</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Créez des rapports professionnels à partir de modèles prédéfinis ou personnalisés
              </p>
            </CardContent>
          </Card>

          {/* Éditeur de Modèles */}
          <Card
            className="hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => router.push(`/dashboard/organization/${orgId}/reports/templates`)}
          >
            <CardHeader className="pb-2">
              <div className="h-2 bg-gradient-to-r from-green-500 to-emerald-500 w-full absolute top-0 left-0 right-0"></div>
              <div className="flex justify-between items-start pt-4">
                <PenSquare className="h-8 w-8 text-green-500" />
              </div>
              <CardTitle className="text-lg mt-2">Éditeur de Modèles</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Créez et personnalisez vos propres modèles de rapports adaptés à vos besoins
              </p>
            </CardContent>
          </Card>

          {/* Visualisation de Données */}
          <Card
            className="hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => router.push(`/dashboard/organization/${orgId}/reports/analytics`)}
          >
            <CardHeader className="pb-2">
              <div className="h-2 bg-gradient-to-r from-amber-500 to-orange-500 w-full absolute top-0 left-0 right-0"></div>
              <div className="flex justify-between items-start pt-4">
                <BarChart4 className="h-8 w-8 text-amber-500" />
              </div>
              <CardTitle className="text-lg mt-2">Analytiques</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Visualisez et analysez les données de votre clinique avec des graphiques interactifs
              </p>
            </CardContent>
          </Card>

          {/* Diagrammes anatomiques */}
          <Card
            className="hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => router.push(`/dashboard/organization/${orgId}/reports/diagrams`)}
          >
            <CardHeader className="pb-2">
              <div className="h-2 bg-gradient-to-r from-red-500 to-rose-500 w-full absolute top-0 left-0 right-0"></div>
              <div className="flex justify-between items-start pt-4">
                <HeartPulse className="h-8 w-8 text-red-500" />
              </div>
              <CardTitle className="text-lg mt-2">Diagrammes Anatomiques</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Créez des diagrammes anatomiques interactifs pour illustrer les zones symptomatiques
              </p>
            </CardContent>
          </Card>

          {/* Assistant IA */}
          <Card
            className="hover:shadow-md transition-all duration-300 cursor-pointer"
            onClick={() => router.push(`/dashboard/organization/${orgId}/reports/ai-assistant`)}
          >
            <CardHeader className="pb-2">
              <div className="h-2 bg-gradient-to-r from-purple-500 to-pink-500 w-full absolute top-0 left-0 right-0"></div>
              <div className="flex justify-between items-start pt-4">
                <Sparkles className="h-8 w-8 text-purple-500" />
              </div>
              <CardTitle className="text-lg mt-2">Assistant IA</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Générez des rapports automatiquement à partir de vos observations (Bientôt disponible)
              </p>
              <div className="mt-2 text-xs px-2 py-1 bg-muted inline-block rounded-full">Prochainement</div>
            </CardContent>
          </Card>
        </div>
      </div>

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
  )
}

export default ReportsPageComponent
