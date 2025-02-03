"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { X, Plus, Euro } from "lucide-react";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { cn } from "@/src/lib/utils";
import { useActionQuery } from "@/src/hooks/action-hooks";
import { getOptionsFromOrganization } from "@/src/actions/options.action";

const optionsSchema = z.object({
  options: z.array(
    z.object({
      title: z.string().min(1, "Le titre est requis"),
      description: z.string().min(1, "La description est requise"),
      price: z.number().min(0, "Le prix est requis"),
    })
  ),
});

export const OptionsSection = () => {
  const { data, refetch, isLoading } = useActionQuery(getOptionsFromOrganization, {});

  const form = useForm<z.infer<typeof optionsSchema>>({
    resolver: zodResolver(optionsSchema),
    defaultValues: {
      options: data?.map(option => ({
        title: option.title,
        description: option.description || "",
        price: option.price,
      })) || [],
    },
  });

  const { control, handleSubmit } = form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const onSubmit = handleSubmit(async (data) => {
    // TODO: Implement update options action
    toast.success("Options mises à jour avec succès!");
  });

  return (
    <Card className="p-6">
      <Form {...form}>
        <form onSubmit={onSubmit} className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-end">
              {fields.length > 0 && (
                <Button
                  type="button"
                  onClick={() =>
                    append({
                      title: "",
                      description: "",
                      price: 0,
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

                    <FormField
                      control={control}
                      name={`options.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type="number"
                                placeholder="Prix"
                                className="pl-9"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(Number(e.target.value))
                                }
                              />
                              <Euro className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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

          <div className="flex justify-end">
            <Button type="submit">Enregistrer les modifications</Button>
          </div>
        </form>
      </Form>
    </Card>
  );
}; 