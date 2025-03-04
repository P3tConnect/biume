import { ArrowLeft, Building2, Heart, Shield, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/dashboard/layout/user-nav";
import { HeroSection } from "./_components/hero-section";
import { MissionSection } from "./_components/mission-section";
import { ValuesSection } from "./_components/values-section";
import { TeamSection } from "./_components/team-section";
import { Metadata } from "next/types";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

const values = [
  {
    icon: Heart,
    title: "Passion pour la santé animale",
    description: "Nous nous engageons à améliorer la vie des animaux en facilitant l'accès aux soins de qualité."
  },
  {
    icon: Shield,
    title: "Excellence et fiabilité",
    description: "Nous développons des solutions robustes et innovantes pour les professionnels de santé animale."
  },
  {
    icon: Users,
    title: "Communauté et collaboration",
    description: "Nous créons un écosystème où professionnels et propriétaires d'animaux collaborent efficacement."
  },
  {
    icon: Building2,
    title: "Innovation responsable",
    description: "Nous innovons constamment tout en respectant les normes éthiques et professionnelles du secteur."
  }
];

export const metadata: Metadata = {
  title: "À propos de Biume | Votre partenaire en santé animale",
  description: "Découvrez notre mission, nos valeurs et notre équipe chez Biume. Nous révolutionnons les soins vétérinaires grâce à des solutions numériques innovantes.",
  keywords: ["santé animale", "innovation", "soins animaux", "Biume", "logiciel", "ostéopathe animalier", "vétérinaire", "vétérinaire à proximité", "vétérinaire autour de moi"],
  openGraph: {
    title: "À propos de Biume | Votre partenaire en santé animale",
    description: "Découvrez notre mission, nos valeurs et notre équipe chez Biume. Nous révolutionnons les soins vétérinaires grâce à des solutions numériques innovantes.",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og-image-about.png",
        width: 1200,
        height: 630,
        alt: "À propos de Biume"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos de Biume | Votre partenaire en santé animale",
    description: "Découvrez notre mission, nos valeurs et notre équipe chez Biume. Nous révolutionnons les soins vétérinaires grâce à des solutions numériques innovantes."
  }
}

const AboutPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  return (
    <div className="flex flex-col h-screen w-screen overflow-visible">
      {/* Header */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        {/* Bouton retour */}
        <Button variant="ghost" asChild className="group">
          <Link href="/" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            <span>Retour à l&apos;accueil</span>
          </Link>
        </Button>

        {/* Navigation utilisateur ou boutons connexion/inscription */}
        <div className="flex items-center gap-4">
          {session ? (
            <UserNav />
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/sign-in">Connexion</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-up">Inscription</Link>
              </Button>
            </>
          )}
        </div>
      </div>

      <HeroSection />
      <MissionSection />
      <ValuesSection values={values} />
      <TeamSection />
    </div>
  );
};

export default AboutPage;