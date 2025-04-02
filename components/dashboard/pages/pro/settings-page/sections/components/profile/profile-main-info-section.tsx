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
import { Textarea } from "@/components/ui/textarea"
import { updateOrganization } from "@/src/actions/organization.action"
import { Organization } from "@/src/db/organization"
import { useFormChangeToast } from "@/src/hooks/useFormChangeToast"

import { organizationFormSchema } from "../../profile-section"

interface ProfileMainInfoSectionProps {
  org: Organization | null | undefined
}

export const ProfileMainInfoSection = ({ org }: ProfileMainInfoSectionProps) => {
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
            <CardTitle>Informations principales</CardTitle>
            <CardDescription>Les informations essentielles de votre organisation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom de l&apos;organisation</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez le nom de l'organisation" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse email</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez l'adresse email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Décrivez votre organisation..." className="min-h-[120px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Site web</FormLabel>
                    <FormControl>
                      <Input placeholder="https://example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse</FormLabel>
                    <FormControl>
                      <Input placeholder="Entrez l'adresse" {...field} />
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
  )
}
