"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import { Clock, Euro, Home, Loader2, Plus, Users, X } from "lucide-react"
import React, { useState } from "react"
import { useFieldArray, useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { createServicesStepAction } from "@/src/actions"
import { cn } from "@/src/lib/utils"

import { proServicesSchema } from "../../types/onboarding-schemas"

const ServicesForm = ({ nextStep, previousStep }: { nextStep: () => void; previousStep: () => void }) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof proServicesSchema>>({
    resolver: zodResolver(proServicesSchema),
    defaultValues: {
      services: [],
    },
  })

  const { control, handleSubmit, reset } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  })

  const { mutateAsync } = useMutation({
    mutationFn: createServicesStepAction,
    onSuccess: () => {
      setIsLoading(false)
      reset()
      nextStep()
    },
    onError: error => {
      toast.error(error.message)
      setIsLoading(false)
    },
    onMutate: () => {
      setIsLoading(true)
    },
  })

  const onSubmit = handleSubmit(async data => {
    await mutateAsync(data)
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-end">
            {fields.length > 0 && (
              <Button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    description: "",
                    duration: 30,
                    price: 0,
                    image: "",
                    type: "ONE_TO_ONE",
                    atHome: false,
                    places: 1,
                  })
                }
                className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Nouveau Service
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
              >
                <div className="p-4 pb-2 relative">
                  <FormField
                    control={control}
                    name={`services.${index}.name`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Nom du service"
                            className="font-medium bg-transparent border-b border-gray-200 dark:border-gray-800 rounded-none px-1 py-2 h-9 focus-visible:ring-0 focus-visible:border-primary"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {fields.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-3 right-3 h-7 w-7 p-0 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => remove(index)}
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>

                <div className="flex-1 p-4 space-y-4">
                  <div>
                    <FormField
                      control={control}
                      name={`services.${index}.description`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              placeholder="Description..."
                              className="min-h-[60px] resize-none bg-gray-50/50 dark:bg-gray-900/50 border-none rounded-lg p-2 text-sm focus-visible:ring-1 focus-visible:ring-primary"
                              {...field}
                              value={field.value ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <FormField
                      control={control}
                      name={`services.${index}.duration`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-900 rounded-lg p-2 h-10">
                            <Clock className="h-4 w-4 text-primary/70" />
                            <div className="flex items-center flex-1">
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="30"
                                  className="border-none bg-transparent p-0 h-auto w-12 focus-visible:ring-0 text-right"
                                  {...field}
                                  value={field.value ?? ""}
                                  onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                                />
                              </FormControl>
                              <span className="text-xs text-gray-500 ml-1">min</span>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`services.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-900 rounded-lg p-2 h-10">
                            <Euro className="h-4 w-4 text-green-600/70" />
                            <div className="flex items-center flex-1">
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  className="border-none bg-transparent p-0 h-auto w-16 focus-visible:ring-0 text-right"
                                  {...field}
                                  value={field.value ?? ""}
                                  onChange={e => field.onChange(e.target.value ? parseFloat(e.target.value) : null)}
                                />
                              </FormControl>
                              <span className="text-xs text-gray-500 ml-1">€</span>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="space-y-3 pt-2 border-t border-dashed border-gray-200 dark:border-gray-800">
                    <FormField
                      control={control}
                      name={`services.${index}.atHome`}
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-y-0">
                          <div className="flex items-center space-x-2">
                            <Home className="h-3.5 w-3.5 text-gray-500" />
                            <FormLabel className="text-xs font-normal">À domicile</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value ?? false}
                              onCheckedChange={field.onChange}
                              className="scale-75 data-[state=checked]:bg-primary"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={control}
                      name={`services.${index}.type`}
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between space-y-0">
                          <div className="flex items-center space-x-2">
                            <Users className="h-3.5 w-3.5 text-gray-500" />
                            <FormLabel className="text-xs font-normal">Groupe</FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value === "MULTIPLE"}
                              onCheckedChange={val => {
                                field.onChange(val ? "MULTIPLE" : "ONE_TO_ONE")
                                if (!val) {
                                  form.setValue(`services.${index}.places`, 1)
                                }
                              }}
                              className="scale-75 data-[state=checked]:bg-primary"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    {form.watch(`services.${index}.type`) === "MULTIPLE" && (
                      <FormField
                        control={control}
                        name={`services.${index}.places`}
                        render={({ field }) => (
                          <FormItem className="pl-6">
                            <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-900 rounded-lg p-2 h-8">
                              <span className="text-xs text-gray-600 dark:text-gray-400">Places :</span>
                              <div className="flex items-center">
                                <FormControl>
                                  <Input
                                    type="number"
                                    min="2"
                                    placeholder="2"
                                    className="border-none bg-transparent p-0 h-auto w-10 focus-visible:ring-0 text-center"
                                    {...field}
                                    value={field.value ?? ""}
                                    onChange={e => field.onChange(e.target.value ? parseInt(e.target.value) : 2)}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}

            {fields.length === 0 && (
              <button
                type="button"
                onClick={() =>
                  append({
                    name: "",
                    description: "",
                    duration: 30,
                    price: 0,
                    image: "",
                    type: "ONE_TO_ONE",
                    atHome: false,
                    places: 1,
                  })
                }
                className="flex flex-col items-center justify-center h-[350px] rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Créer un service</span>
                </div>
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 lg:pt-8 p-4 lg:p-0 border-t">
          <Button type="button" variant="outline" className="rounded-xl" disabled={isLoading} onClick={previousStep}>
            ← Précédent
          </Button>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              disabled={isLoading}
              onClick={nextStep}
              className="text-muted-foreground"
            >
              Passer
            </Button>
            <Button disabled={isLoading} type="submit" className="rounded-xl px-6">
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>En cours...</span>
                </>
              ) : (
                "Suivant →"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}

export default ServicesForm
