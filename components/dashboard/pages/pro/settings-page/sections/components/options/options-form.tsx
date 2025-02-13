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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Euro } from "lucide-react";
import { toast } from "sonner";
import { useActionMutation } from "@/src/hooks/action-hooks";
import { updateOption, deleteOption } from "@/src/actions";
import { Option } from "@/src/db";
import { Credenza, CredenzaContent, CredenzaHeader, CredenzaTitle } from "@/components/ui";

const optionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  price: z.number().min(0, "Le prix est requis"),
  organizationId: z.string().optional(),
});

interface OptionFormProps {
  option: Option;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const OptionForm = ({ option, open, onOpenChange }: OptionFormProps) => {
  const form = useForm<z.infer<typeof optionSchema>>({
    resolver: zodResolver(optionSchema),
    defaultValues: {
      id: option.id,
      title: option.title || "",
      description: option.description || "",
      price: option.price || 0,
      organizationId: option.organizationId ?? undefined,
    },
  });

  const { mutateAsync: updateOptionMutation } = useActionMutation(
    updateOption,
    {
      onSuccess: () => {
        toast.success("Option mise à jour avec succès!");
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const { mutateAsync: deleteOptionMutation } = useActionMutation(
    deleteOption,
    {
      onSuccess: () => {
        toast.success("Option supprimée avec succès!");
        onOpenChange(false);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  );

  const onSubmit = form.handleSubmit(async (data) => {
    await updateOptionMutation(data);
  });

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette option ?")) {
      await deleteOptionMutation(option.id);
    }
  };

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>Modifier l'option</CredenzaTitle>
        </CredenzaHeader>
        <Form {...form}>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Titre de l'option" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Description de l'option..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
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

            <div className="flex justify-between">
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
              >
                Supprimer
              </Button>
              <Button type="submit">Enregistrer</Button>
            </div>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  );
};
