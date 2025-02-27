"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Separator } from "../ui/separator";
import {
  Image,
  Table2,
  FileText,
  Paperclip,
  FileImage,
  Edit,
  HeartPulse
} from "lucide-react";
import { ReportTemplate } from "./report-generator";
import { AnimalDiagram } from "./animal-diagram";

interface AnimalData {
  id: string;
  name: string;
  species: string;
  breed: string;
  age: string;
  weight: string;
  sex: string;
  owner: string;
}

// Données simulées pour les exemples
const MOCK_ANIMAL: AnimalData = {
  id: "ANI-12345",
  name: "Rex",
  species: "Chien",
  breed: "Berger Allemand",
  age: "5 ans",
  weight: "32 kg",
  sex: "Mâle",
  owner: "Jean Dupont"
};

interface ReportEditorProps {
  template: ReportTemplate;
  reportData: Record<string, any>;
  setReportData: (data: Record<string, any>) => void;
}

export function ReportEditor({ template, reportData, setReportData }: ReportEditorProps) {
  const [activeTab, setActiveTab] = useState("content");
  const [animalData, setAnimalData] = useState<AnimalData>(MOCK_ANIMAL);
  const [title, setTitle] = useState(template.name);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [includeHeader, setIncludeHeader] = useState(true);
  const [includeFooter, setIncludeFooter] = useState(true);
  const [includeSignature, setIncludeSignature] = useState(true);

  // Édition du contenu basé sur le type de rapport
  const renderContentEditor = () => {
    switch (template.type) {
      case "health":
        return <HealthReportEditor />;
      case "surgery":
        return <SurgeryReportEditor />;
      case "behavior":
        return <BehaviorReportEditor />;
      case "nutrition":
        return <NutritionReportEditor />;
      case "statistics":
        return <StatisticsReportEditor />;
      default:
        return <GenericReportEditor />;
    }
  };

  // Mettre à jour les données du rapport lorsque les champs changent
  const updateReportData = () => {
    setReportData({
      ...reportData,
      title,
      date,
      animalData,
      includeHeader,
      includeFooter,
      includeSignature
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Édition du Rapport: {template.name}</CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-5 w-full">
                <TabsTrigger value="content" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>Contenu</span>
                </TabsTrigger>
                <TabsTrigger value="images" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  <span>Images</span>
                </TabsTrigger>
                <TabsTrigger value="data" className="flex items-center gap-2">
                  <Table2 className="h-4 w-4" />
                  <span>Données</span>
                </TabsTrigger>
                <TabsTrigger value="diagram" className="flex items-center gap-2">
                  <HeartPulse className="h-4 w-4" />
                  <span>Diagramme</span>
                </TabsTrigger>
                <TabsTrigger value="attachments" className="flex items-center gap-2">
                  <Paperclip className="h-4 w-4" />
                  <span>Pièces jointes</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="mt-6 space-y-6">
                {renderContentEditor()}
              </TabsContent>

              <TabsContent value="images" className="mt-6">
                <ImageUploader />
              </TabsContent>

              <TabsContent value="data" className="mt-6">
                <DataTableEditor />
              </TabsContent>

              <TabsContent value="diagram" className="mt-6">
                <AnimalDiagram />
              </TabsContent>

              <TabsContent value="attachments" className="mt-6">
                <AttachmentsEditor />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations</CardTitle>
            <CardDescription>Détails du rapport et du patient</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titre du rapport</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  updateReportData();
                }}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date du rapport</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  updateReportData();
                }}
              />
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">Informations patient</div>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Modifier
                </Button>
              </div>

              <div className="text-sm space-y-1 mt-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ID:</span>
                  <span>{animalData.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nom:</span>
                  <span>{animalData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Espèce:</span>
                  <span>{animalData.species}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Race:</span>
                  <span>{animalData.breed}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Âge:</span>
                  <span>{animalData.age}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Poids:</span>
                  <span>{animalData.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sexe:</span>
                  <span>{animalData.sex}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Propriétaire:</span>
                  <span>{animalData.owner}</span>
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="font-medium">Options de mise en page</h3>

              <div className="flex items-center justify-between">
                <Label htmlFor="include-header">Inclure l&apos;en-tête</Label>
                <Switch
                  id="include-header"
                  checked={includeHeader}
                  onCheckedChange={(checked) => {
                    setIncludeHeader(checked);
                    updateReportData();
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="include-footer">Inclure le pied de page</Label>
                <Switch
                  id="include-footer"
                  checked={includeFooter}
                  onCheckedChange={(checked) => {
                    setIncludeFooter(checked);
                    updateReportData();
                  }}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="include-signature">Inclure la signature</Label>
                <Switch
                  id="include-signature"
                  checked={includeSignature}
                  onCheckedChange={(checked) => {
                    setIncludeSignature(checked);
                    updateReportData();
                  }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aperçu</CardTitle>
            <CardDescription>Prévisualisation du rapport</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center">
              <Button variant="outline">
                <FileImage className="h-4 w-4 mr-2" />
                Générer l&apos;aperçu
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Composants spécifiques pour les différents types de rapports
function HealthReportEditor() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="symptoms">Symptômes</Label>
        <Textarea id="symptoms" placeholder="Décrivez les symptômes observés..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="examination">Examen clinique</Label>
        <Textarea id="examination" placeholder="Résultats de l'examen clinique..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="diagnosis">Diagnostic</Label>
        <Textarea id="diagnosis" placeholder="Diagnostic établi..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="treatment">Plan de traitement</Label>
        <Textarea id="treatment" placeholder="Traitement recommandé..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="follow-up">Suivi recommandé</Label>
        <Textarea id="follow-up" placeholder="Recommandations de suivi..." className="min-h-[100px]" />
      </div>
    </div>
  );
}

function SurgeryReportEditor() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="procedure">Procédure réalisée</Label>
        <Textarea id="procedure" placeholder="Détails de la procédure chirurgicale..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="anesthesia">Anesthésie</Label>
        <Textarea id="anesthesia" placeholder="Détails sur l'anesthésie utilisée..." className="min-h-[80px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="findings">Observations peropératoires</Label>
        <Textarea id="findings" placeholder="Observations durant l'intervention..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="complications">Complications</Label>
        <Textarea id="complications" placeholder="Complications éventuelles..." className="min-h-[80px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="post-op">Soins post-opératoires</Label>
        <Textarea id="post-op" placeholder="Instructions pour les soins post-opératoires..." className="min-h-[100px]" />
      </div>
    </div>
  );
}

function BehaviorReportEditor() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="history">Historique comportemental</Label>
        <Textarea id="history" placeholder="Historique comportemental de l'animal..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="observation">Observations</Label>
        <Textarea id="observation" placeholder="Observations comportementales..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="assessment">Évaluation</Label>
        <Textarea id="assessment" placeholder="Évaluation du comportement..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recommendations">Recommandations</Label>
        <Textarea id="recommendations" placeholder="Recommandations pour l'amélioration du comportement..." className="min-h-[100px]" />
      </div>
    </div>
  );
}

