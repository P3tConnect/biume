"use client";

import { Button } from "@/components/ui/button";
import {
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
import { X, Plus, Euro } from "lucide-react";
import { proOptionsSchema } from "../../types/onboarding-schemas";
import { useStepper } from "../../hooks/useStepperClient";
import { createOptionsStepAction } from "@/src/actions";
import { useActionMutation } from "@/src/hooks/action-hooks";
import { toast } from "sonner";
import { DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/src/lib/utils";

export function OptionsForm({ nextStep, previousStep }: { nextStep: () => void, previousStep: () => void }) {
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

  const { mutateAsync } = useActionMutation(createOptionsStepAction, {
    onSuccess: () => {
      reset();
      nextStep();
    },
    onError: (error) => {
      toast.error(error.message);
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
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              Vos Options
            </h2>
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
                  "transition-all duration-300"
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
                                e.target.value ? parseFloat(e.target.value) : null,
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
                  "transition-colors duration-200"
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

        <DialogFooter>
          <div className="flex justify-end gap-4 w-full">
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={previousStep}
            >
              Précédent
            </Button>
            <Button
              type="submit"
              className="rounded-xl bg-gradient-to-r from-primary to-primary/80"
            >
              Suivant
            </Button>
          </div>
        </DialogFooter>
      </form>
    </Form>
  );
}

export default OptionsForm;
