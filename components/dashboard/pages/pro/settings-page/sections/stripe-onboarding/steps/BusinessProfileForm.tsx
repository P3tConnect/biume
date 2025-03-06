"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { updateStripeConnectBusinessProfile } from "@/src/actions/stripe-connect.action";
import { Loader2 } from "lucide-react";

// Schéma de validation
const businessProfileSchema = z.object({
  name: z.string().min(2, { message: "Le nom de l'entreprise est requis" }),
  url: z
    .string()
    .url({ message: "L'URL doit être valide" })
    .optional()
    .or(z.literal("")),
  mcc: z.string({ required_error: "La catégorie d'activité est requise" }),
  description: z
    .string()
    .min(10, { message: "Description trop courte" })
    .max(500),
  support_email: z.string().email({ message: "Email invalide" }),
  support_phone: z
    .string()
    .min(10, { message: "Numéro de téléphone invalide" }),
});

type BusinessProfileFormValues = z.infer<typeof businessProfileSchema>;

interface BusinessProfileFormProps {
  accountId: string | null;
  onComplete: () => void;
}

export function BusinessProfileForm({
  accountId,
  onComplete,
}: BusinessProfileFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Définir le formulaire avec react-hook-form
  const form = useForm<BusinessProfileFormValues>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      name: "",
      url: "",
      mcc: "",
      description: "",
      support_email: "",
      support_phone: "",
    },
  });

  // 2. Fonction pour gérer la soumission du formulaire
  const onSubmit = async (data: BusinessProfileFormValues) => {
    if (!accountId) {
      toast.error("ID de compte invalide");
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await updateStripeConnectBusinessProfile({
        accountId,
        businessProfile: {
          ...data,
          // Convertir les champs vides en null/undefined selon les exigences de l'API Stripe
          url: data.url || undefined,
        },
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success("Profil d'entreprise mis à jour avec succès");
      onComplete();
    } catch (err: any) {
      toast.error("Erreur lors de la mise à jour du profil", {
        description: err.message || "Veuillez réessayer",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Liste des codes MCC (Merchant Category Codes) les plus courants
  const mccOptions = [
    { value: "5045", label: "Services informatiques" },
    { value: "5815", label: "Produits et services numériques" },
    { value: "7299", label: "Services professionnels" },
    { value: "8999", label: "Services spécialisés" },
    { value: "8911", label: "Services architecturaux et d'ingénierie" },
    { value: "8931", label: "Services de comptabilité et d'audit" },
    { value: "8111", label: "Services juridiques" },
    { value: "7298", label: "Salons de beauté et spas" },
    { value: "7230", label: "Salons de coiffure" },
    { value: "8011", label: "Médecins et praticiens" },
    { value: "8021", label: "Dentistes" },
    { value: "8050", label: "Services de soins infirmiers" },
    { value: "8049", label: "Chiropracteurs" },
    { value: "8071", label: "Laboratoires médicaux et dentaires" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">
          Informations de votre entreprise
        </h2>
        <p className="text-gray-500 mt-1">
          Ces informations seront visibles par vos clients et utilisées pour les
          paiements.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom commercial</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de votre entreprise" {...field} />
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
                <FormLabel>Description de l'activité</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Décrivez votre activité en quelques mots"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Site web (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="https://votresite.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mcc"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Catégorie d'activité</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner une catégorie" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {mccOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="support_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email de support</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="support@votreentreprise.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="support_phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone de support</FormLabel>
                  <FormControl>
                    <Input placeholder="+33123456789" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Envoi en cours...
                </>
              ) : (
                "Continuer"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
