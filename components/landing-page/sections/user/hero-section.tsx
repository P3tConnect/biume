"use client";

import { Star, Calendar } from "lucide-react";
import SearchInput from "./search-input";
import { Suspense } from "react";

export function HeroSection() {


  return (
    <section className="relative flex items-center bg-gradient-to-b from-accent/5 to-background overflow-visible pb-32 pt-32">
      <div className="container relative mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Hero Content */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Trouvez le meilleur professionnel
              <span className="block mt-2 text-gradient">
                pour votre animal
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Prenez rendez-vous en ligne 24h/24 et 7j/7 avec les meilleurs
              professionnels près de chez vous
            </p>
          </div>

          {/* Search Box */}
          <Suspense fallback={<div>Loading...</div>}>
            <SearchInput />
          </Suspense>

          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">2000+</div>
              <div className="text-sm text-muted-foreground">
                Professionnels
              </div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">15k+</div>
              <div className="text-sm text-muted-foreground">Utilisateurs</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">4.8/5</div>
              <div className="text-sm text-muted-foreground">Note moyenne</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Disponibilité</div>
            </div>
          </div>

          {/* Floating Cards */}
          <div className="relative mt-16 hidden md:block">
            <div className="absolute -top-8 left-12 bg-card border rounded-2xl p-4 shadow-xl animate-float z-10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Nouveau rendez-vous</div>
                  <div className="text-xs text-muted-foreground">
                    Consultation réussie !
                  </div>
                </div>
              </div>
            </div>
            <div
              className="absolute -top-4 right-12 bg-card border rounded-2xl p-4 shadow-xl animate-float"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Prochain vaccin</div>
                  <div className="text-xs text-muted-foreground">
                    Dans 3 jours
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
