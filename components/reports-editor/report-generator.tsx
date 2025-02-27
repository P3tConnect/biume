"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ReportTemplateSelector } from "./report-template-selector";
import { ReportEditor } from "./report-editor";
import { DataVisualizer } from "./data-visualizer";
import { TemplateBuilder } from "./template-builder";
import {
  File,
  Sparkles,
  BarChart4,
  FileEdit,
  Download,
  Eye,
  Share2
} from "lucide-react";

export type ReportType =
  | "health"
  | "surgery"
  | "behavior"
  | "nutrition"
  | "statistics";

export interface ReportTemplate {
  id: string;
  name: string;
  type: ReportType;
  description: string;
  thumbnail: string;
}

export function ReportGenerator() {
  const [activeTab, setActiveTab] = useState<string>("create");
  const [selectedTemplate, setSelectedTemplate] = useState<ReportTemplate | null>(null);
  const [reportData, setReportData] = useState<Record<string, any>>({});

  const handleTemplateSelect = (template: ReportTemplate) => {
    setSelectedTemplate(template);
  };

  const handleCreateReport = () => {
    // Logic to create and save the report
    console.log("Creating report with data:", reportData);
  };

  const handlePreviewReport = () => {
    // Logic to preview the report
    console.log("Previewing report");
  };

  const handleShareReport = () => {
    // Logic to share the report
    console.log("Sharing report");
  };

  const handleDownloadReport = () => {
    // Logic to download the report
    console.log("Downloading report");
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Éditeur de Rapports Animaliers</h1>
          <p className="text-muted-foreground">
            Créez des rapports professionnels pour vos patients animaliers
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="create" className="flex items-center gap-2">
            <File className="h-4 w-4" />
            <span>Créer</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <FileEdit className="h-4 w-4" />
            <span>Modèles</span>
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart4 className="h-4 w-4" />
            <span>Analytiques</span>
          </TabsTrigger>
          <TabsTrigger value="ai" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            <span>IA Assistant</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create" className="mt-6 space-y-6">
          {!selectedTemplate ? (
            <ReportTemplateSelector onSelect={handleTemplateSelect} />
          ) : (
            <>
              <ReportEditor
                template={selectedTemplate}
                reportData={reportData}
                setReportData={setReportData}
              />

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setSelectedTemplate(null)}>
                  Retour
                </Button>
                <Button variant="outline" onClick={handlePreviewReport}>
                  <Eye className="h-4 w-4 mr-2" />
                  Aperçu
                </Button>
                <Button variant="outline" onClick={handleShareReport}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Partager
                </Button>
                <Button variant="outline" onClick={handleDownloadReport}>
                  <Download className="h-4 w-4 mr-2" />
                  Télécharger
                </Button>
                <Button onClick={handleCreateReport}>
                  Créer le rapport
                </Button>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <TemplateBuilder />
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <DataVisualizer />
        </TabsContent>

        <TabsContent value="ai" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Assistant IA pour Rapports</CardTitle>
              <CardDescription>
                Utilisez l'intelligence artificielle pour générer des rapports détaillés à partir de vos notes ou observations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center border rounded-md p-4">
                <p className="text-muted-foreground text-center">
                  Fonctionnalité d'assistant IA en développement
                  <br />
                  <span className="text-sm">Bientôt disponible</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 