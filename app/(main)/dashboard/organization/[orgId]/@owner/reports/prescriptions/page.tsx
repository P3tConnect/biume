"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { PrescriptionUploader } from "@/components/reports-editor/prescriptions/prescription-uploader"
import { PrescriptionBuilder } from "@/components/reports-editor/prescriptions/prescription-builder"

export default function PrescriptionsPage() {
  const params = useParams<{ orgId: string }>()
  const [activeTab, setActiveTab] = useState<string>("create")

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/dashboard/organization/${params.orgId}/reports`}>
                <ChevronLeft className="h-4 w-4" />
                Retour aux rapports
              </Link>
            </Button>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Gestion des Ordonnances</h1>
          <p className="text-muted-foreground">Créez ou importez des ordonnances pour vos patients</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Créer une ordonnance</span>
          </TabsTrigger>
          <TabsTrigger value="upload" className="flex items-center gap-2">
            <Upload className="h-4 w-4" />
            <span>Importer une ordonnance</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="mt-6">
          <PrescriptionBuilder orgId={params.orgId} />
        </TabsContent>

        <TabsContent value="upload" className="mt-6">
          <PrescriptionUploader orgId={params.orgId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
