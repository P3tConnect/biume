import { HeroSection } from "./_components/hero-section"
import { Milestone, RoadmapSection } from "./_components/roadmap-section"

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
]

const RoadmapPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <HeroSection />
      <RoadmapSection milestones={roadmapItems} />
    </div>
  )
}

export default RoadmapPage
