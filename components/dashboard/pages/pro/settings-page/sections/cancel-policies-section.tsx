"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CreateCancelPolicySchema } from "@/src/db/cancelPolicies"
import { toast } from "sonner"
import { createCancelPolicy, getCancelPolicies } from "@/src/actions/cancel-policies.action"
import { Plus, Clock, Percent } from "lucide-react"
import { useState } from "react"
import {
  Credenza,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
  CredenzaTrigger,
  CredenzaBody,
} from "@/components/ui/credenza"

export const CancelPoliciesSection = () => {
  const [isOpen, setIsOpen] = useState(false)
  const form = useForm({
    resolver: zodResolver(CreateCancelPolicySchema),
    defaultValues: {
      daysBefore: 0,
      refundPercent: 0,
    },
  })

  const { data: cancelPolicies, refetch } = useQuery({
    queryKey: ["cancelPolicies"],
    queryFn: async () => {
      try {
        return await getCancelPolicies({})
      } catch (error) {
        toast.error("Erreur lors de la récupération des politiques d'annulation")
        throw error
      }
    },
  })

  const { mutate: submitCancelPolicy, isPending } = useMutation({
    mutationFn: async (data: { daysBefore: number; refundPercent: number }) => {
      try {
        return await createCancelPolicy(data)
      } catch (error) {
        toast.error("Erreur lors de la création de la politique d'annulation")
        throw error
      }
    },
    onSuccess: () => {
      toast.success("Politique d'annulation créée avec succès")
      refetch()
      form.reset()
      setIsOpen(false)
    },
  })

  const onSubmit = (data: { daysBefore: number; refundPercent: number }) => {
    submitCancelPolicy(data)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Politiques d'annulation</CardTitle>
            <CardDescription>
              Définissez les conditions de remboursement en fonction du délai d'annulation
            </CardDescription>
          </div>
          <Credenza open={isOpen} onOpenChange={setIsOpen}>
            <CredenzaTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter une politique
              </Button>
            </CredenzaTrigger>
            <CredenzaContent className="max-w-md">
              <CredenzaHeader>
                <CredenzaTitle>Nouvelle politique d'annulation</CredenzaTitle>
                <CredenzaDescription>
                  Définissez le délai et le pourcentage de remboursement pour cette politique d'annulation.
                </CredenzaDescription>
              </CredenzaHeader>
              <CredenzaBody>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="daysBefore"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Jours avant le rendez-vous</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Clock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                min={0}
                                max={14}
                                className="pl-9"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Le délai maximum d'annulation est de 14 jours avant le rendez-vous
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="refundPercent"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pourcentage de remboursement</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                              <Input
                                type="number"
                                min={0}
                                max={45}
                                className="pl-9"
                                {...field}
                                onChange={e => field.onChange(parseInt(e.target.value))}
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Le remboursement maximum autorisé est de 45%
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex justify-end pt-4">
                      <Button type="submit" disabled={isPending}>
                        {isPending ? "Création en cours..." : "Créer la politique"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CredenzaBody>
            </CredenzaContent>
          </Credenza>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {cancelPolicies?.data?.map((policy: any) => (
            <div
              key={policy.id}
              className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-full bg-primary/10">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium">
                    {policy.daysBefore} {policy.daysBefore > 1 ? "jours" : "jour"} avant
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Remboursement de {policy.refundPercent}%
                  </p>
                </div>
              </div>
            </div>
          ))}
          {(!cancelPolicies?.data || cancelPolicies.data.length === 0) && (
            <div className="text-center p-8 text-muted-foreground">
              Aucune politique d'annulation définie
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default CancelPoliciesSection 