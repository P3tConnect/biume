import {
  Calendar,
  Clock,
  Star,
  MessageSquare,
  CreditCard,
  Stethoscope,
} from "lucide-react";
import Image from "next/image";

const userFeatures = [
  {
    title: "Réservation instantanée",
    description: "Prenez rendez-vous en quelques clics, 24h/24 et 7j/7.",
    icon: Calendar,
  },
  {
    title: "Disponibilités en temps réel",
    description: "Visualisez les créneaux disponibles instantanément.",
    icon: Clock,
  },
  {
    title: "Avis vérifiés",
    description: "Consultez les avis de propriétaires d'animaux comme vous.",
    icon: Star,
  },
  {
    title: "Rappels automatiques",
    description: "Recevez des rappels pour ne jamais manquer un rendez-vous.",
    icon: MessageSquare,
  },
  {
    title: "Paiement sécurisé",
    description: "Payez en ligne en toute sécurité lors de la réservation.",
    icon: CreditCard,
  },
  {
    title: "Suivi santé",
    description: "Accédez à l'historique médical de votre animal.",
    icon: Stethoscope,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-accent/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-foreground/80">
            Tout ce dont vous avez besoin pour la santé de votre animal
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">
            Une plateforme simple et intuitive pour gérer les soins de votre
            compagnon
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
          {userFeatures.map((feature, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-background to-accent/5 p-8 rounded-2xl border hover:border-primary/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Statistiques */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 sm:space-y-6">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 text-center md:text-left bg-clip-text text-transparent bg-foreground/80">
                La plateforme de référence pour la santé animale
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:gap-6">
                <div className="bg-gradient-to-br from-background via-background/95 to-secondary/5 p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-border/50 hover:border-secondary/30 transition-colors duration-300">
                  <div className="text-2xl sm:text-3xl font-bold text-secondary mb-1 sm:mb-2">
                    98%
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    de satisfaction client
                  </div>
                </div>
                <div className="bg-gradient-to-br from-background via-background/95 to-secondary/5 p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-border/50 hover:border-secondary/30 transition-colors duration-300">
                  <div className="text-2xl sm:text-3xl font-bold text-secondary mb-1 sm:mb-2">
                    15k+
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    rendez-vous pris
                  </div>
                </div>
                <div className="bg-gradient-to-br from-background via-background/95 to-secondary/5 p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-border/50 hover:border-secondary/30 transition-colors duration-300">
                  <div className="text-2xl sm:text-3xl font-bold text-secondary mb-1 sm:mb-2">
                    2000+
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    vétérinaires
                  </div>
                </div>
                <div className="bg-gradient-to-br from-background via-background/95 to-secondary/5 p-3 sm:p-6 rounded-xl sm:rounded-2xl border border-border/50 hover:border-secondary/30 transition-colors duration-300">
                  <div className="text-2xl sm:text-3xl font-bold text-secondary mb-1 sm:mb-2">
                    4.8/5
                  </div>
                  <div className="text-xs sm:text-sm text-muted-foreground">
                    note moyenne
                  </div>
                </div>
              </div>
            </div>
            <div className="relative mt-8 md:mt-0">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-secondary/10 to-primary/5 rounded-2xl sm:rounded-3xl blur-2xl"></div>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=800&auto=format&fit=crop"
                  alt="Fonctionnalités Pawthera"
                  width={500}
                  height={500}
                  className="rounded-xl sm:rounded-2xl shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
