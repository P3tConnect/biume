import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { features } from "./data";
import { CredenzaDescription } from "@/components/ui";
import { CredenzaTitle } from "@/components/ui";
import { CredenzaHeader, CredenzaTrigger } from "@/components/ui";
import { Credenza } from "@/components/ui";
import { CredenzaContent } from "@/components/ui";

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
          {features.map((feature, index) => (
            <Credenza key={index}>
              <CredenzaTrigger asChild>
                <div className="group relative bg-gradient-to-br from-background to-accent/5 p-8 rounded-2xl border hover:border-primary/50 transition-all duration-300 cursor-pointer">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-secondary/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <feature.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      {feature.title}
                      <ChevronRight className="w-4 h-4 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </CredenzaTrigger>
              <CredenzaContent className="sm:max-w-[900px] p-0 overflow-hidden grid md:grid-cols-[2fr,3fr]">
                <div className="relative md:h-full h-[200px]">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent md:hidden">
                    <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                      <feature.icon className="w-6 h-6" />
                      {feature.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-br from-background to-accent/5">
                  <CredenzaHeader className="space-y-4">
                    <CredenzaTitle className="hidden md:flex items-center gap-3 text-2xl">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-primary" />
                      </div>
                      {feature.title}
                    </CredenzaTitle>
                    <CredenzaDescription className="!mt-6 text-base leading-relaxed">
                      {feature.details}
                    </CredenzaDescription>
                  </CredenzaHeader>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-background/50 border">
                      <h4 className="font-medium mb-2">Avantages</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        {feature.title === "Réservation instantanée" && (
                          <>
                            <li>• Disponible 24h/24</li>
                            <li>• Confirmation immédiate</li>
                            <li>• Choix flexibles</li>
                          </>
                        )}
                        {feature.title === "Disponibilités en temps réel" && (
                          <>
                            <li>• Mise à jour instantanée</li>
                            <li>• Filtres avancés</li>
                          </>
                        )}
                        {feature.title === "Avis vérifiés" && (
                          <>
                            <li>• Avis authentiques</li>
                            <li>• Notes détaillées</li>
                            <li>• Retours d&apos;expérience</li>
                          </>
                        )}
                        {feature.title === "Rappels automatiques" && (
                          <>
                            <li>• SMS & Emails</li>
                            <li>• Personnalisables</li>
                            <li>• Instructions incluses</li>
                          </>
                        )}
                        {feature.title === "Paiement sécurisé" && (
                          <>
                            <li>• Multiples options</li>
                            <li>• Transactions cryptées</li>
                            <li>• Reçus automatiques</li>
                          </>
                        )}
                        {feature.title === "Suivi santé" && (
                          <>
                            <li>• Historique complet</li>
                            <li>• Documents numériques</li>
                            <li>• Partage facile</li>
                          </>
                        )}
                      </ul>
                    </div>
                    <div className="p-4 rounded-xl bg-background/50 border">
                      <h4 className="font-medium mb-2">Comment ça marche</h4>
                      <ul className="text-sm text-muted-foreground space-y-2">
                        {feature.title === "Réservation instantanée" && (
                          <>
                            <li>1. Choisissez un créneau</li>
                            <li>2. Remplissez vos infos</li>
                            <li>3. Confirmez la réservation</li>
                          </>
                        )}
                        {feature.title === "Disponibilités en temps réel" && (
                          <>
                            <li>1. Sélectionnez une date</li>
                            <li>2. Consultez les créneaux</li>
                            <li>3. Réservez directement</li>
                          </>
                        )}
                        {feature.title === "Avis vérifiés" && (
                          <>
                            <li>1. Consultez les avis</li>
                            <li>2. Filtrez par critères</li>
                            <li>3. Prenez votre décision</li>
                          </>
                        )}
                        {feature.title === "Rappels automatiques" && (
                          <>
                            <li>1. Activez les notifications</li>
                            <li>2. Choisissez le format</li>
                            <li>3. Recevez les rappels</li>
                          </>
                        )}
                        {feature.title === "Paiement sécurisé" && (
                          <>
                            <li>1. Choisissez le mode</li>
                            <li>2. Validez le paiement</li>
                            <li>3. Recevez la confirmation</li>
                          </>
                        )}
                        {feature.title === "Suivi santé" && (
                          <>
                            <li>1. Accédez au carnet</li>
                            <li>2. Consultez l&apos;historique</li>
                            <li>3. Gérez les documents</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <Button asChild size="lg" className="gap-2">
                      <a href={feature.ctaLink}>
                        {feature.cta}
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CredenzaContent>
            </Credenza>
          ))}
        </div>
      </div>
    </section>
  );
}
