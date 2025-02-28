"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Données de témoignages fictifs de professionnels
const testimonials = [
  {
    id: 1,
    content:
      "Biume a considérablement amélioré la gestion de mon cabinet vétérinaire. La planification des rendez-vous est beaucoup plus efficace, et la communication avec les propriétaires d'animaux est simplifiée.",
    author: "Dr. Sophie Moreau",
    role: "Vétérinaire généraliste",
    clinic: "Clinique Animalis",
    location: "Lyon",
    years: "10 ans d'expérience",
    avatar: "/images/testimonials/vet-1.webp",
    rating: 5,
    specialty: "Médecine générale",
  },
  {
    id: 2,
    content:
      "En tant que spécialiste en chirurgie, j'ai besoin d'un suivi précis de mes patients. Biume me permet de gérer efficacement les dossiers médicaux et d'avoir un historique complet pour chaque animal.",
    author: "Dr. Thomas Lefèvre",
    role: "Chirurgien vétérinaire",
    clinic: "Centre Vétérinaire Expert",
    location: "Bordeaux",
    years: "15 ans d'expérience",
    avatar: "/images/testimonials/vet-2.webp",
    rating: 5,
    specialty: "Chirurgie",
  },
  {
    id: 3,
    content:
      "La gestion administrative de mon cabinet n'a jamais été aussi simple. Les fonctionnalités de facturation et de gestion des documents sont particulièrement bien pensées et me font gagner un temps précieux.",
    author: "Dr. Marie Dupont",
    role: "Vétérinaire et directrice",
    clinic: "Clinique du Grand Chêne",
    location: "Toulouse",
    years: "8 ans d'expérience",
    avatar: "/images/testimonials/vet-3.webp",
    rating: 4,
    specialty: "Dermatologie",
  },
  {
    id: 4,
    content:
      "Les statistiques et analyses fournies par Biume m'ont permis d'optimiser l'organisation de ma clinique et d'améliorer la rentabilité. Un outil indispensable pour tout vétérinaire entrepreneur.",
    author: "Dr. Alexandre Martin",
    role: "Vétérinaire comportementaliste",
    clinic: "Comport'Animal",
    location: "Nantes",
    years: "12 ans d'expérience",
    avatar: "/images/testimonials/vet-4.webp",
    rating: 5,
    specialty: "Comportement animal",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const testimonialRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section
      id="testimonials"
      className="py-24 relative overflow-hidden bg-muted/30"
    >
      {/* Élément décoratif */}
      <div className="absolute left-0 top-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/5 rounded-full blur-3xl transform translate-x-1/4 -translate-y-1/4"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/5 rounded-full blur-3xl transform -translate-x-1/4 translate-y-1/4"></div>
      </div>

      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <Quote className="w-4 h-4" />
            <span>Témoignages de professionnels</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ce que nos vétérinaires partenaires disent
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez comment Biume aide les professionnels de la santé animale
            à améliorer leur pratique quotidienne.
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          <div
            ref={testimonialRef}
            className="relative overflow-hidden px-4 py-8"
          >
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card rounded-2xl border shadow-sm overflow-hidden"
            >
              <div className="grid md:grid-cols-5 gap-6">
                {/* Colonne de gauche - Informations sur le vétérinaire */}
                <div className="md:col-span-2 bg-muted/30 p-6 md:p-8 flex flex-col items-center md:items-start">
                  <div className="mb-6 flex flex-col items-center md:items-start">
                    <Avatar className="h-20 w-20 mb-4 border-4 border-background">
                      <AvatarImage
                        src={currentTestimonial.avatar}
                        alt={currentTestimonial.author}
                      />
                      <AvatarFallback>
                        {currentTestimonial.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>

                    <h3 className="text-xl font-semibold mb-1">
                      {currentTestimonial.author}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {currentTestimonial.role}
                    </p>

                    <Badge variant="outline" className="mb-2">
                      {currentTestimonial.specialty}
                    </Badge>
                  </div>

                  <div className="space-y-3 text-sm w-full">
                    <div className="flex items-center justify-between gap-2 pb-2 border-b">
                      <span className="font-medium">Clinique</span>
                      <span className="text-muted-foreground">
                        {currentTestimonial.clinic}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pb-2 border-b">
                      <span className="font-medium">Localisation</span>
                      <span className="text-muted-foreground">
                        {currentTestimonial.location}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 pb-2 border-b">
                      <span className="font-medium">Expérience</span>
                      <span className="text-muted-foreground">
                        {currentTestimonial.years}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-1 mt-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-4 h-4",
                          i < currentTestimonial.rating
                            ? "text-amber-400 fill-amber-400"
                            : "text-muted stroke-muted",
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Colonne de droite - Témoignage */}
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <Quote className="w-10 h-10 text-primary/20 mb-4" />
                    <p className="text-lg italic mb-6">
                      {currentTestimonial.content}
                    </p>
                  </div>

                  <div className="mt-auto">
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-sm text-muted-foreground">
                        Utilisateur de Biume depuis 2 ans
                      </div>

                      <div className="flex gap-1 items-center">
                        <span className="text-sm mr-2">
                          {currentIndex + 1}/{testimonials.length}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={handlePrev}
                        >
                          <ArrowLeft className="h-4 w-4" />
                          <span className="sr-only">Précédent</span>
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-full"
                          onClick={handleNext}
                        >
                          <ArrowRight className="h-4 w-4" />
                          <span className="sr-only">Suivant</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Indicateurs de pagination */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={cn(
                  "w-2.5 h-2.5 rounded-full transition-all",
                  index === currentIndex
                    ? "bg-primary scale-125"
                    : "bg-primary/20 hover:bg-primary/40",
                )}
              >
                <span className="sr-only">Témoignage {index + 1}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Statistiques */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "250+", label: "Cliniques vétérinaires" },
              { value: "98%", label: "Taux de satisfaction" },
              { value: "45%", label: "Gain de temps administratif" },
              { value: "30%", label: "Augmentation de la productivité" },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-card border rounded-xl p-6 text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
