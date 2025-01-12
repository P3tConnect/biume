import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle } from "lucide-react";
import Image from "next/image";

export function CTASection() {
  return (
    <section className="py-16 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-3xl blur-2xl"></div>
          <div className="relative bg-background border rounded-3xl p-6 sm:p-12 text-center">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-4 border-background overflow-hidden">
                    <Image
                      src={`/pets/pet-${i}.jpg`}
                      alt={`Animal ${i}`}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 mt-8">
              Rejoignez notre communauté d'amoureux des animaux
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
              Commencez dès aujourd'hui à prendre soin de vos compagnons comme jamais auparavant
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="w-full sm:w-auto custom-button h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg">
                Créer un compte gratuit
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto custom-button h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg">
                Voir les témoignages
                <MessageCircle className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 