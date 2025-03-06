"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { useUploadThing } from "@/src/lib/uploadthing";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { proDocumentsSchema } from "../../types/onboarding-schemas";
import { createDocumentsStepAction } from "@/src/actions";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"],
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

export function DocumentsForm({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof proDocumentsSchema>>({
    resolver: zodResolver(proDocumentsSchema),
    defaultValues: {
      documents: [],
      siren: "",
      siret: "",
    },
  });

  const { control, setValue, handleSubmit, reset } = form;

  const { mutateAsync } = useMutation({
    mutationFn: createDocumentsStepAction,
    onSuccess: () => {
      setIsLoading(false);
      reset();
      nextStep();
    },
    onMutate: () => {
      setIsLoading(true);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
      setIsLoading(false);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form {...form}>
      <form className="space-y-12 mx-auto px-2" onSubmit={onSubmit}>
        <div className="space-y-8">
          <FormField
            control={control}
            name="documents"
            render={({ field }) => (
              <FormItem className="space-y-6">
                <div className="space-y-2">
                  <FormLabel className="text-lg font-semibold">
                    Documents justificatifs
                  </FormLabel>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <FormDescription>
                      Pour vérifier l&apos;identité de votre entreprise,
                      veuillez fournir :
                    </FormDescription>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Un extrait Kbis récent (moins de 3 mois)</li>
                      <li>
                        Ou tout autre document officiel d&apos;identification
                      </li>
                    </ul>
                  </div>
                </div>
                <DropzoneInput
                  onFilesChanged={(files) => setValue("documents", files)}
                  value={field.value ?? []}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-8 pt-6">
            <div className="flex flex-col space-y-6">
              <h3 className="text-lg font-semibold">
                Informations d&apos;identification
              </h3>
              <div className="grid gap-6 sm:grid-cols-2">
                <FormField
                  control={control}
                  name="siren"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro SIREN</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="9 chiffres"
                          {...field}
                          value={field.value ?? ""}
                          maxLength={9}
                          className="font-mono"
                        />
                      </FormControl>
                      <FormDescription>
                        Identifiant unique à 9 chiffres
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="siret"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Numéro SIRET</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="14 chiffres"
                          {...field}
                          value={field.value ?? ""}
                          maxLength={14}
                          className="font-mono"
                        />
                      </FormControl>
                      <FormDescription>
                        SIREN + 5 chiffres pour votre établissement
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Footer with buttons */}
          <div className="flex justify-between items-center pt-4 lg:pt-8 p-4 lg:p-0 border-t">
            <Button
              type="button"
              variant="outline"
              className="rounded-xl"
              onClick={previousStep}
            >
              ← Précédent
            </Button>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={nextStep}
                className="text-muted-foreground"
              >
                Passer
              </Button>
              <Button
                disabled={isLoading}
                type="submit"
                className="rounded-xl px-6"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>En cours...</span>
                  </>
                ) : (
                  "Suivant →"
                )}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}

interface DropzoneInputProps {
  onFilesChanged: (files: { url: string; name?: string }[]) => void;
  value: { url: string; name?: string }[];
}

function DropzoneInput({ onFilesChanged, value }: DropzoneInputProps) {
  const { startUpload, isUploading } = useUploadThing("documentsUploader", {
    onClientUploadComplete: (res) => {
      if (!res) return;
      const uploadedUrls = res.map((file) => ({
        url: file.url,
        name: file.name,
      }));
      onFilesChanged(uploadedUrls);
      toast.success("Documents téléchargés avec succès");
    },
    onUploadError: (error: { message: string }) => {
      toast.error("Erreur lors du téléchargement: " + error.message);
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: ACCEPTED_FILE_TYPES,
    maxSize: MAX_FILE_SIZE,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length === 0) return;
      await startUpload(acceptedFiles);
    },
  });

  const removeFile = (fileToRemove: { url: string; name?: string }) => {
    onFilesChanged(value.filter((file) => file.url !== fileToRemove.url));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all duration-200",
          "hover:border-primary hover:bg-primary/5",
          isDragActive
            ? "border-primary bg-primary/10 scale-[1.02]"
            : "border-muted-foreground/25",
          isUploading && "opacity-50 cursor-not-allowed",
        )}
      >
        <input {...getInputProps()} disabled={isUploading} />
        <div className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium">
              {isDragActive
                ? "Déposez vos fichiers ici"
                : isUploading
                  ? "Téléchargement en cours..."
                  : "Glissez-déposez vos fichiers ici"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PDF, JPEG ou PNG (max. 5MB)
            </p>
          </div>
        </div>
      </div>

      {value.length > 0 && (
        <ul className="grid gap-2">
          {value.map((fileUrl, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium">
                  Document {index + 1}
                </span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeFile(fileUrl)}
                disabled={isUploading}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
