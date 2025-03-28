"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ClipboardList, PenLine } from "lucide-react"
import Link from "next/link"

import { SimpleReportBuilder } from "@/components/reports-editor/reports/simple-report-builder"
import { AdvancedReportBuilder } from "@/components/reports-editor/reports/advanced-report-builder"

export default function ReportsBuilderPage() {
  const params = useParams<{ orgId: string }>()
  const [activeTab, setActiveTab] = useState<string>("simple")

  return (
    <div className="h-screen flex flex-col w-full">
      <div className="border-b bg-white w-full shrink-0">
        <div className="w-full px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
              <Link href={`/dashboard/organization/${params.orgId}/reports`}>
                <ChevronLeft className="h-4 w-4" />
                Retour
              </Link>
            </Button>
            <div>
              <h1 className="text-xl font-semibold">Création de compte rendu</h1>
              <p className="text-sm text-muted-foreground">Mode {activeTab === "simple" ? "simplifié" : "complet"}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col w-full h-[calc(100vh-4rem)]">
        <div className="w-full px-6 border-b shrink-0">
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("simple")}
              className={`flex items-center gap-2 py-3 px-1 border-b-2 transition-colors ${
                activeTab === "simple"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <ClipboardList className="h-4 w-4" />
              <span>Mode simplifié</span>
            </button>

            <button
              onClick={() => setActiveTab("advanced")}
              className={`flex items-center gap-2 py-3 px-1 border-b-2 transition-colors ${
                activeTab === "advanced"
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <PenLine className="h-4 w-4" />
              <span>Mode complet</span>
            </button>
          </div>
        </div>

        <div className="flex-1 bg-gray-50 w-full overflow-hidden">
          <div className="w-full h-full">
            <TabsContent value="simple" className="h-full w-full">
              <SimpleReportBuilder orgId={params.orgId} />
            </TabsContent>

            <TabsContent value="advanced" className="h-full w-full">
              <AdvancedReportBuilder orgId={params.orgId} />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
