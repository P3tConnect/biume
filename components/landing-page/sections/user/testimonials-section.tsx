import { Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Avvvatars from "avvvatars-react";

const testimonials = [
  {
    name: "Marie L.",
    avatar: "/avatars/user-1.jpg",
    animal: "Chat",
    content:
      "Super application ! J'ai pu trouver un osthéopathe disponible en urgence pour mon chat. Le processus de réservation est simple et rapide.",
    rating: 5,
    date: "Il y a 2 jours",
  },
  {
    name: "Thomas B.",
    avatar: "/avatars/user-2.jpg",
    animal: "Chien",
    content:
      "Très pratique pour gérer les rendez-vous de vaccination de mon chien. Les rappels automatiques sont vraiment utiles.",
    rating: 5,
    date: "Il y a 1 semaine",
  },
  {
    name: "Sophie M.",
    avatar: "/avatars/user-3.jpg",
    animal: "Lapin",
    content:
      "J'apprécie particulièrement la possibilité de voir les avis des autres propriétaires. Cela m'a aidé à choisir le bon vétérinaire pour mon lapin.",
    rating: 5,
    date: "Il y a 2 semaines",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            La confiance de nos utilisateurs
          </h2>
          <p className="text-lg text-muted-foreground">
            Découvrez les expériences des propriétaires d'animaux qui utilisent
            Pawthera
          </p>
        </div>

        {/* Carrousel de témoignages */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-accent/5 rounded-2xl p-6 relative">
              {/* En-tête du témoignage */}
              <div className="flex items-start gap-4 mb-4">
                <Avvvatars value={testimonial.name} size={48} />
                <div className="flex-1">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    Propriétaire d'un {testimonial.animal}
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.date}
                </div>
              </div>

              {/* Note */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Contenu */}
              <p className="text-sm leading-relaxed">"{testimonial.content}"</p>
            </div>
          ))}
        </div>

        {/* Section statistiques */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-8 bg-accent/5 rounded-full px-8 py-4">
            <div>
              <div className="text-2xl font-bold text-primary">15k+</div>
              <div className="text-sm text-muted-foreground">Avis</div>
            </div>
            <div className="h-8 w-px bg-border"></div>
            <div>
              <div className="text-2xl font-bold text-primary">4.8/5</div>
              <div className="text-sm text-muted-foreground">Note moyenne</div>
            </div>
            <div className="h-8 w-px bg-border"></div>
            <div>
              <div className="text-2xl font-bold text-primary">98%</div>
              <div className="text-sm text-muted-foreground">Recommandent</div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Button size="lg" className="h-12 px-8">
            Voir tous les avis
          </Button>
        </div>
      </div>
    </section>
  );
}
