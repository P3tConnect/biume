import { Button } from "@/components/ui/button";
import Avvvatars from "avvvatars-react";
import { ArrowRight, Heart, MessageCircle, Star, Calendar } from "lucide-react";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="py-16 relative overflow-visible">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative bg-background border rounded-3xl p-8 md:p-12">
            {/* Décoration avec les images d'animaux */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-16 h-16 rounded-full border-4 border-background overflow-hidden shadow-lg"
                  >
                    <Avvvatars value="Dog" style="shape" size={56} />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                <Heart className="w-4 h-4" />
                <span className="text-sm font-medium">
                  Pour l&apos;amour de nos compagnons
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Rejoignez notre communauté d&apos;amoureux des animaux
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Commencez dès aujourd&apos;hui à prendre soin de vos compagnons
                comme ils le méritent. Plus de 15 000 propriétaires nous font déjà
                confiance.
              </p>

              {/* Statistiques */}
              <div className="grid grid-cols-3 gap-8 mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-xl">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">24/7</div>
                  <div className="text-sm text-muted-foreground">
                    Disponibilité
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-xl">
                    <Star className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">4.8/5</div>
                  <div className="text-sm text-muted-foreground">
                    Note moyenne
                  </div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-primary/10 rounded-xl">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-primary">15k+</div>
                  <div className="text-sm text-muted-foreground">
                    Propriétaires
                  </div>
                </div>
              </div>

              {/* Boutons */}
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="h-12 px-8">
                  Créer un compte gratuit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="h-12 px-8">
                  Voir les témoignages
                  <MessageCircle className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-6 -right-6 bg-card border rounded-2xl p-4 shadow-xl animate-float hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Nouveau membre</div>
                  <div className="text-xs text-muted-foreground">
                    Bienvenue dans la communauté !
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute -bottom-6 -left-6 bg-card border rounded-2xl p-4 shadow-xl animate-float hidden md:block"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Suivi quotidien</div>
                  <div className="text-xs text-muted-foreground">
                    Pour leur bien-être
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
