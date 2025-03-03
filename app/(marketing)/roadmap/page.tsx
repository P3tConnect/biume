import { Milestone, RoadmapSection } from "./_components/roadmap-section";
import { HeroSection } from "./_components/hero-section";

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
    date: "Q4 2025",
    title: "Application mobile",
    description:
      "Lancement de notre application mobile pour permettre aux professionnels d'accéder à leurs données en déplacement.",
    status: "planned",
  },
  {
    date: "Q1 2026",
    title: "Intégration des dossiers médicaux avancés",
    description:
      "Ajout de fonctionnalités avancées pour la gestion des dossiers médicaux et le suivi des patients.",
    status: "planned",
  },
  {
    date: "Q2 2026",
    title: "Système de téléconsultation",
    description:
      "Mise en place d'un système de téléconsultation pour faciliter les suivis à distance.",
    status: "planned",
  },
  {
    date: "Q3 2026",
    title: "Intelligence artificielle diagnostique",
    description:
      "Intégration d'outils d'IA pour aider au diagnostic et aux recommandations de traitement.",
    status: "planned",
  },
  {
    date: "Q4 2026",
    title: "Marketplace de services",
    description:
      "Lancement d'une marketplace permettant aux professionnels de proposer des services additionnels.",
    status: "planned",
  },
];

const RoadmapPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <HeroSection />
      <RoadmapSection milestones={roadmapItems} />
    </div>
  );
};

export default RoadmapPage;
