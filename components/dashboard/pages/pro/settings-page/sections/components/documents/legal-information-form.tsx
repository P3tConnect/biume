"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useActionQuery, useActionMutation } from "@/src/hooks/action-hooks";
import { getCurrentOrganization } from "@/src/actions/organization.action";
import { updateCompanyDocuments } from "@/src/actions/companyDocuments.action";
import { useFormChangeToast } from "@/src/hooks/useFormChangeToast";
import { toast } from "sonner";
import { documentsSchema, DocumentsFormData } from "./types";

export const LegalInformationForm = () => {
  const { data: organization } = useActionQuery(
    getCurrentOrganization,
    {},
    "current-organization"
  );

  const { mutateAsync: updateDocuments } = useActionMutation(updateCompanyDocuments, {
    onSuccess: () => {
      toast.success("Informations légales mises à jour avec succès!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const form = useForm<DocumentsFormData>({
    resolver: zodResolver(documentsSchema),
    defaultValues: {
      siren: organization?.siren || "",
      siret: organization?.siret || "",
    },
  });

  const { control, handleSubmit } = form;

  const onSubmit = handleSubmit(async (data) => {
    await updateDocuments({
      ...data,
      documents: [], // On ne modifie pas les documents dans ce formulaire
    });
  });

  useFormChangeToast({
    form,
    onSubmit,
    message: "Modifications en attente",
    description: "Pensez à sauvegarder vos changements",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Informations légales</CardTitle>
        <CardDescription>
          Gérez les numéros d&apos;identification de votre entreprise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={onSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    <FormDescription>
                      Le numéro SIREN est composé de 9 chiffres
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
                        placeholder="12345678900000"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Le numéro SIRET est composé de 14 chiffres
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}; 