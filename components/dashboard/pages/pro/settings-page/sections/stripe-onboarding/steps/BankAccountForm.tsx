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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { addStripeConnectBankAccount } from "@/src/actions/stripe-connect.action";
import { ChevronLeft, Loader2, Info } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Schéma de validation
const bankAccountSchema = z.object({
  account_number: z.string().min(10, { message: "Numéro de compte invalide" }),
  account_holder_name: z
    .string()
    .min(2, { message: "Nom du titulaire requis" }),
  account_holder_type: z.enum(["individual", "company"], {
    required_error: "Type de titulaire requis",
  }),
  country: z.string().length(2, { message: "Code pays requis" }),
  currency: z.string().length(3, { message: "Devise requise" }),
});

type BankAccountFormValues = z.infer<typeof bankAccountSchema>;

interface BankAccountFormProps {
  accountId: string | null;
  onComplete: () => void;
  onBack: () => void;
}

export function BankAccountForm({
  accountId,
  onComplete,
  onBack,
}: BankAccountFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Définir le formulaire avec react-hook-form
  const form = useForm<BankAccountFormValues>({
    resolver: zodResolver(bankAccountSchema),
    defaultValues: {
      account_number: "",
      account_holder_name: "",
      account_holder_type: "company",
      country: "FR",
      currency: "EUR",
    },
  });

  // Fonction pour gérer la soumission du formulaire
  const onSubmit = async (data: BankAccountFormValues) => {
    if (!accountId) {
      toast.error("ID de compte invalide");
      return;
    }

    try {
      setIsSubmitting(true);

      const result = await addStripeConnectBankAccount({
        accountId,
        bankAccountData: {
          accountNumber: data.account_number,
          accountHolderName: data.account_holder_name,
          accountHolderType: data.account_holder_type,
          country: data.country,
          currency: data.currency,
        },
      });

      if (result.error) {
        throw new Error(result.error);
      }

      toast.success("Compte bancaire ajouté avec succès");
      onComplete();
    } catch (err: any) {
      toast.error("Erreur lors de l'ajout du compte bancaire", {
        description: err.message || "Veuillez réessayer",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Liste des pays supportés
  const countries = [
    { value: "FR", label: "France" },
    { value: "BE", label: "Belgique" },
    { value: "CH", label: "Suisse" },
    { value: "LU", label: "Luxembourg" },
    { value: "DE", label: "Allemagne" },
    { value: "IT", label: "Italie" },
    { value: "ES", label: "Espagne" },
  ];

  // Liste des devises supportées
  const currencies = [
    { value: "EUR", label: "Euro (EUR)" },
    { value: "CHF", label: "Franc Suisse (CHF)" },
    { value: "GBP", label: "Livre Sterling (GBP)" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Compte bancaire</h2>
        <p className="text-gray-500 mt-1">
          Ajoutez un compte bancaire pour recevoir vos paiements.
        </p>
      </div>

      <Alert className="bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">
          Information importante
        </AlertTitle>
        <AlertDescription className="text-blue-700">
          Assurez-vous d'entrer les informations exactes du compte bancaire de
          votre entreprise. Ces informations seront vérifiées par Stripe.
        </AlertDescription>
      </Alert>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pays du compte</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un pays" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country.value} value={country.value}>
                          {country.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Devise</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une devise" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.value} value={currency.value}>
                          {currency.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="account_holder_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom du titulaire du compte</FormLabel>
                <FormControl>
                  <Input placeholder="SARL Votre Entreprise" {...field} />
                </FormControl>
                <FormDescription>
                  Entrez le nom exact tel qu'il apparaît sur vos relevés
                  bancaires.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="account_holder_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type de titulaire</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="company" id="company" />
                      <Label htmlFor="company">Entreprise</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="individual" id="individual" />
                      <Label htmlFor="individual">Individuel</Label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="account_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro IBAN</FormLabel>
                <FormControl>
                  <Input placeholder="FR76XXXXXXXXXXXXXXXXXX" {...field} />
                </FormControl>
                <FormDescription>
                  Pour un compte français, l'IBAN commence par FR et contient 27
                  caractères.
                </FormDescription>
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
