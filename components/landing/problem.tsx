import BlurFade from "@/components/blur-fade";
import Section from "@/components/landing/section";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Shield, Zap } from "lucide-react";

const problems = [
  {
    title: "Optimisation du temps de travail",
    description:
      "Nous nous sommes rendus comptes que beaucoup de professionnels du secteur animalier n'ont pas ou n'utilisent pas d'outils pour gérer leurs entreprises et la relation client.",
    icon: Brain,
  },
  {
    title: "Un outil tout-en-un",
    description:
      "Beaucoup d'entreprises du secteur, la plupart du temps, utilisent des outils divers et variés pour différentes tâches.",
    icon: Zap,
  },
  {
    title: "Sécurité des données",
    description:
      "Ajouté à cela, les documents qui sont rédigés sont souvent en l'état sur l'ordinateur et peuvent êtres perdus ou endommagés.",
    icon: Shield,
  },
];

export default function Problem() {
  return (
    <Section title="Problèmes" subtitle="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {problems.map((problem, index) => (
          <BlurFade key={index} delay={0.2 + index * 0.2} inView>
            <Card className="bg-background border-none shadow-none">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                  <problem.icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">{problem.title}</h3>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          </BlurFade>
        ))}
      </div>
    </Section>
  );
}
