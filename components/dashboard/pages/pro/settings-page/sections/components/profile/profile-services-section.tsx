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
import { Switch } from "@/components/ui/switch";
import {
  Form,
  FormControl,
  FormDescription,
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

interface ProfileServicesSectionProps {
  org: Organization;
}

export const ProfileServicesSection = ({ org }: ProfileServicesSectionProps) => {
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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateOrganization(data);
      toast.success("Modifications enregistrées avec succès !");
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement des modifications");
    }
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
            <CardTitle>Services proposés</CardTitle>
            <CardDescription>Personnalisez vos services</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="atHome"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-accent/50 transition-colors">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1">
                    <FormLabel className="text-sm font-medium leading-none">
                      Consultations à domicile
                    </FormLabel>
                    <FormDescription className="text-xs">
                      Activez cette option si vous proposez des consultations à
                      domicile
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nac"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nouveaux Animaux de Compagnie (NAC)</FormLabel>
                  <FormControl>
                    <Input placeholder="Listez les NAC acceptés" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Listez les types de NAC que vous acceptez (ex: rongeurs,
                    reptiles, oiseaux)
                  </FormDescription>
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