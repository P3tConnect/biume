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
import { toast } from "sonner";
import { updateStripeConnectCompanyInfo } from "@/src/actions/stripe-connect.action";
import { ChevronLeft, Loader2 } from "lucide-react";

// Schéma de validation
const companyInfoSchema = z.object({
  name: z.string().min(2, { message: "Le nom de l'entreprise est requis" }),
  tax_id: z.string().min(5, { message: "Le numéro de TVA est requis" }),
  address_line1: z.string().min(5, { message: "L'adresse est requise" }),
  address_city: z.string().min(2, { message: "La ville est requise" }),
  address_postal_code: z
    .string()
    .min(5, { message: "Le code postal est requis" }),
  address_country: z
    .string()
    .length(2, { message: "Le pays est requis (code ISO à 2 lettres)" }),
  phone: z.string().min(10, { message: "Le numéro de téléphone est requis" }),
});

type CompanyInfoFormValues = z.infer<typeof companyInfoSchema>;

interface LegalEntityFormProps {
  accountId: string | null;
  onComplete: () => void;
  onBack: () => void;
}

export function LegalEntityForm({
  accountId,
  onComplete,
  onBack,
}: LegalEntityFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Définir le formulaire avec react-hook-form
  const form = useForm<CompanyInfoFormValues>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      name: "",
      tax_id: "",
      address_line1: "",
      address_city: "",
      address_postal_code: "",
      address_country: "FR", // France par défaut
      phone: "",
    },
  });

  // Fonction pour gérer la soumission du formulaire
  const onSubmit = async (data: CompanyInfoFormValues) => {
    if (!accountId) {
      toast.error("ID de compte invalide");
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await updateStripeConnectCompanyInfo({
        accountId,
        companyData: {
          name: data.name,
          tax_id: data.tax_id,
          address: {
            line1: data.address_line1,
            city: data.address_city,
            postal_code: data.address_postal_code,
            country: data.address_country,
          },
          phone: data.phone,
        },
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success("Informations légales mises à jour avec succès");
      onComplete();
    } catch (err: any) {
      toast.error("Erreur lors de la mise à jour des informations légales", {
        description: err.message || "Veuillez réessayer",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">
          Informations légales de l'entreprise
        </h2>
        <p className="text-gray-500 mt-1">
          Ces informations sont nécessaires pour les aspects légaux et fiscaux.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Raison sociale / Nom légal</FormLabel>
                <FormControl>
                  <Input placeholder="Nom légal complet" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tax_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de TVA / SIRET</FormLabel>
                <FormControl>
                  <Input placeholder="FR12345678901" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Adresse du siège social</h3>

            <FormField
              control={form.control}
              name="address_line1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Rue de Paris" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address_city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ville</FormLabel>
                    <FormControl>
                      <Input placeholder="Paris" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address_postal_code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code postal</FormLabel>
                    <FormControl>
                      <Input placeholder="75001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address_country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pays (code ISO à 2 lettres)</FormLabel>
                  <FormControl>
                    <Input placeholder="FR" maxLength={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone de l'entreprise</FormLabel>
                <FormControl>
                  <Input placeholder="+33123456789" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between pt-4">
            <Button type="button" variant="outline" onClick={onBack}>
              <ChevronLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>

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
