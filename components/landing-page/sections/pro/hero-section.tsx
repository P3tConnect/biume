import { Button } from "@/components/ui/button";
import { ArrowRight, PawPrint, Clock, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent via-background to-background"></div>
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 clip-path-diagonal"></div>
      <div className="container relative mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-8 animate-fade-in">
              <PawPrint className="w-4 h-4" />
              <span className="text-sm font-medium">
                La santé de vos patients, notre priorité
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Prenez soin de vos
              <span className="block mt-2 text-gradient">compagnons</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg">
              Une plateforme innovante qui révolutionne la gestion de la santé
              et du bien-être de votre entreprise animalière.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button
                size="lg"
                className="custom-button h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg"
                asChild
              >
                <Link href="#waitlist">
                  Je m&apos;inscris à la liste d&apos;attente
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:flex sm:items-center gap-4">
              {/* <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  2k+
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Utilisateurs actifs
                </div>
              </div> */}
              {/* <div className="hidden sm:block w-px h-12 bg-border"></div> */}
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  98%
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Satisfaction client
                </div>
              </div>
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                  24/7
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Support client
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-background to-accent/10 rounded-3xl p-8 border shadow-2xl">
              <Image
                src="/PawThera.jpeg"
                alt="Application Pawthera"
                width={600}
                height={600}
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">
                      Prochain rendez-vous
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Dans 2 jours
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="absolute -top-6 -left-6 bg-card border border-border rounded-2xl p-4 shadow-xl animate-float"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Santé optimale</div>
                    <div className="text-xs text-muted-foreground">
                      Vaccins à jour
                    </div>
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