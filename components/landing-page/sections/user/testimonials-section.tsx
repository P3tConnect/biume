"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  MessageSquareQuote,
} from "lucide-react";
import Avvvatars from "avvvatars-react";
import { cn } from "@/src/lib/utils";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Témoignages fictifs
const testimonials = [
  {
    id: 1,
    content:
      "Biume a complètement changé ma façon de gérer les soins de mon chien. Je peux réserver des rendez-vous à n'importe quelle heure et j'adore recevoir des rappels pour les vaccins.",
    author: "Marie L.",
    role: "Propriétaire d'un Golden Retriever",
    avatar: "/images/testimonials/avatar-1.webp",
    rating: 5,
    petName: "Max le Golden",
  },
  {
    id: 2,
    content:
      "En tant que propriétaire de plusieurs chats, il était difficile de suivre leurs rendez-vous et traitements. Grâce à Biume, tout est organisé et facilement accessible.",
    author: "Thomas D.",
    role: "Propriétaire de 3 chats",
    avatar: "/images/testimonials/avatar-2.webp",
    rating: 5,
    petName: "Minou le Chat",
  },
  {
    id: 3,
    content:
      "L'application est intuitive et la prise de rendez-vous est vraiment simple. J'apprécie particulièrement de pouvoir communiquer directement avec mon vétérinaire.",
    author: "Sophie M.",
    role: "Propriétaire d'un Teckel",
    avatar: "/images/testimonials/avatar-3.webp",
    rating: 4,
    petName: "Oscar le Teckel",
  },
  {
    id: 4,
    content:
      "Le suivi santé est complet et me permet de garder un œil sur toutes les informations importantes concernant mon lapin. Un vrai plus pour sa santé !",
    author: "Lucas P.",
    role: "Propriétaire d'un lapin nain",
    avatar: "/images/testimonials/avatar-4.webp",
    rating: 5,
    petName: "Caramel le Lapin",
  },
  {
    id: 5,
    content:
      "Les rappels automatiques sont parfaits, je n'oublie plus jamais un rendez-vous ou un traitement. La plateforme est vraiment bien pensée pour les propriétaires d'animaux.",
    author: "Camille B.",
    role: "Propriétaire d'un Berger Australien",
    avatar: "/images/testimonials/avatar-5.webp",
    rating: 5,
    petName: "Luna le Berger",
  },
];

export function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  const handleDragStart = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    setIsDragging(true);
    if ("clientX" in e) {
      setDragStartX(e.clientX);
    } else {
      setDragStartX(e.touches[0].clientX);
    }
  };

  const handleDragMove = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    if (!isDragging) return;

    const currentX = "clientX" in e ? e.clientX : e.touches[0].clientX;
    const diff = dragStartX - currentX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setIsDragging(false);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* Fond décoratif */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-background to-background/60 to-90%"></div>
        <div className="absolute top-0 left-0 w-full h-96 bg-primary/5 rounded-[100%] blur-3xl transform translate-y-[-50%]"></div>
      </div>

      <div className="container px-4 mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-sm font-medium rounded-full bg-secondary/10 text-secondary">
              <MessageSquareQuote className="w-4 h-4" />
              <span>Témoignages</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ce que nos utilisateurs disent de nous
            </h2>
            <p className="text-lg text-muted-foreground">
              Découvrez les expériences des propriétaires d&apos;animaux qui
              utilisent Biume au quotidien pour prendre soin de leurs
              compagnons.
            </p>
          </motion.div>
        </div>

        <div
          ref={containerRef}
          className="relative max-w-4xl mx-auto"
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          <div className="relative overflow-hidden py-8">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-card rounded-2xl border p-8 md:p-10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-24 w-24 bg-primary/5 rounded-bl-[100%]"></div>

                    <div className="mb-8">
                      <div className="flex gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "w-5 h-5",
                              i < testimonial.rating
                                ? "text-amber-400 fill-amber-400"
                                : "text-muted stroke-muted",
                            )}
                          />
                        ))}
                      </div>

                      <p className="text-lg italic relative">
                        <span className="absolute -left-2 -top-2 text-primary/20 text-4xl">
                          &quot;
                        </span>
                        {testimonial.content}
                        <span className="absolute -right-2 bottom-0 text-primary/20 text-4xl">
                          &quot;
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-background">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.author}
                          />
                          <AvatarFallback>
                            {testimonial.author.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{testimonial.author}</h4>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>

                      <div className="relative h-20 w-20 rounded-full overflow-hidden flex items-center justify-center">
                        <Avvvatars value={testimonial.petName} size={42} style="character" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contrôles de navigation */}
          <div className="flex items-center justify-center gap-6 mt-8">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
              onClick={handlePrev}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Précédent</span>
            </Button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={cn(
                    "w-2.5 h-2.5 rounded-full transition-all",
                    index === activeIndex
                      ? "bg-secondary scale-125"
                      : "bg-secondary/20 hover:bg-secondary/40",
                  )}
                >
                  <span className="sr-only">Témoignage {index + 1}</span>
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-10 w-10"
              onClick={handleNext}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Suivant</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
