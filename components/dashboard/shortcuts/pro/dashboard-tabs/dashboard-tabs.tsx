"use client"

import { BellRing, Calendar, FileText, PawPrint, Plus, Users2 } from "lucide-react"
import React, { useEffect, useState } from "react"

import CalendarWidget from "@/components/dashboard/shortcuts/calendar-widget"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { PatientsHeader } from "./patients-tab/patients-header"
import { PlanningHeader } from "./planning-tab/planning-header"
import { RappelsHeader } from "./reminders-tab/rappels-header"
import { RapportsHeader } from "./reports-tab/rapports-header"
import { PatientsList } from "./patients-tab/patients-list"
import ClientsList from "./clients-tab/clients-list"
import ClientsHeader from "./clients-tab/clients-header"

export const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("planning")

  useEffect(() => {
    const savedTab = localStorage.getItem("dashboard-active-tab")
    if (savedTab) {
      if (savedTab === "dossiers" || savedTab === "analyses") {
        setActiveTab("planning")
      } else {
        setActiveTab(savedTab)
      }
    }
  }, [])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    localStorage.setItem("dashboard-active-tab", value)
  }

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full h-full">
      <div className="relative mb-3 mt-1 w-full flex justify-start">
        <TabsList className="inline-flex gap-1 bg-transparent p-0">
          <TabsTrigger
            value="planning"
            className="flex items-center gap-2 px-2.5 py-2 border border-transparent rounded-lg hover:bg-muted/20 hover:border-muted transition-all duration-200 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/20 data-[state=active]:font-medium"
          >
            <div className="bg-background/80 rounded-full p-1 border border-muted/30 shadow-sm">
              <Calendar className="h-4 w-4" />
            </div>
            <span>Planning</span>
          </TabsTrigger>
          <TabsTrigger
            value="patients"
            className="flex items-center gap-2 px-2.5 py-2 border border-transparent rounded-lg hover:bg-muted/20 hover:border-muted transition-all duration-200 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/20 data-[state=active]:font-medium"
          >
            <div className="bg-background/80 rounded-full p-1 border border-muted/30 shadow-sm">
              <PawPrint className="h-4 w-4" />
            </div>
            <span>Patients</span>
          </TabsTrigger>
          <TabsTrigger
            value="clients"
            className="flex items-center gap-2 px-2.5 py-2 border border-transparent rounded-lg hover:bg-muted/20 hover:border-muted transition-all duration-200 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/20 data-[state=active]:font-medium"
          >
            <div className="bg-background/80 rounded-full p-1 border border-muted/30 shadow-sm">
              <Users2 className="h-4 w-4" />
            </div>
            <span>Clients</span>
          </TabsTrigger>
          <TabsTrigger
            value="rappels"
            className="flex items-center gap-2 px-2.5 py-2 border border-transparent rounded-lg hover:bg-muted/20 hover:border-muted transition-all duration-200 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/20 data-[state=active]:font-medium"
          >
            <div className="bg-background/80 rounded-full p-1 border border-muted/30 shadow-sm">
              <BellRing className="h-4 w-4" />
            </div>
            <span>Rappels</span>
          </TabsTrigger>
          <TabsTrigger
            value="rapports"
            className="flex items-center gap-2 px-2.5 py-2 border border-transparent rounded-lg hover:bg-muted/20 hover:border-muted transition-all duration-200 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/20 data-[state=active]:font-medium"
          >
            <div className="bg-background/80 rounded-full p-1 border border-muted/30 shadow-sm">
              <FileText className="h-4 w-4" />
            </div>
            <span>Rapports</span>
          </TabsTrigger>
          {/* <TabsTrigger
            value="communications"
            className="flex items-center gap-2 px-2.5 py-2 border border-transparent rounded-lg hover:bg-muted/20 hover:border-muted transition-all duration-200 data-[state=active]:bg-primary/10 data-[state=active]:text-primary data-[state=active]:border-primary/20 data-[state=active]:font-medium"
          >
            <div className="bg-background/80 rounded-full p-1 border border-muted/30 shadow-sm">
              <MessageCircle className="h-4 w-4" />
            </div>
            <span>Messages</span>
          </TabsTrigger> */}
        </TabsList>
      </div>

      <TabsContent value="planning" className="m-0 overflow-y-auto">
        <div className="space-y-2">
          <PlanningHeader />

          <Card className="rounded-xl">
            <CardContent className="p-1">
              <CalendarWidget />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="patients" className="m-0 overflow-y-auto">
        <div className="space-y-2">
          <PatientsHeader />
          <PatientsList />
        </div>
      </TabsContent>

      <TabsContent value="clients" className="m-0 overflow-y-auto">
        <div className="space-y-2">
          <ClientsHeader />
          <ClientsList />
        </div>
      </TabsContent>

      <TabsContent value="rappels" className="m-0 overflow-y-auto">
        <div className="space-y-2">
          <RappelsHeader />

          <Card className="border shadow-sm">
            <CardContent className="p-4">
              <div className="text-center text-muted-foreground py-8">
                <BellRing className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p className="mb-2">Gérez vos rappels automatiques</p>
                <p className="text-sm max-w-md mx-auto">
                  Planifiez des rappels pour les vaccins, traitements réguliers et rendez-vous de suivi pour vos
                  patients.
                </p>
                <Button variant="outline" className="mt-4">
                  <Plus className="mr-2 h-4 w-4" />
                  Créer un rappel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="rapports" className="m-0 overflow-y-auto">
        <div className="space-y-2">
          <RapportsHeader />

          <Card className="border shadow-sm">
            <CardContent className="p-4">
              <div className="text-center text-muted-foreground py-8">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p className="mb-2">Rapports d&apos;activité</p>
                <p className="text-sm max-w-md mx-auto">
                  Générez et consultez des rapports détaillés sur l&apos;activité de votre clinique, les traitements
                  effectués et le suivi des patients.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* <TabsContent value="communications" className="m-0 overflow-y-auto">
        <div className="space-y-4">
          <MessagesHeader />

          <Card className="border shadow-sm">
            <CardContent className="p-4">
              <div className="text-center text-muted-foreground py-8">
                <MessageCircle className="h-12 w-12 mx-auto mb-3 opacity-20" />
                <p className="mb-2">Aucun message récent</p>
                <p className="text-sm max-w-md mx-auto">
                  Ici seront affichés vos messages, rappels automatiques et communications avec les propriétaires
                  d&apos;animaux.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent> */}
    </Tabs>
  )
}
