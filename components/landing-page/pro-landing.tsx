import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Star, Calendar, Heart, Shield, Zap, Users, Gift, ChevronRight, Sparkles, PawPrint, Clock, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function ProLanding() {
  return (
    <div className="flex flex-col h-screen w-screen">
      {/* Hero Section Asymétrique */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent via-background to-background"></div>
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 clip-path-diagonal"></div>
        <div className="container relative mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary mb-8 animate-fade-in">
                <PawPrint className="w-4 h-4" />
                <span className="text-sm font-medium">La santé de vos animaux, notre priorité</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight mb-6">
                Prenez soin de vos
                <span className="block mt-2 text-gradient">compagnons</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-lg">
                Une plateforme innovante qui révolutionne la gestion de la santé et du bien-être de vos animaux de compagnie.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button size="lg" className="custom-button h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg">
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="custom-button h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg">
                  Voir la démo
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </div>
              <div className="grid grid-cols-2 sm:flex sm:items-center gap-4 sm:gap-8">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">2k+</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Utilisateurs actifs</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-border"></div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">98%</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Satisfaction client</div>
                </div>
                <div className="hidden sm:block w-px h-12 bg-border"></div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-xs sm:text-sm text-muted-foreground">Support client</div>
                </div>
              </div>
            </div>
            <div className="relative xl:scale-110">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
              <div className="relative bg-gradient-to-br from-background to-accent/10 rounded-3xl p-8 border shadow-2xl">
                <Image
                  src="/PawThera.jpeg"
                  alt="Application Pawthera"
                  width={600}
                  height={600}
                  className="rounded-2xl shadow-lg"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Prochain rendez-vous</div>
                      <div className="text-xs text-muted-foreground">Dans 2 jours</div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-6 -left-6 bg-white rounded-2xl p-4 shadow-xl animate-float" style={{ animationDelay: "0.2s" }}>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Santé optimale</div>
                      <div className="text-xs text-muted-foreground">Vaccins à jour</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Caractéristiques */}
      <section className="py-16 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-background"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
              Une suite complète pour le bien-être de vos animaux
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Des outils intelligents pour une gestion optimale de la santé de vos compagnons
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
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
        </div>
      </section>

      {/* Section Témoignages */}
      <section className="py-16 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Ce que disent nos utilisateurs</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Découvrez les expériences de nos utilisateurs satisfaits
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-background border rounded-2xl p-8 hover:border-primary/50 transition-colors duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="rounded-full ring-2 ring-primary/20"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground mb-6">"{testimonial.content}"</p>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Prix */}
      <section className="py-16 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">Des forfaits adaptés à vos besoins</h2>
            <p className="text-lg sm:text-xl text-muted-foreground">
              Choisissez le plan qui correspond le mieux à vos attentes
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`relative group ${plan.popular ? "scale-105" : ""
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className={`relative p-8 rounded-2xl border transition-colors duration-300 ${plan.popular ? "bg-primary text-primary-foreground border-primary" : "bg-background hover:border-primary/50"
                  }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary-foreground text-primary px-4 py-1 rounded-full text-sm font-semibold">
                      Le plus populaire
                    </div>
                  )}
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}€</span>
                      <span className="text-sm text-muted-foreground">/mois</span>
                    </div>
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${plan.popular ? "text-primary-foreground" : "text-primary"
                          }`} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full h-12 ${plan.popular
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                  >
                    Choisir {plan.name}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 sm:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5"></div>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 rounded-3xl blur-2xl"></div>
            <div className="relative bg-background border rounded-3xl p-6 sm:p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
                Prêt à prendre soin de vos compagnons ?
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto">
                Rejoignez des milliers de propriétaires qui font confiance à notre plateforme
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" className="w-full sm:w-auto custom-button h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg">
                  Commencer gratuitement
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto custom-button h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg">
                  Contacter l'équipe
                  <Phone className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Suivi de santé intelligent",
    description: "Suivez automatiquement les vaccins, traitements et rendez-vous avec des rappels intelligents.",
    icon: Heart
  },
  {
    title: "Gestion des rendez-vous",
    description: "Planifiez et gérez tous les rendez-vous de vos animaux en quelques clics.",
    icon: Calendar
  },
  {
    title: "Dossier médical complet",
    description: "Accédez à l'historique complet et partagez-le en toute sécurité avec les professionnels.",
    icon: Shield
  },
  {
    title: "Collaboration simplifiée",
    description: "Partagez facilement les informations avec les vétérinaires et autres soignants.",
    icon: Users
  },
  {
    title: "Notifications intelligentes",
    description: "Recevez des alertes personnalisées pour ne jamais manquer un rendez-vous important.",
    icon: Zap
  },
  {
    title: "Récompenses et conseils",
    description: "Gagnez des points et recevez des conseils personnalisés pour vos animaux.",
    icon: Gift
  }
];

const testimonials = [
  {
    content: "Cette plateforme a révolutionné la façon dont je gère la santé de mes chats. Les rappels automatiques et le suivi sont incroyablement utiles !",
    name: "Marie Dubois",
    role: "Propriétaire de 3 chats",
    avatar: "/avatars/avatar-1.jpg"
  },
  {
    content: "En tant que vétérinaire, je recommande cette plateforme à tous mes clients. Elle facilite grandement le suivi et la communication.",
    name: "Dr. Pierre Martin",
    role: "Vétérinaire",
    avatar: "/avatars/avatar-2.jpg"
  },
  {
    content: "Un outil indispensable pour mon élevage. La gestion des vaccins et des rendez-vous n'a jamais été aussi simple !",
    name: "Sophie Laurent",
    role: "Éleveuse canine",
    avatar: "/avatars/avatar-3.jpg"
  }
];

const pricingPlans = [
  {
    name: "Gratuit",
    price: 0,
    features: [
      "1 animal",
      "Suivi de base",
      "Rappels de rendez-vous",
      "Support par email",
      "Application mobile"
    ]
  },
  {
    name: "Pro",
    price: 9.99,
    popular: true,
    features: [
      "5 animaux",
      "Suivi avancé",
      "Partage avec les vétérinaires",
      "Support prioritaire",
      "Historique illimité",
      "Analyses et rapports"
    ]
  },
  {
    name: "Business",
    price: 29.99,
    features: [
      "Animaux illimités",
      "Fonctionnalités pro",
      "API d'intégration",
      "Support dédié 24/7",
      "Personnalisation avancée",
      "Formation dédiée"
    ]
  }
]; 