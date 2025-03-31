"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ClipboardList, PenLine } from "lucide-react"
import Link from "next/link"

import { SimpleReportBuilder } from "@/components/reports-module/reports/simple-report-builder"
import { AdvancedReportBuilder } from "@/components/reports-module/reports/advanced-report-builder"

export default function ReportsBuilderPage() {
  const params = useParams<{ orgId: string }>()
  const [activeTab, setActiveTab] = useState<string>("simple")

  return (
    <div className="flex flex-col w-full">
      <div className="border-b bg-background w-full shrink-0">
        <div className="w-full px-6 py-2 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground" asChild>
              <Link href={`/dashboard/organization/${params.orgId}/reports`}>
                <ChevronLeft className="h-4 w-4" />
                Retour
              </Link>
            </Button>
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-xl font-semibold text-foreground">Création de compte rendu</h1>
                <p className="text-sm text-muted-foreground">Mode {activeTab === "simple" ? "simplifié" : "complet"}</p>
              </div>
              <div className="flex gap-4 items-center border-l pl-6">
                <button
                  onClick={() => setActiveTab("simple")}
                  className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors ${activeTab === "simple"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  <ClipboardList className="h-4 w-4" />
                  <span>Mode simplifié</span>
                </button>

                <button
                  onClick={() => setActiveTab("advanced")}
                  className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors ${activeTab === "advanced"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  <PenLine className="h-4 w-4" />
                  <span>Mode complet</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col w-full">
        <div className="flex-1 w-full overflow-hidden">
          <div className="w-full h-full">
            <TabsContent value="simple" className="h-full w-full">
              <SimpleReportBuilder orgId={params.orgId} />
            </TabsContent>

            <TabsContent value="advanced" className="h-full w-full">
              <AdvancedReportBuilder orgId={params.orgId} />
            </TabsContent>
          </div>
        </div>
      </Tabs >
    </div >
  )
}
