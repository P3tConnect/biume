"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  ChevronLeft,
  Loader2,
  Upload,
  FileText,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface DocumentsUploadFormProps {
  accountId: string | null;
  onComplete: () => void;
  onBack: () => void;
}

type DocumentStatus = "pending" | "uploading" | "success" | "error";

interface DocumentItem {
  id: string;
  name: string;
  description: string;
  status: DocumentStatus;
  progress: number;
  errorMessage?: string;
}

// Dans une application réelle, cette fonction serait implémentée dans l'API route
const uploadDocument = async (
  file: File,
  accountId: string,
  documentType: string,
): Promise<any> => {
  return new Promise((resolve, reject) => {
    // Simuler un téléchargement
    setTimeout(() => {
      // 90% du temps, on simule un succès
      if (Math.random() > 0.1) {
        resolve({
          success: true,
          fileId: "file_" + Math.random().toString(36).substring(2, 9),
        });
      } else {
        reject(new Error("Erreur lors du téléchargement. Veuillez réessayer."));
      }
    }, 2000);
  });
};

export function DocumentsUploadForm({
  accountId,
  onComplete,
  onBack,
}: DocumentsUploadFormProps) {
  const [documents, setDocuments] = useState<DocumentItem[]>([
    {
      id: "identity_doc",
      name: "Pièce d'identité du représentant légal",
      description: "Carte d'identité, passeport ou permis de conduire",
      status: "pending",
      progress: 0,
    },
    {
      id: "company_proof",
      name: "Justificatif d'entreprise",
      description: "Extrait Kbis de moins de 3 mois",
      status: "pending",
      progress: 0,
    },
    {
      id: "bank_statement",
      name: "Relevé bancaire",
      description: "Relevé bancaire récent (moins de 3 mois)",
      status: "pending",
      progress: 0,
    },
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileSelect = async (documentId: string, file: File) => {
    if (!accountId) {
      toast.error("ID de compte invalide");
      return;
    }

    // Mettre à jour le statut du document
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === documentId
          ? { ...doc, status: "uploading" as DocumentStatus, progress: 0 }
          : doc,
      ),
    );

    // Simuler une progression d'upload
    const progressInterval = setInterval(() => {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === documentId &&
          doc.status === "uploading" &&
          doc.progress < 90
            ? { ...doc, progress: doc.progress + 10 }
            : doc,
        ),
      );
    }, 200);

    try {
      await uploadDocument(file, accountId, documentId);

      clearInterval(progressInterval);

      // Mettre à jour le statut du document
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === documentId
            ? { ...doc, status: "success" as DocumentStatus, progress: 100 }
            : doc,
        ),
      );

      toast.success(`Document "${file.name}" téléchargé avec succès`);
    } catch (err: any) {
      clearInterval(progressInterval);

      // Mettre à jour le statut du document
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === documentId
            ? {
                ...doc,
                status: "error" as DocumentStatus,
                progress: 0,
                errorMessage: err.message,
              }
            : doc,
        ),
      );

      toast.error("Erreur de téléchargement", {
        description: err.message || "Veuillez réessayer",
      });
    }
  };

  const handleSubmit = async () => {
    // Vérifier que tous les documents sont téléchargés
    const allUploaded = documents.every((doc) => doc.status === "success");

    if (!allUploaded) {
      toast.error("Documents manquants", {
        description: "Veuillez télécharger tous les documents requis",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      // Dans une application réelle, vous pourriez faire une dernière vérification avec le serveur ici

      toast.success("Documents validés avec succès");
      onComplete();
    } catch (err: any) {
      toast.error("Erreur", {
        description: err.message || "Une erreur s'est produite",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Documents justificatifs</h2>
        <p className="text-gray-500 mt-1">
          Téléchargez les documents requis pour compléter la vérification de
          votre compte.
        </p>
      </div>

      <Alert>
        <AlertTitle>Informations importantes</AlertTitle>
        <AlertDescription>
          Tous les documents doivent être lisibles, non expirés et montrer
          clairement les informations complètes. Les fichiers acceptés sont :
          JPG, PNG et PDF (max 10 Mo).
        </AlertDescription>
      </Alert>

      <div className="space-y-4">
        {documents.map((document) => (
          <Card key={document.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">{document.name}</h3>
                  <p className="text-sm text-gray-500">
                    {document.description}
                  </p>

                  {document.status === "error" && (
                    <p className="text-sm text-red-600">
                      {document.errorMessage}
                    </p>
                  )}
                </div>

                <div className="flex items-center">
                  {document.status === "pending" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="relative"
                      onClick={() => {
                        const input = window.document.createElement("input");
                        input.type = "file";
                        input.accept = "image/jpeg,image/png,application/pdf";
                        input.onchange = (e: Event) => {
                          const target = e.target as HTMLInputElement;
                          const file = target.files?.[0];
                          if (file) {
                            handleFileSelect(document.id, file);
                          }
                        };
                        input.click();
                      }}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Télécharger
                    </Button>
                  )}

                  {document.status === "uploading" && (
                    <Button disabled variant="outline" size="sm">
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {document.progress}%
                    </Button>
                  )}

                  {document.status === "success" && (
                    <div className="flex items-center">
                      <CheckCircle2 className="w-5 h-5 mr-2 text-green-600" />
                      <span className="text-sm text-green-600">Téléchargé</span>
                    </div>
                  )}

                  {document.status === "error" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="relative"
                      onClick={() => {
                        const input = window.document.createElement("input");
                        input.type = "file";
                        input.accept = "image/jpeg,image/png,application/pdf";
                        input.onchange = (e: Event) => {
                          const target = e.target as HTMLInputElement;
                          const file = target.files?.[0];
                          if (file) {
                            handleFileSelect(document.id, file);
                          }
                        };
                        input.click();
                      }}
                    >
                      <XCircle className="w-4 h-4 mr-2 text-red-600" />
                      Réessayer
                    </Button>
                  )}
                </div>
              </div>

              {document.status === "uploading" && (
                <Progress value={document.progress} className="mt-2 h-1" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Retour
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={
            isSubmitting || !documents.every((doc) => doc.status === "success")
          }
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Traitement...
            </>
          ) : (
            "Continuer"
          )}
        </Button>
      </div>
    </div>
  );
}
