"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { updateOrganization } from "@/src/actions/organization.action";
import { useFormChangeToast } from "@/src/hooks/useFormChangeToast";
import { Organization } from "@/src/db/organization";
import { organizationFormSchema } from "../../profile-section";
import { use } from "react";
import { ActionResult } from "@/src/lib";
import { useQueryClient } from "@tanstack/react-query";
import { useActionMutation } from "@/src/hooks/action-hooks";

interface ProfileLegalInfoSectionProps {
  org: Promise<ActionResult<Organization | null>>;
}

export const ProfileLegalInfoSection = ({ org }: ProfileLegalInfoSectionProps) => {
  const dataOrg = use(org);
  const form = useForm<z.infer<typeof organizationFormSchema>>({
    resolver: zodResolver(organizationFormSchema),
    values: {
      name: dataOrg?.data?.name || "",
      email: dataOrg?.data?.email || "",
      website: "",
      address: dataOrg?.data?.addressId || "",
      description: dataOrg?.data?.description || "",
      openAt: dataOrg?.data?.openAt || "09:00",
      closeAt: dataOrg?.data?.closeAt || "18:00",
      atHome: dataOrg?.data?.atHome || false,
      nac: dataOrg?.data?.nac || "",
      siren: dataOrg?.data?.siren || "",
      siret: dataOrg?.data?.siret || "",
    },
  });

  const { handleSubmit } = form;

  const { mutateAsync } = useActionMutation(updateOrganization, {
    onSuccess: () => {
      toast.success("Modifications enregistrées avec succès !");
    },
    onError: () => {
      toast.error("Erreur lors de l'enregistrement des modifications");
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  useFormChangeToast({
    form,
    onSubmit,
    message: "Modifications en attente",
    description: "Pensez à sauvegarder vos changements",
    position: "bottom-center",
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Informations légales</CardTitle>
            <CardDescription>
              Numéros d&apos;identification de votre organisation
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="siren"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro SIREN</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123456789"
                        maxLength={9}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="siret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Numéro SIRET</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="12345678900000"
                        maxLength={14}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}; 