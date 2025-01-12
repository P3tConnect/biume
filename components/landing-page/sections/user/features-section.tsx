import { Heart, Calendar, Camera, Bell } from "lucide-react";

const userFeatures = [
  {
    title: "Suivi santé",
    description: "Gardez un œil sur la santé de votre animal avec des rappels personnalisés.",
    icon: Heart
  },
  {
    title: "Rendez-vous",
    description: "Gérez tous les rendez-vous vétérinaires en un seul endroit.",
    icon: Calendar
  },
  {
    title: "Journal photo",
    description: "Capturez et partagez les moments précieux de votre compagnon.",
    icon: Camera
  },
  {
    title: "Notifications",
    description: "Recevez des alertes importantes concernant votre animal.",
    icon: Bell
  }
];

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-accent/5 to-background"></div>
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">
            Tout ce dont votre animal a besoin
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground">
            Des outils simples et intuitifs pour prendre soin de votre compagnon au quotidien
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
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
      </div>
    </section>
  );
} 