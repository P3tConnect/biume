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
import { ActionResult } from "@/src/lib";
import { useMutation } from "@tanstack/react-query";

interface ProfileScheduleSectionProps {
  org: Organization | null | undefined;
}

export const ProfileScheduleSection = ({ org }: ProfileScheduleSectionProps) => {
  const form = useForm<z.infer<typeof organizationFormSchema>>({
    resolver: zodResolver(organizationFormSchema),
    values: {
      name: org?.name || "",
      email: org?.email || "",
      website: "",
      address: org?.addressId || "",
      description: org?.description || "",
      openAt: org?.openAt || "09:00",
      closeAt: org?.closeAt || "18:00",
      atHome: org?.atHome || false,
      nac: org?.nac || "",
      siren: org?.siren || "",
      siret: org?.siret || "",
    },
  });

  const { handleSubmit } = form;

  const { mutateAsync } = useMutation({
    mutationFn: updateOrganization,
    onSuccess: () => {
      toast.success("Modifications enregistrées avec succès !");
    },
    onError: (error) => {
      toast.error(error.message);
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