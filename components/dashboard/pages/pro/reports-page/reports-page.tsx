"use client";

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
} from "@/components/ui";
import { FileText, Plus, Table } from "lucide-react";
import React, { useState } from "react";
import ReportDetailsDrawer, { type Report } from "./report-details-drawer";

const ReportsPageComponent = () => {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

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
              <p className="text-sm text-muted-foreground">
                Gérez et analysez vos rapports d&apos;activité
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="rounded-xl hover:bg-secondary/30 hover:border-secondary/70 transition-all duration-300 dark:border-gray-700"
              >
                <Table className="size-4 mr-2" />
                Liste des rapports
              </Button>
              <Button className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 transition-all duration-300">
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
              <p className="text-muted-foreground text-center py-8">
                Aucun rapport disponible
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center py-8">
                Aucun rapport récent
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="archived">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground text-center py-8">
                Aucun rapport archivé
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ReportDetailsDrawer
        report={selectedReport}
        isOpen={!!selectedReport}
        onClose={() => setSelectedReport(null)}
        onEdit={(report) => {
          // TODO: Implement edit functionality
          console.log("Edit report:", report);
        }}
        onDelete={(report) => {
          // TODO: Implement delete functionality
          console.log("Delete report:", report);
        }}
        onDownload={(report) => {
          // TODO: Implement download functionality
          console.log("Download report:", report);
        }}
        onShare={(report) => {
          // TODO: Implement share functionality
          console.log("Share report:", report);
        }}
      />
    </div>
  );
};

export default ReportsPageComponent;
