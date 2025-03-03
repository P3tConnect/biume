import { Building2, Heart, Shield, Users } from "lucide-react";
import { HeroSection } from "./_components/hero-section";
import { MissionSection } from "./_components/mission-section";
import { ValuesSection } from "./_components/values-section";
import { TeamSection } from "./_components/team-section";

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

const AboutPage = () => {
  return (
    <div className="flex flex-col h-screen w-screen">
      <HeroSection />
      <MissionSection />
      <ValuesSection values={values} />
      <TeamSection />
    </div>
  );
};

export default AboutPage;