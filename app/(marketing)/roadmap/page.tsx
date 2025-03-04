import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/dashboard/layout/user-nav";
import { Milestone, RoadmapSection } from "./_components/roadmap-section";
import { HeroSection } from "./_components/hero-section";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";

const roadmapItems: Milestone[] = [
  {
    date: "Q2 2025",
    title: "Lancement de la phase bêta",
    description:
      "Lancement de la phase bêta de Biume avec des fonctionnalités de base pour les professionnels de santé animale.",
    status: "in-progress",
  },
  {
    date: "Q3 2025",
    title: "Lancement de la plateforme",
    description:
      "Première version de Biume avec les fonctionnalités essentielles pour les professionnels de santé animale.",
    status: "planned",
  },
  {
    date: "Q2 2026",
    title: "Application mobile",
    description:
      "Lancement de notre application mobile pour permettre aux professionnels d'accéder à leurs données en déplacement.",
    status: "planned",
  },
];

const RoadmapPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div className="flex flex-col h-screen w-screen">
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
      <RoadmapSection milestones={roadmapItems} />
    </div>
  );
};

export default RoadmapPage;
