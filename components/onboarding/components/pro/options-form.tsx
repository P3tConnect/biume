"use client";

import { Button } from "@/components/ui/button";
import {
  CredenzaFooter,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Plus, Euro, Loader2 } from "lucide-react";
import { proOptionsSchema } from "../../types/onboarding-schemas";
import { createOptionsStepAction } from "@/src/actions";
import { toast } from "sonner";
import { cn } from "@/src/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

export function OptionsForm({
  nextStep,
  previousStep,
}: {
  nextStep: () => void;
  previousStep: () => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof proOptionsSchema>>({
    resolver: zodResolver(proOptionsSchema),
    defaultValues: {
      options: [],
    },
  });

  const { control, handleSubmit, reset } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const { mutateAsync } = useMutation({
    mutationFn: createOptionsStepAction,
    onSuccess: () => {
      setIsLoading(false);
      reset();
      nextStep();
    },
    onError: (error) => {
      toast.error(error.message);
      setIsLoading(false);
    },
    onMutate: () => {
      setIsLoading(true);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-8">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            {fields.length > 0 && (
              <Button
                type="button"
                onClick={() =>
                  append({
                    title: "",
                    description: "",
                    price: 0,
                    organizationId: "",
                  })
                }
                className="flex items-center gap-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
              >
                <Plus className="h-4 w-4" />
                Nouvelle Option
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className={cn(
                  "group relative rounded-2xl border bg-card p-6 space-y-6",
                  "hover:shadow-lg hover:scale-[1.02] hover:border-primary/50",
                  "dark:bg-gray-950/50 dark:backdrop-blur-xl",
                  "transition-all duration-300",
                )}
              >
                <div className="space-y-4">
                  <FormField
                    control={control}
                    name={`options.${index}.title`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Nom de l'option"
                            className="text-lg font-medium bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg px-3 h-10 focus-visible:ring-1 focus-visible:ring-primary"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name={`options.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea
                            placeholder="Description de l'option..."
                            className="min-h-[80px] resize-none bg-transparent border border-gray-200 dark:border-gray-800 rounded-lg p-3 focus-visible:ring-1 focus-visible:ring-primary"
                            {...field}
                            value={field.value ?? ""}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={control}
                  name={`options.${index}.price`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
                        <Euro className="h-4 w-4 text-gray-500 ml-1" />
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="0"
                            className="border-none bg-transparent p-0 h-auto focus-visible:ring-0"
                            {...field}
                            value={field.value ?? ""}
                            onChange={(e) =>
                              field.onChange(
                                e.target.value
                                  ? parseFloat(e.target.value)
                                  : null,
                              )
                            }
                          />
                        </FormControl>
                        <span className="text-sm text-gray-500 mr-1">€</span>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-red-100 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-200"
                    onClick={() => remove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}

            {fields.length === 0 && (
              <button
                type="button"
                onClick={() =>
                  append({
                    title: "",
                    description: "",
                    price: 0,
                    organizationId: "",
                  })
                }
                className={cn(
                  "flex flex-col items-center justify-center gap-4 p-8",
                  "rounded-2xl border-2 border-dashed",
                  "text-gray-500 hover:text-primary hover:border-primary",
                  "transition-colors duration-200",
                )}
              >
                <div className="p-4 rounded-full bg-gray-50 dark:bg-gray-900">
                  <Plus className="h-6 w-6" />
                </div>
                <span>Ajouter votre première option</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 lg:pt-8 p-4 lg:p-0 border-t">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={previousStep}
          >
            ← Précédent
          </Button>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={nextStep}
              className="text-muted-foreground"
            >
              Passer
            </Button>
            <Button type="submit" className="rounded-xl px-6">
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
  );
}

export default OptionsForm;
