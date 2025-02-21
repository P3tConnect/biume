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
import { useActionMutation } from "@/src/hooks/action-hooks";
import { ActionResult } from "@/src/lib";

interface ProfileServicesSectionProps {
  org: ActionResult<Organization | null>;
}

export const ProfileServicesSection = ({ org }: ProfileServicesSectionProps) => {
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