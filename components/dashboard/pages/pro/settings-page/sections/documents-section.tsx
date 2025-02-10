"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { DropzoneInput } from "@/components/ui/dropzone-input";
import { useActionQuery } from "@/src/hooks/action-hooks";
import { getCompanyDocuments } from "@/src/actions/companyDocuments.action";

const documentsSchema = z.object({
  documents: z
    .array(z.string().url())
    .min(1, "Veuillez télécharger au moins un document")
    .optional(),
  siren: z
    .string()
    .min(9, "Le numéro SIREN doit contenir 9 chiffres")
    .max(9, "Le numéro SIREN doit contenir 9 chiffres")
    .regex(/^\d+$/, "Le numéro doit contenir uniquement des chiffres")
    .optional(),
  siret: z
    .string()
    .min(14, "Le numéro SIRET doit contenir 14 chiffres")
    .max(14, "Le numéro SIRET doit contenir 14 chiffres")
    .regex(/^\d+$/, "Le numéro doit contenir uniquement des chiffres")
    .optional(),
});

export const DocumentsSection = () => {
  const { data, refetch, isLoading } = useActionQuery(
    getCompanyDocuments,
    {},
    "company-documents",
  );

  const form = useForm<z.infer<typeof documentsSchema>>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      documents: data?.map((document) => document.file) || [],
      siren: "",
      siret: "",
    },
  });

  const { control, setValue, handleSubmit } = form;

  const onSubmit = handleSubmit(async (data) => {
    // TODO: Implement update documents action
    toast.success("Documents mis à jour avec succès!");
  });

  return (
    <Card className="p-6">
      <Form {...form}>
        <form className="space-y-6" onSubmit={onSubmit}>
          <FormField
            control={control}
            name="documents"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Documents justificatifs</FormLabel>
                <DropzoneInput
                  onFilesChanged={(files) => setValue("documents", files)}
                  value={field.value ?? []}
                  uploadEndpoint="documentsUploader"
                  placeholder={{
                    dragActive: "Déposez vos documents ici",
                    dragInactive:
                      "Glissez-déposez vos documents ici, ou cliquez pour sélectionner",
                    fileTypes: "PDF, JPEG, PNG - 5MB max",
                  }}
                />
                <FormDescription>
                  Ajoutez votre extrait Kbis ou tout autre document prouvant
                  l&apos;identité de votre entreprise (PDF, JPEG, PNG - 5MB max)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name="siren"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro SIREN</FormLabel>
                <FormControl>
                  <Input
                    placeholder="123456789"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
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
                    placeholder="12345678900000"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Enregistrer les modifications</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
};
