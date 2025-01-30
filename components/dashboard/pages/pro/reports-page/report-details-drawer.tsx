"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  Button,
  ScrollArea,
  Separator,
  Card,
} from "@/components/ui";
import {
  FileText,
  Edit2,
  Trash2,
  Calendar,
  User,
  Clock,
  Activity,
  Download,
  Share2,
  Tag,
} from "lucide-react";

export interface Report {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  status: "draft" | "published" | "archived";
  author: string;
  category: string;
  tags: string[];
}

interface ReportDetailsDrawerProps {
  report: Report | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (report: Report) => void;
  onDelete?: (report: Report) => void;
  onDownload?: (report: Report) => void;
  onShare?: (report: Report) => void;
}

const ReportDetailsDrawer = ({
  report,
  isOpen,
  onClose,
  onEdit,
  onDelete,
  onDownload,
  onShare,
}: ReportDetailsDrawerProps) => {
  if (!report) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-3xl p-0 bg-background">
        {/* Hero Section */}
        <div className="relative h-48 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6">
          <SheetHeader className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent pt-24">
            <div className="flex items-center justify-between w-full mx-auto">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-background rounded-xl shadow-sm">
                  <FileText className="size-5" />
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <SheetTitle className="text-3xl font-bold">
                      {report.title}
                    </SheetTitle>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground mt-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        {report.createdAt.toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-2">
                      <Tag className="h-4 w-4" />
                      <span className="capitalize">{report.status}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {onShare && (
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => onShare(report)}
                  >
                    <Share2 className="h-4 w-4 mr-2" />
                    Partager
                  </Button>
                )}
                {onDownload && (
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => onDownload(report)}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Télécharger
                  </Button>
                )}
                {onEdit && (
                  <Button
                    variant="outline"
                    size="default"
                    onClick={() => onEdit(report)}
                  >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Modifier
                  </Button>
                )}
                {onDelete && (
                  <Button
                    variant="destructive"
                    size="default"
                    onClick={() => onDelete(report)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Supprimer
                  </Button>
                )}
              </div>
            </div>
          </SheetHeader>
        </div>

        <ScrollArea className="h-[calc(100vh-12rem)]">
          <div className="w-full mx-auto px-6">
            <div className="space-y-6 py-6">
              {/* Report Details */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">
                  Détails du rapport
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Auteur</p>
                      <p className="font-medium">{report.author}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Tag className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Catégorie</p>
                      <p className="font-medium capitalize">
                        {report.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Date de création
                      </p>
                      <p className="font-medium">
                        {report.createdAt.toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Dernière modification
                      </p>
                      <p className="font-medium">
                        {report.updatedAt.toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Report Content */}
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4">Contenu</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {report.description}
                </p>
              </Card>

              {/* Tags */}
              {report.tags && report.tags.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {report.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-primary/10 rounded-full text-sm"
                      >
                        {tag}
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Activity */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-lg">Activité récente</h3>
                  <Button variant="outline" size="sm">
                    Voir tout
                  </Button>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg mt-1">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Rapport créé</p>
                      <p className="text-sm text-muted-foreground">
                        {report.createdAt.toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  {report.updatedAt > report.createdAt && (
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg mt-1">
                        <Activity className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">Rapport modifié</p>
                        <p className="text-sm text-muted-foreground">
                          {report.updatedAt.toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default ReportDetailsDrawer;
