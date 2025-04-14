"use client"

import { BarChart4, FileText, HeartPulse, Plus, Upload, Check, Clock, PenLine, ClipboardList } from "lucide-react"
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui"

import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui/credenza"

import ReportDetailsDrawer, { type Report } from "./report-details-drawer"

const ReportsPageComponent = () => {
  const router = useRouter()
  const params = useParams()
  const orgId = params.orgId as string
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const { shouldShowAlert, organizationId } = useSubscriptionCheck()
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)

  const handlePrescriptionModeSelect = (mode: "builder" | "upload") => {
    setShowPrescriptionModal(false)
    if (mode === "builder") {
      router.push(`/dashboard/organization/${orgId}/reports/prescriptions/create`)
    } else {
      router.push(`/dashboard/organization/${orgId}/reports/prescriptions/upload`)
    }
  }

  const handleReportModeSelect = (mode: "simple" | "advanced") => {
    setShowReportModal(false)
    if (mode === "simple") {
      router.push(`/dashboard/organization/${orgId}/reports/reports-builder/simple`)
    } else {
      router.push(`/dashboard/organization/${orgId}/reports/reports-builder/advanced`)
    }
  }

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
                  onClick={() => setShowPrescriptionModal(true)}
                >
                  <HeartPulse className="h-4 w-4 mr-2" />
                  Nouvelle Ordonnance
                </Button>
                <Button
                  variant="outline"
                  className="bg-background"
                  onClick={() => setShowReportModal(true)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Nouveau Rapport
                </Button>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Modale de sélection du mode d'ordonnance */}
        <Credenza open={showPrescriptionModal} onOpenChange={setShowPrescriptionModal}>
          <CredenzaContent className="max-w-md">
            <CredenzaHeader>
              <CredenzaTitle>Créer une nouvelle ordonnance</CredenzaTitle>
              <CredenzaDescription>
                Choisissez la méthode qui correspond le mieux à vos besoins
              </CredenzaDescription>
            </CredenzaHeader>
            <div className="space-y-6 py-6">
              <div
                className="group relative rounded-lg border p-4 hover:border-primary transition-colors cursor-pointer"
                onClick={() => handlePrescriptionModeSelect("builder")}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <PenLine className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium leading-none group-hover:text-primary transition-colors">
                      Créer une ordonnance
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Utilisez notre éditeur intégré pour créer une ordonnance structurée
                    </p>
                    <ul className="mt-2 text-sm space-y-1.5">
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        Modèles prédéfinis disponibles
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        Suggestions automatiques de médicaments
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        Format professionnel standardisé
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="group relative rounded-lg border p-4 hover:border-primary transition-colors cursor-pointer"
                onClick={() => handlePrescriptionModeSelect("upload")}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Upload className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-medium leading-none group-hover:text-primary transition-colors">
                      Importer une ordonnance
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Téléchargez une ordonnance existante au format PDF
                    </p>
                    <ul className="mt-2 text-sm space-y-1.5">
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        Importation rapide de documents
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        Conservation du format original
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        Archivage automatique
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CredenzaContent>
        </Credenza>

        {/* Modale de sélection du mode de rapport */}
        <Credenza open={showReportModal} onOpenChange={setShowReportModal}>
          <CredenzaContent className="max-w-md">
            <CredenzaHeader>
              <CredenzaTitle>Créer un nouveau rapport</CredenzaTitle>
              <CredenzaDescription>
                Choisissez le type de rapport adapté à votre consultation
              </CredenzaDescription>
            </CredenzaHeader>
            <div className="space-y-6 py-6">
              <div
                className="group relative rounded-lg border p-4 hover:border-primary transition-colors cursor-pointer"
                onClick={() => handleReportModeSelect("simple")}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ClipboardList className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium leading-none group-hover:text-primary transition-colors">
                        Rapport simple
                      </h3>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Recommandé</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Idéal pour les consultations de routine et les suivis standards
                    </p>
                    <ul className="mt-2 text-sm space-y-1.5">
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4 text-primary" />
                        Rédaction rapide en 2-3 minutes
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        Structure simple et efficace
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        Parfait pour le suivi quotidien
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div
                className="group relative rounded-lg border p-4 hover:border-primary transition-colors cursor-pointer"
                onClick={() => handleReportModeSelect("advanced")}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <BarChart4 className="h-6 w-6 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium leading-none group-hover:text-primary transition-colors">
                        Rapport détaillé
                      </h3>
                      <span className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded-full">Avancé</span>
                      <span className="px-2 py-0.5 text-xs font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white rounded-full">Bêta</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Pour les examens approfondis et les cas complexes
                    </p>
                    <ul className="mt-2 text-sm space-y-1.5">
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        Observations cliniques détaillées
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        Diagnostic d'exclusion intégré
                      </li>
                      <li className="flex items-center gap-2 text-muted-foreground">
                        <Check className="h-4 w-4 text-primary" />
                        Suivi des évolutions dans le temps
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </CredenzaContent>
        </Credenza>

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
                <TabsTrigger
                  value="all"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                >
                  Tous
                </TabsTrigger>
                <TabsTrigger
                  value="prescriptions"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                >
                  Ordonnances
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
                >
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
