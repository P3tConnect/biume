import { Button } from "@/components/ui/button";
import { ArrowRight, Heart, Sparkles, Dog, Cat, Rabbit, Star, Calendar } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-accent/10 to-background"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 animate-float" style={{ animationDelay: "0.1s" }}>
          <Dog className="w-16 h-16 text-primary/20" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: "0.3s" }}>
          <Cat className="w-12 h-12 text-secondary/20" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: "0.5s" }}>
          <Rabbit className="w-14 h-14 text-accent/40" />
        </div>
      </div>
      <div className="container relative mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div className="relative z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-8 animate-fade-in">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Pour l'amour de nos compagnons</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Chaque animal mérite
              <span className="block mt-2 text-gradient">le meilleur des soins</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg mx-auto lg:mx-0">
              Une application conçue avec amour pour vous aider à prendre soin de vos compagnons comme ils le méritent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <Button size="lg" className="custom-button h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-primary">
                Commencer l'aventure
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="custom-button h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg">
                Découvrir l'app
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-4 border-background overflow-hidden">
                    <Image
                      src={`/avatars/pet-${i}.jpg`}
                      alt={`Animal ${i}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm">
                <div className="font-semibold">Rejoignez +5,000 familles</div>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-muted-foreground">4.9/5 (2k+ avis)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative xl:scale-110">
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl"></div>
            <div className="relative bg-gradient-to-br from-background to-accent/5 rounded-3xl p-8 border shadow-2xl">
              <Image
                src="/PawThera.jpeg"
                alt="Application Pawthera"
                width={600}
                height={600}
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Prochain vaccin</div>
                    <div className="text-xs text-muted-foreground">Luna • Dans 3 jours</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: "0.2s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-medium">Suivi quotidien</div>
                    <div className="text-xs text-muted-foreground">Tout va bien !</div>
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