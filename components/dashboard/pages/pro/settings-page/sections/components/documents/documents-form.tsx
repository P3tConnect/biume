"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DropzoneInput } from "@/components/ui/dropzone-input";
import { useActionQuery, useActionMutation } from "@/src/hooks/action-hooks";
import { deleteCompanyDocument, getCompanyDocuments, updateCompanyDocuments } from "@/src/actions/companyDocuments.action";
import { useFormChangeToast } from "@/src/hooks/useFormChangeToast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { ExternalLink, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { documentsSchema, DocumentsFormData } from "./types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getDocumentName } from "@/src/lib/utils";

export const DocumentsForm = () => {
  const { data: documents, refetch: refetchDocuments } = useActionQuery(
    getCompanyDocuments,
    {},
    "company-documents"
  );

  const { mutateAsync: updateDocuments } = useActionMutation(updateCompanyDocuments, {
    onSuccess: () => {
      refetchDocuments();
      toast.success("Documents mis à jour avec succès!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<DocumentsFormData>({
    resolver: zodResolver(documentsSchema),
    values: {
      documents: documents?.map((document) => ({
        url: document.file,
        name: document.name || getDocumentName({ url: document.file, name: document.name }, 0)
      })) || [],
    },
  });

  const { control, setValue, handleSubmit, watch } = form;
  const currentDocuments = watch("documents") || [];

  const { mutateAsync: deleteDocument } = useActionMutation(deleteCompanyDocument, {
    onSuccess: () => {
      refetchDocuments();
      toast.success("Document supprimé avec succès!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await updateDocuments({
      ...data,
      documents: data.documents?.map(doc => ({
        url: doc.url,
        name: doc.name || getDocumentName(doc, 0)
      })) || []
    });
  });

  const handleDeleteDocument = async (index: number) => {
    await deleteDocument({ id: currentDocuments[index].url });
  };

  useFormChangeToast({
    form,
    onSubmit,
    message: "Modifications en attente",
    description: "Pensez à sauvegarder vos changements",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents justificatifs</CardTitle>
        <CardDescription>
          Gérez les documents justificatifs de votre entreprise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <div className="space-y-6">
            <FormField
              control={control}
              name="documents"
              render={({ field }) => (
                <FormItem>
                  <DropzoneInput
                    onFilesChanged={(files) => setValue("documents", files, { shouldDirty: true })}
                    value={field.value ?? []}
                    uploadEndpoint="documentsUploader"
                    placeholder={{
                      dragActive: "Déposez vos documents ici",
                      dragInactive:
                        "Glissez-déposez vos documents ici, ou cliquez pour sélectionner",
                      fileTypes: "PDF, JPEG, PNG - 5MB max",
                    }}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {currentDocuments.length > 0 && (
              <div className="space-y-2">
                {currentDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 px-2 group rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {getDocumentName(doc, index)}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => window.open(doc.url, '_blank')}
                            >
                              <ExternalLink className="h-4 w-4 text-muted-foreground hover:text-primary" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Voir le document</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>

                      <AlertDialog>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-8 w-8 p-0"
                                >
                                  <Trash2 className="h-4 w-4 text-destructive hover:text-destructive/80" />
                                </Button>
                              </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Supprimer le document</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Supprimer le document
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Êtes-vous sûr de vouloir supprimer ce document ? Cette action est irréversible.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Annuler</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={async () => await handleDeleteDocument(index)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Supprimer
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Form>
      </CardContent>
    </Card>
  );
}; 