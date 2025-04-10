"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { updateOrganization } from "@/src/actions/organization.action"
import { Organization } from "@/src/db/organization"
import { useFormChangeToast } from "@/src/hooks/useFormChangeToast"

import { organizationFormSchema } from "../../profile-section"

interface ProfileServicesSectionProps {
  org: Organization | null | undefined
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
      nac: org?.nac || "",
      siren: org?.siren || "",
      siret: org?.siret || "",
    },
  })

  const { handleSubmit } = form

  const { mutateAsync } = useMutation({
    mutationFn: updateOrganization,
    onSuccess: () => {
      toast.success("Modifications enregistrées avec succès !")
    },
    onError: error => {
      toast.error(error.message)
    },
  })

  const onSubmit = handleSubmit(async data => {
    await mutateAsync(data)
  })

  useFormChangeToast({
    form,
    onSubmit,
    message: "Modifications en attente",
    description: "Pensez à sauvegarder vos changements",
    position: "bottom-center",
  })

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
              name="nac"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nouveaux Animaux de Compagnie (NAC)</FormLabel>
                  <FormControl>
                    <Input placeholder="Listez les NAC acceptés" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Listez les types de NAC que vous acceptez (ex: rongeurs, reptiles, oiseaux)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
