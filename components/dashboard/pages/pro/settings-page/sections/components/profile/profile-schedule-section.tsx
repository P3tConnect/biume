"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import React from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { updateOrganization } from "@/src/actions/organization.action"
import { Organization } from "@/src/db/organization"
import { useFormChangeToast } from "@/src/hooks/useFormChangeToast"

import { organizationFormSchema } from "../../profile-section"

interface ProfileScheduleSectionProps {
  org: Organization | null | undefined
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
            <CardTitle>Horaires d&apos;ouverture</CardTitle>
            <CardDescription>Définissez vos heures d&apos;ouverture</CardDescription>
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
  )
}
