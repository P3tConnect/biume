"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { addToWaitList } from "@/src/actions/waitlist.action";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { waitlistInsertSchema } from "@/src/db";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";
import { Loader2, CheckCircle2 } from "lucide-react";
import {
  Credenza,
  CredenzaTrigger,
  CredenzaContent,
  CredenzaDescription,
  CredenzaHeader,
  CredenzaTitle,
} from "@/components/ui";
import { useMutation } from "@tanstack/react-query";

const WaitListPro = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof waitlistInsertSchema>>({
    resolver: zodResolver(waitlistInsertSchema),
    defaultValues: {
      email: "",
      name: "",
      firstName: "",
      organizationName: "",
      isPro: true,
      comment: "",
    },
  });

  const { handleSubmit, control } = form;

  const { mutateAsync } = useMutation({
    mutationFn: addToWaitList,
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("Inscription réussie !", {
        description: "Nous vous contacterons dès que possible.",
      });
      setTimeout(() => {
        setOpen(false);
        setIsSuccess(false);
        form.reset();
      }, 2000);
    },
    onError: () => {
      toast.error("Une erreur est survenue", {
        description: "Veuillez réessayer plus tard.",
      });
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true);
    try {
      await mutateAsync(data);
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <Credenza open={open} onOpenChange={setOpen}>
      <CredenzaTrigger asChild>{children}</CredenzaTrigger>
      <CredenzaContent className="sm:max-w-[425px]">
        <CredenzaHeader>
          <CredenzaTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Rejoignez l&apos;aventure Biume Pro
          </CredenzaTitle>
          <CredenzaDescription className="text-base">
            Soyez parmi les premiers professionnels à découvrir Biume.
            Remplissez le formulaire ci-dessous pour vous inscrire à notre liste
            d&apos;attente.
          </CredenzaDescription>
        </CredenzaHeader>
        {!isSuccess ? (
          <Form {...form}>
            <form onSubmit={onSubmit} className="space-y-4 mt-4">
              <FormField
                control={control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Votre prénom"
                        className="h-11 rounded-xl"
                        disabled={isLoading}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Votre nom"
                        className="h-11 rounded-xl"
                        disabled={isLoading}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Votre adresse email"
                        className="h-11 rounded-xl"
                        disabled={isLoading}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="organizationName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Nom de votre organisation"
                        className="h-11 rounded-xl"
                        disabled={isLoading}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Un commentaire ? (optionnel)"
                        className="rounded-xl resize-none min-h-[100px]"
                        disabled={isLoading}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-4">
                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Inscription en cours...
                    </>
                  ) : (
                    "S'inscrire"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <div className="rounded-full bg-primary/10 p-3">
              <CheckCircle2 className="h-8 w-8 text-primary animate-in zoom-in" />
            </div>
            <p className="text-lg font-medium text-center">
              Merci de votre inscription !
            </p>
            <p className="text-sm text-muted-foreground text-center">
              Nous vous contacterons dès que possible pour vous donner accès à
              Biume Pro.
            </p>
          </div>
        )}
      </CredenzaContent>
    </Credenza>
  );
};

export function CTASection() {
  return (
    <section id="waitlist" className="py-16 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-3xl blur-2xl"></div>
          <div className="relative bg-background border rounded-3xl p-6 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Rejoignez notre liste d&apos;attente
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Soyez parmi les premiers professionnels à rejoindre notre
              plateforme et bénéficiez d&apos;avantages exclusifs
            </p>
            <WaitListPro>
              <Button
                size="lg"
                className="custom-button h-12 px-6 text-base rounded-xl"
              >
                S&apos;inscrire maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </WaitListPro>
          </div>
        </div>
      </div>
    </section>
  );
}
