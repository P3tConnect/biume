"use client";

import React, { use } from "react";
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
import { useActionMutation } from "@/src/hooks/action-hooks";
import { ActionResult } from "@/src/lib";

interface ProfileScheduleSectionProps {
  org: ActionResult<Organization | null>;
}

export const ProfileScheduleSection = ({ org }: ProfileScheduleSectionProps) => {
  const form = useForm<z.infer<typeof organizationFormSchema>>({
    resolver: zodResolver(organizationFormSchema),
    values: {
      name: org.data?.name || "",
      email: org.data?.email || "",
      website: "",
      address: org.data?.addressId || "",
      description: org.data?.description || "",
      openAt: org.data?.openAt || "09:00",
      closeAt: org.data?.closeAt || "18:00",
      atHome: org.data?.atHome || false,
      nac: org.data?.nac || "",
      siren: org.data?.siren || "",
      siret: org.data?.siret || "",
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
            <CardTitle>Horaires d&apos;ouverture</CardTitle>
            <CardDescription>
              Définissez vos heures d&apos;ouverture
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="openAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heure d&apos;ouverture</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="closeAt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Heure de fermeture</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}; 