function NutritionReportEditor() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="current-diet">Régime alimentaire actuel</Label>
        <Textarea id="current-diet" placeholder="Détails sur l'alimentation actuelle..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="nutritional-assessment">Évaluation nutritionnelle</Label>
        <Textarea id="nutritional-assessment" placeholder="Évaluation de l'état nutritionnel..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="recommended-diet">Régime alimentaire recommandé</Label>
        <Textarea id="recommended-diet" placeholder="Recommandations sur l'alimentation..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="feeding-schedule">Programme d&apos;alimentation</Label>
        <Textarea id="feeding-schedule" placeholder="Détails sur les horaires et quantités..." className="min-h-[100px]" />
      </div>
    </div>
  );
}

function StatisticsReportEditor() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="period">Période d&apos;analyse</Label>
        <div className="grid grid-cols-2 gap-4">
          <Input id="period-start" type="date" placeholder="Date de début" />
          <Input id="period-end" type="date" placeholder="Date de fin" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="key-metrics">Métriques clés</Label>
        <Textarea id="key-metrics" placeholder="Résumé des métriques importantes..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="patient-stats">Statistiques des patients</Label>
        <Textarea id="patient-stats" placeholder="Analyse des données patients..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="financial">Données financières</Label>
        <Textarea id="financial" placeholder="Résumé des données financières..." className="min-h-[100px]" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="conclusions">Conclusions et recommandations</Label>
        <Textarea id="conclusions" placeholder="Conclusions basées sur les données..." className="min-h-[100px]" />
      </div>
    </div>
  );
}

function GenericReportEditor() {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="content">Contenu du rapport</Label>
        <Textarea id="content" placeholder="Contenu du rapport..." className="min-h-[300px]" />
      </div>
    </div>
  );
}

// Composants supplémentaires pour l'édition du rapport
function ImageUploader() {
  return (
    <div className="space-y-6">
      <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
        <FileImage className="h-10 w-10 text-muted-foreground mb-2" />
        <h3 className="font-medium mb-1">Déposez vos images ici</h3>
        <p className="text-sm text-muted-foreground text-center mb-3">
          PNG, JPG ou GIF jusqu&apos;à 10 MB
        </p>
        <Button variant="secondary">Sélectionner des fichiers</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* Espace pour afficher les images téléchargées */}
      </div>
    </div>
  );
}

function DataTableEditor() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Ajouter des tableaux de données</h3>
        <Button size="sm">
          <Table2 className="h-4 w-4 mr-2" />
          Nouveau tableau
        </Button>
      </div>

      <div className="border rounded-md p-6 flex flex-col items-center justify-center h-[200px]">
        <Table2 className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground text-center">
          Aucun tableau de données ajouté.
          <br />
          Cliquez sur &quot;Nouveau tableau&quot; pour commencer.
        </p>
      </div>
    </div>
  );
}

function AttachmentsEditor() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">Pièces jointes</h3>
        <Button size="sm">
          <Paperclip className="h-4 w-4 mr-2" />
          Ajouter
        </Button>
      </div>

      <div className="border rounded-md p-6 flex flex-col items-center justify-center h-[200px]">
        <Paperclip className="h-10 w-10 text-muted-foreground mb-2" />
        <p className="text-muted-foreground text-center">
          Aucune pièce jointe.
          <br />
          Cliquez sur &quot;Ajouter&quot; pour joindre des documents.
        </p>
      </div>
    </div>
  );
} 