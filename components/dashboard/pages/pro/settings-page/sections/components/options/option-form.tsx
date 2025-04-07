import { FormControl, FormMessage } from "@/components/ui/form";
import { Form, FormItem } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { Option, CreateOption } from "@/src/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Euro, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createOption, updateOption } from "@/src/actions";
import { Credenza, CredenzaTitle, CredenzaHeader } from "@/components/ui";
import { CredenzaContent } from "@/components/ui";
import { useMutation } from "@tanstack/react-query";

const optionSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().nullable().optional(),
  price: z.number().min(0, "Le prix est requis"),
  organizationId: z.string().optional(),
});

interface OptionFormProps {
  option: Partial<Option> | Option;
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

  const isCreating = !option.id;

  const { mutateAsync: createMutation } = useMutation({
    mutationFn: createOption,
    onSuccess: () => {
      toast.success("Option créée avec succès!");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const { mutateAsync: updateMutation } = useMutation({
    mutationFn: updateOption,
    onSuccess: () => {
      toast.success("Option mise à jour avec succès!");
      onOpenChange(false);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    if (isCreating) {
      await createMutation(data);
    } else {
      await updateMutation(data);
    }
  });

  return (
    <Credenza open={open} onOpenChange={onOpenChange}>
      <CredenzaContent>
        <CredenzaHeader>
          <CredenzaTitle>
            {isCreating ? "Créer une option" : "Modifier l'option"}
          </CredenzaTitle>
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
                      <Input
                        className="text-base"
                        placeholder="Titre de l'option"
                        {...field}
                      />
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
                        className="min-h-[100px] text-base"
                        {...field}
                        value={field.value || ""}
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
                          className="pl-9 text-base"
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

            <div className="flex justify-end">
              <Button type="submit">
                {isCreating ? "Créer" : "Enregistrer"}
              </Button>
            </div>
          </form>
        </Form>
      </CredenzaContent>
    </Credenza>
  );
};
