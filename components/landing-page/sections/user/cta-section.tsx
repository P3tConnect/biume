"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Bell,
  CalendarClock,
  Sparkles,
  Medal,
  CheckCircle,
  Loader2,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addToWaitList } from "@/src/actions/waitlist.action";
import { waitlistInsertSchema } from "@/src/db";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export function CTASection() {
  // État pour la modale
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Formulaire
  const form = useForm<z.infer<typeof waitlistInsertSchema>>({
    resolver: zodResolver(waitlistInsertSchema),
    defaultValues: {
      name: "",
      firstName: "",
      email: "",
      organizationName: "",
      isPro: false,
      comment: "",
    },
  });

  const { handleSubmit } = form;

  // Soumission du formulaire
  const { mutateAsync } = useMutation({
    mutationFn: addToWaitList,
    onSuccess: () => {
      setIsSuccess(true);
      toast.success("Inscription réussie ! Nous vous contacterons bientôt.");
    },
    onError: () => {
      toast.error(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      );
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setIsSubmitting(true);
    try {
      await mutateAsync(values);
      setIsSuccess(true);
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error(
        "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      );
    } finally {
      setIsSubmitting(false);
    }
  });

  // Fermeture du modal
  const closeModal = () => {
    if (isSuccess) {
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
    <>
      <section className="py-24 relative">
        {/* Fond décoratif */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
            <div className="absolute right-1/3 bottom-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
            <div className="absolute left-1/3 top-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
          </div>
        </div>

        <div className="container px-4 mx-auto">
          <div className="relative max-w-5xl mx-auto bg-gradient-to-br from-card/80 to-card border rounded-3xl overflow-hidden backdrop-blur-sm shadow-lg">
            {/* Motif de décoration */}
            <div className="absolute inset-0 overflow-hidden opacity-5">
              <div className="absolute -right-8 -top-8 w-64 h-64 border-8 border-primary rounded-full"></div>
              <div className="absolute -left-8 -bottom-8 w-64 h-64 border-8 border-secondary rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12">
              <div className="flex flex-col justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary w-fit">
                    <Sparkles className="w-4 h-4" />
                    <span>Pour les propriétaires d&apos;animaux</span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Prenez soin de votre <span className="text-primary">animal chéri</span> sans soucis
                  </h2>

                  <p className="text-lg mb-8">
                    Accédez facilement aux soins vétérinaires, suivez la santé de votre animal et recevez des rappels pour ses besoins importants, le tout dans une seule application.
                  </p>

                  <div className="space-y-4 mb-8">
                    {[
                      {
                        icon: CalendarClock,
                        text: "Rendez-vous vétérinaires simplifiés",
                      },
                      {
                        icon: Heart,
                        text: "Suivi de santé et bien-être de votre animal",
                      },
                      {
                        icon: Bell,
                        text: "Rappels pour les vaccins et traitements",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <item.icon className="w-5 h-5" />
                        </div>
                        <p>{item.text}</p>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="group relative z-20"
                      onClick={() => setIsOpen(true)}
                    >
                      <span>Rejoindre la liste d&apos;attente</span>
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative flex items-center justify-center"
              >
                <div className="relative w-full h-[400px] md:h-full min-h-[300px]">
                  <Image
                    src="https://images.unsplash.com/photo-1560743641-3914f2c45636?q=80&w=600&auto=format&fit=crop"
                    alt="Application pour propriétaires d'animaux"
                    fill
                    className="object-cover rounded-xl"
                    quality={90}
                  />

                  {/* Badge flottant rappel */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="absolute -bottom-6 -left-6 md:bottom-8 md:left-8 bg-background rounded-2xl shadow-lg p-4 border backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                        <CalendarClock className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Prochain vaccin</p>
                        <p className="text-xs text-muted-foreground">
                          Rappel dans 2 semaines
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Badge flottant satisfaction */}
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="absolute -top-6 -right-6 md:top-8 md:right-8 bg-background/80 backdrop-blur-sm rounded-2xl shadow-lg p-4 border"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 mb-1 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                        <Medal className="w-5 h-5" />
                      </div>
                      <p className="text-sm font-medium">99% satisfaits</p>
                      <p className="text-xs text-muted-foreground">
                        des propriétaires
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de liste d'attente */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden">
          {!isSuccess ? (
            <div className="p-6">
              <DialogHeader className="mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 text-sm font-medium rounded-full bg-primary/10 text-primary w-fit">
                  <Sparkles className="w-4 h-4" />
                  <span>Phase bêta</span>
                </div>
                <DialogTitle className="text-2xl">
                  Rejoignez notre liste d&apos;attente
                </DialogTitle>
                <DialogDescription>
                  Soyez parmi les premiers à découvrir Biume et transformez l&apos;expérience de soin de votre animal.
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="marie.dupont@exemple.fr"
                            {...field}
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
                            Je suis un professionnel
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
                          Rejoindre la liste d&apos;attente
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
                Nous vous contacterons dès que Biume sera disponible.
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
    </>
  );
} 
