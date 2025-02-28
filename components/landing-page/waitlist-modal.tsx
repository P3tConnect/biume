"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Sparkles, Star, CheckCircle, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
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
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { waitlistInsertSchema } from "@/src/db";
import { addToWaitList } from "@/src/actions/waitlist.action";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

interface WaitlistModalProps {
  children?: React.ReactNode;
  defaultIsPro?: boolean;
}

export function WaitlistModal({
  children,
  defaultIsPro = true,
}: WaitlistModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof waitlistInsertSchema>>({
    resolver: zodResolver(waitlistInsertSchema),
    defaultValues: {
      name: "",
      firstName: "",
      email: "",
      organizationName: "",
      isPro: defaultIsPro,
      comment: "",
    },
  });

  const { handleSubmit } = form;

  const { mutateAsync } = useMutation({
    mutationFn: addToWaitList,
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("Inscription réussie ! Nous vous contacterons bientôt.");
    },
    onError: () => {
      toast.error(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
      );
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      await mutateAsync(values);
      setIsSuccess(true);
      toast.success("Inscription réussie ! Nous vous contacterons bientôt.");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  const closeModal = () => {
    if (isSuccess) {
      // Reset form and states when closing after success
      setIsOpen(false);
      setTimeout(() => {
        setIsSuccess(false);
        form.reset();
      }, 300);
    } else {
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="gap-2">
            <Sparkles className="h-4 w-4" />
            Rejoindre la liste d'attente
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
        {!isSuccess ? (
          <div className="p-6">
            <DialogHeader className="mb-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 text-sm font-medium rounded-full bg-primary/10 text-primary w-fit">
                <Sparkles className="w-4 h-4" />
                <span>Phase bêta</span>
              </div>
              <DialogTitle className="text-2xl">
                Rejoignez notre liste d'attente
              </DialogTitle>
              <DialogDescription>
                Soyez parmi les premiers à découvrir Biume Pro et transformez
                votre pratique vétérinaire.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input placeholder="Dupont" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <Input placeholder="Marie" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email professionnel</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="marie.dupont@clinique-veterinaire.fr"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organizationName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de votre entreprise</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Clinique Vétérinaire des Alpes"
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
                  name="comment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Un message pour nous ? (facultatif)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Partagez vos attentes concernant notre solution..."
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
                  name="isPro"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="cursor-pointer">
                          Je suis un professionnel vétérinaire
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <DialogFooter className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Inscription en cours...
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4" />
                        Rejoindre la liste d'attente
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </div>
        ) : (
          <motion.div
            className="p-8 text-center flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Merci pour votre inscription !
            </h2>
            <p className="text-muted-foreground mb-6">
              Nous vous contacterons dès que Biume Pro sera disponible pour
              votre cabinet.
            </p>

            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <Button variant="outline" className="gap-2" onClick={closeModal}>
              Fermer
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
