"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Upload, FileText, ChevronLeft } from "lucide-react"
import Link from "next/link"

import { PrescriptionUploader } from "@/components/reports-editor/prescriptions/prescription-uploader"
import { PrescriptionBuilder } from "@/components/reports-editor/prescriptions/prescription-builder"

export default function PrescriptionsPage() {
  const params = useParams<{ orgId: string }>()
  const [activeTab, setActiveTab] = useState<string>("create")

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
                <h1 className="text-xl font-semibold text-foreground">Gestion des Ordonnances</h1>
                <p className="text-sm text-muted-foreground">Créez ou importez des ordonnances pour vos patients</p>
              </div>
              <div className="flex gap-4 items-center border-l pl-6">
                <button
                  onClick={() => setActiveTab("create")}
                  className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors ${activeTab === "create"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  <FileText className="h-4 w-4" />
                  <span>Créer une ordonnance</span>
                </button>

                <button
                  onClick={() => setActiveTab("upload")}
                  className={`flex items-center gap-2 py-2 px-3 rounded-md transition-colors ${activeTab === "upload"
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                >
                  <Upload className="h-4 w-4" />
                  <span>Importer une ordonnance</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col w-full">
        <div className="flex-1 w-full overflow-hidden">
          <div className="w-full h-full">
            <TabsContent value="create" className="h-full w-full p-6">
              <PrescriptionBuilder orgId={params.orgId} />
            </TabsContent>

            <TabsContent value="upload" className="h-full w-full p-6">
              <PrescriptionUploader orgId={params.orgId} />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
