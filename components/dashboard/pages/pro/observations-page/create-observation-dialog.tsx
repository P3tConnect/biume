"use client";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createObservationSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.string().min(1, "Le contenu est requis"),
});

type CreateObservationForm = z.infer<typeof createObservationSchema>;

interface CreateObservationDialogProps {
  onClose: () => void;
}

export function CreateObservationDialog({ onClose }: CreateObservationDialogProps) {
  const form = useForm<CreateObservationForm>({
    resolver: zodResolver(createObservationSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(data: CreateObservationForm) {
    try {
      // TODO: Implémenter la création d'observation
      console.log("Création d'observation:", data);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la création de l'observation:", error);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Nouvelle observation</DialogTitle>
        <DialogDescription>
          Créez une nouvelle observation pour un patient
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input placeholder="Titre de l'observation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenu</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Détails de l'observation..."
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit">Créer</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
} 