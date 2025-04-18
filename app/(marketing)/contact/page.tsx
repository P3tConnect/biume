"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ArrowLeft, Send, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { sendContactEmail, type ContactFormData } from "./actions";
import { UserNav } from "@/components/dashboard/layout/user-nav";
import { useSession } from "@/src/lib/auth-client";

const ContactPage = () => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await sendContactEmail(formData);

      if (result.success) {
        toast.success("Votre message a été envoyé avec succès !");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        if (result.validationErrors) {
          // Afficher les erreurs de validation
          result.validationErrors.forEach(err => {
            toast.error(`${err.path}: ${err.message}`);
          });
        } else {
          toast.error(result.error || "Une erreur est survenue lors de l'envoi du message");
        }
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
      toast.error("Une erreur est survenue lors de l'envoi du message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-visible">
      {/* Header */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Bouton retour */}
        <Button variant="ghost" asChild className="group">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Retour à l&apos;accueil</span>
          </Link>
        </Button>

        {/* Navigation utilisateur ou boutons connexion/inscription */}
        <div className="flex items-center gap-4">
          {session ? (
            <UserNav />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Connexion</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Inscription</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 pt-8 flex-1">
        {/* En-tête */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 text-gradient"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Contactez-nous
          </motion.h1>
          <motion.p
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Nous sommes là pour répondre à toutes vos questions. N&apos;hésitez
            pas à nous contacter et nous vous répondrons dans les plus brefs
            délais.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Carte d'informations de contact */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="p-6 h-full bg-card/50 backdrop-blur-sm border-border/30">
              <h2 className="text-xl font-semibold mb-6">
                Informations de contact
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a
                      href="mailto:contact@biume.com"
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      contact@biume.com
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Formulaire de contact */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/30">
              <h2 className="text-xl font-semibold mb-6">
                Envoyez-nous un message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nom complet
                    </label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Votre nom"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Adresse email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="votre@email.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Sujet
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    placeholder="Sujet de votre message"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Votre message..."
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="mr-2">Envoi en cours</span>
                      <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                    </>
                  ) : (
                    <>
                      <span>Envoyer le message</span>
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
