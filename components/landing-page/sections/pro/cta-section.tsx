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
import { useActionMutation } from "@/src/hooks/action-hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export function CTASection() {
  const form = useForm<z.infer<typeof waitlistInsertSchema>>({
    resolver: zodResolver(waitlistInsertSchema),
    defaultValues: {
      email: "",
      name: "",
      firstName: "",
      organizationName: "",
      comment: "",
    },
  });

  const { handleSubmit, control } = form;

  const { mutateAsync, isPending } = useActionMutation(addToWaitList, {
    onSuccess: () => {
      toast.success("Votre inscription a bien été prise en compte !");
      form.reset();
    },
    onError: () => {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data);
  });

  return (
    <section className="py-16 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-3xl blur-2xl"></div>
          <div className="relative bg-background border rounded-3xl p-6 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Rejoignez notre liste d&apos;attente
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Soyez parmi les premiers professionnels à rejoindre notre plateforme et bénéficiez d&apos;avantages exclusifs
            </p>
            <Form {...form}>
              <form onSubmit={onSubmit} className="max-w-md mx-auto">
                <div className="flex flex-col gap-4">
                  <FormField
                    control={control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Votre prénom"
                            className="h-12 text-base rounded-xl"
                            value={field.value ?? ''}
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
                            className="h-12 text-base rounded-xl"
                            value={field.value ?? ''}
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
                            className="h-12 text-base rounded-xl"
                            value={field.value ?? ''}
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
                            className="h-12 text-base rounded-xl"
                            value={field.value ?? ''}
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
                            className="h-12 text-base rounded-xl"
                            value={field.value ?? ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="lg"
                    disabled={isPending}
                    className="w-full custom-button h-12 px-6 text-base rounded-xl"
                  >
                    {isPending ? "En cours..." : "S'inscrire"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
} 