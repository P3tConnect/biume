"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Search,
  FilePlus2,
  Stethoscope,
  Scissors,
  Brain,
  Apple,
  BarChart
} from "lucide-react";
import { ReportTemplate, ReportType } from "./report-generator";

// Données de modèles simulées
const MOCK_TEMPLATES: ReportTemplate[] = [
  {
    id: "health-checkup",
    name: "Bilan de santé annuel",
    type: "health",
    description: "Modèle de rapport complet pour les bilans de santé annuels des animaux",
    thumbnail: "/health-report.jpg"
  },
  {
    id: "post-surgery",
    name: "Suivi post-opératoire",
    type: "surgery",
    description: "Rapport détaillé pour le suivi des animaux après une intervention chirurgicale",
    thumbnail: "/surgery-report.jpg"
  },
  {
    id: "behavior-assessment",
    name: "Évaluation comportementale",
    type: "behavior",
    description: "Rapport pour l'analyse du comportement et recommandations personnalisées",
    thumbnail: "/behavior-report.jpg"
  },
  {
    id: "nutrition-plan",
    name: "Plan nutritionnel",
    type: "nutrition",
    description: "Modèle de rapport pour élaborer un plan alimentaire adapté",
    thumbnail: "/nutrition-report.jpg"
  },
  {
    id: "clinic-stats",
    name: "Statistiques clinique",
    type: "statistics",
    description: "Rapport de statistiques et métriques pour votre clinique",
    thumbnail: "/stats-report.jpg"
  },
  {
    id: "emergency-visit",
    name: "Visite d'urgence",
    type: "health",
    description: "Rapport détaillé pour les cas d'urgence nécessitant une intervention rapide",
    thumbnail: "/emergency-report.jpg"
  },
  {
    id: "dental-exam",
    name: "Examen dentaire",
    type: "health",
    description: "Rapport spécialisé pour les soins dentaires des animaux",
    thumbnail: "/dental-report.jpg"
  },
  {
    id: "rehabilitation",
    name: "Plan de réhabilitation",
    type: "surgery",
    description: "Modèle pour les plans de réhabilitation physique post-traumatique",
    thumbnail: "/rehab-report.jpg"
  }
];

interface ReportTemplateCardProps {
  template: ReportTemplate;
  onSelect: (template: ReportTemplate) => void;
}

const ReportTemplateCard = ({ template, onSelect }: ReportTemplateCardProps) => {
  const iconMap: Record<ReportType, React.ReactNode> = {
    health: <Stethoscope className="h-8 w-8 text-blue-500" />,
    surgery: <Scissors className="h-8 w-8 text-red-500" />,
    behavior: <Brain className="h-8 w-8 text-purple-500" />,
    nutrition: <Apple className="h-8 w-8 text-green-500" />,
    statistics: <BarChart className="h-8 w-8 text-amber-500" />
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md cursor-pointer" onClick={() => onSelect(template)}>
      <div className="h-2 bg-gradient-to-r from-primary to-primary/60"></div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          {iconMap[template.type]}
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
            <FilePlus2 className="h-4 w-4" />
          </Button>
        </div>
        <CardTitle className="text-xl mt-4">{template.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-2 min-h-[48px]">
          {template.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="pt-2 border-t bg-muted/30">
        <Button variant="outline" className="w-full" onClick={() => onSelect(template)}>
          Sélectionner
        </Button>
      </CardFooter>
    </Card>
  );
};

interface ReportTemplateSelectorProps {
  onSelect: (template: ReportTemplate) => void;
}

export function ReportTemplateSelector({ onSelect }: ReportTemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const filteredTemplates = MOCK_TEMPLATES.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === "all" || template.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Rechercher un modèle..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs value={selectedType} onValueChange={setSelectedType} className="w-full sm:w-auto">
          <TabsList className="grid grid-cols-3 sm:grid-cols-6 w-full">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="health" className="flex gap-1 items-center">
              <Stethoscope className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Santé</span>
            </TabsTrigger>
            <TabsTrigger value="surgery" className="flex gap-1 items-center">
              <Scissors className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Chirurgie</span>
            </TabsTrigger>
            <TabsTrigger value="behavior" className="flex gap-1 items-center">
              <Brain className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Comportement</span>
            </TabsTrigger>
            <TabsTrigger value="nutrition" className="flex gap-1 items-center">
              <Apple className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Nutrition</span>
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex gap-1 items-center">
              <BarChart className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Statistiques</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTemplates.map((template) => (
            <ReportTemplateCard
              key={template.id}
              template={template}
              onSelect={onSelect}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3 mb-4">
            <Search className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium">Aucun modèle trouvé</h3>
          <p className="text-muted-foreground mt-1 mb-4 max-w-md">
            Nous n&apos;avons pas trouvé de modèle correspondant à votre recherche. Essayez avec d&apos;autres termes ou créez un nouveau modèle.
          </p>
          <Button onClick={() => console.log("Create new template")}>
            Créer un nouveau modèle
          </Button>
        </div>
      )}
    </div>
  );
} 