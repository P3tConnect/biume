"use client";

import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "../ui/tabs";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Slider } from "../ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "../ui/tooltip";
import {
  Dog,
  Cat,
  Squirrel,
  Rabbit,
  Bird,
  Save,
  Info,
  Download,
  RotateCcw,
  X,
  Plus,
  Eye,
  ImageIcon
} from "lucide-react";

import { Badge } from "../ui/badge";
import { Switch } from "../ui/switch";

type AnimalType = "dog" | "cat" | "horse" | "rabbit" | "bird" | "exotic";
type ViewType = "lateral" | "frontal" | "dorsal" | "skeletal" | "muscular" | "organs";
type SymptomSeverity = "mild" | "moderate" | "severe";

interface Symptom {
  id: string;
  name: string;
  description: string;
  color: string;
  severity: SymptomSeverity;
}

interface SelectedArea {
  id: string;
  zoneId: string;
  zoneName: string;
  symptomId: string;
  notes?: string;
}

export function AnimalDiagram() {
  const [animalType, setAnimalType] = useState<AnimalType>("dog");
  const [viewType, setViewType] = useState<ViewType>("skeletal");
  const [viewPerspective, setViewPerspective] = useState<"lateral" | "frontal" | "dorsal">("lateral");
  const [useRealisticView, setUseRealisticView] = useState<boolean>(true);
  const [currentSymptom, setCurrentSymptom] = useState<string | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<SelectedArea[]>([]);
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [areaNote, setAreaNote] = useState<string>("");
  const [symptoms, setSymptoms] = useState<Symptom[]>([
    {
      id: "pain",
      name: "Douleur",
      description: "Zone douloureuse au toucher",
      color: "#ef4444",
      severity: "moderate"
    },
    {
      id: "inflammation",
      name: "Inflammation",
      description: "Inflammation visible ou palpable",
      color: "#f97316",
      severity: "moderate"
    },
    {
      id: "restriction",
      name: "Restriction",
      description: "Restriction de mobilité",
      color: "#8b5cf6",
      severity: "severe"
    },
    {
      id: "tension",
      name: "Tension",
      description: "Tension musculaire ou ligamentaire",
      color: "#ec4899",
      severity: "moderate"
    },
    {
      id: "lesion",
      name: "Lésion",
      description: "Lésion ostéopathique",
      color: "#10b981",
      severity: "moderate"
    }
  ]);

  const svgRef = useRef<SVGSVGElement | null>(null);
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [svgLoaded, setSvgLoaded] = useState<boolean>(false);

  // Chargement du schéma SVG en fonction du type d'animal et de la vue
  useEffect(() => {
    const loadSvg = async () => {
      try {
        setSvgLoaded(false);
        // Construire le chemin en fonction du type de vue (réaliste ou simplifiée)
        const fileSuffix = useRealisticView && animalType === "dog" && viewType === "skeletal" && viewPerspective === "lateral"
          ? "-realistic"
          : "";
        const response = await fetch(`/images/animals/${animalType}/${viewType}/${viewPerspective}${fileSuffix}.svg`);

        if (!response.ok) {
          // Si la vue réaliste n'est pas disponible, essayer la vue simplifiée
          if (useRealisticView && fileSuffix === "-realistic") {
            const fallbackResponse = await fetch(`/images/animals/${animalType}/${viewType}/${viewPerspective}.svg`);
            if (fallbackResponse.ok) {
              const svgText = await fallbackResponse.text();
              setSvgContent(svgText);
              setSvgLoaded(true);
              return;
            }
          }
          throw new Error(`Failed to load SVG: ${response.status}`);
        }

        const svgText = await response.text();
        setSvgContent(svgText);
        setSvgLoaded(true);
      } catch (error) {
        console.error("Error loading SVG:", error);
        // Utilisation d'un SVG de fallback ou d'un message d'erreur
        setSvgContent(`<svg width="800" height="400" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg">
          <text x="400" y="200" font-family="Arial" font-size="20" text-anchor="middle">
            Schéma non disponible pour ${animalType} - ${viewType} - ${viewPerspective}${useRealisticView ? " (vue réaliste)" : ""}
          </text>
        </svg>`);
        setSvgLoaded(true);
      }
    };

    loadSvg();
  }, [animalType, viewType, viewPerspective, useRealisticView]);

  // Initialisation des gestionnaires d'événements après le chargement du SVG
  useEffect(() => {
    if (svgLoaded && svgRef.current) {
      const svgElement = svgRef.current;

      // Trouver tous les éléments avec la classe "skeletal-zone"
      const zoneElements = svgElement.querySelectorAll(".skeletal-zone");

      // Ajouter les gestionnaires d'événements à chaque zone
      zoneElements.forEach((zone) => {
        // Modifier le style pour montrer que c'est cliquable
        zone.setAttribute("style", "cursor: pointer;");

        // Gestionnaire de clic
        zone.addEventListener("click", (e) => {
          e.stopPropagation();
          if (!currentSymptom) {
            alert("Veuillez d'abord sélectionner un symptôme");
            return;
          }

          const zoneId = zone.id;
          const zoneName = zone.getAttribute("data-name") || zone.id;

          // Vérifier si cette zone a déjà ce symptôme
          const existingAreaIndex = selectedAreas.findIndex(
            area => area.zoneId === zoneId && area.symptomId === currentSymptom
          );

          if (existingAreaIndex >= 0) {
            // Si la zone a déjà ce symptôme, la supprimer
            const newSelectedAreas = [...selectedAreas];
            newSelectedAreas.splice(existingAreaIndex, 1);
            setSelectedAreas(newSelectedAreas);
          } else {
            // Sinon, ajouter la nouvelle zone
            const newArea: SelectedArea = {
              id: `area-${Date.now()}`,
              zoneId,
              zoneName,
              symptomId: currentSymptom,
              notes: ""
            };
            setSelectedAreas([...selectedAreas, newArea]);
            setSelectedAreaId(newArea.id);
            setAreaNote("");
          }
        });

        // Gestionnaire de survol
        zone.addEventListener("mouseenter", () => {
          if (currentSymptom) {
            zone.setAttribute("data-original-fill", zone.getAttribute("fill") || "none");
            zone.querySelectorAll("path, circle, ellipse, rect, line").forEach((el) => {
              el.setAttribute("data-original-stroke", el.getAttribute("stroke") || "black");
              el.setAttribute("stroke", "#3b82f6");  // Couleur de survol en bleu
              el.setAttribute("stroke-width", "3");
            });
          }
        });

        // Gestionnaire de fin de survol
        zone.addEventListener("mouseleave", () => {
          if (currentSymptom) {
            zone.querySelectorAll("path, circle, ellipse, rect, line").forEach((el) => {
              el.setAttribute("stroke", el.getAttribute("data-original-stroke") || "black");
              el.setAttribute("stroke-width", el.getAttribute("data-original-stroke-width") || "2");
            });
          }
        });
      });

      return () => {
        // Nettoyer les gestionnaires d'événements lors du démontage
        zoneElements.forEach((zone) => {
          zone.removeEventListener("click", () => { });
          zone.removeEventListener("mouseenter", () => { });
          zone.removeEventListener("mouseleave", () => { });
        });
      };
    }
  }, [svgLoaded, svgRef, currentSymptom, selectedAreas]);

  // Mettre à jour les zones colorées quand selectedAreas change
  useEffect(() => {
    if (svgLoaded && svgRef.current) {
      const svgElement = svgRef.current;

      // Réinitialiser toutes les zones à leur état d'origine
      const zoneElements = svgElement.querySelectorAll(".skeletal-zone");
      zoneElements.forEach((zone) => {
        zone.querySelectorAll("path, circle, ellipse, rect, line").forEach((el) => {
          el.setAttribute("fill", "none");
          el.setAttribute("data-symptom", "");
        });
      });

      // Appliquer les couleurs pour les zones sélectionnées
      selectedAreas.forEach((selectedArea) => {
        const symptom = symptoms.find(s => s.id === selectedArea.symptomId);
        if (symptom) {
          const zoneElement = svgElement.getElementById(selectedArea.zoneId);
          if (zoneElement) {
            zoneElement.querySelectorAll("path, circle, ellipse, rect").forEach((el) => {
              // Appliquer une couleur semi-transparente
              el.setAttribute("fill", `${symptom.color}80`);
              el.setAttribute("data-symptom", symptom.id);
            });
          }
        }
      });
    }
  }, [selectedAreas, symptoms, svgLoaded]);

  // Gestionnaire pour ajouter/mettre à jour une note
  const handleSaveNote = () => {
    if (selectedAreaId) {
      setSelectedAreas(areas =>
        areas.map(area =>
          area.id === selectedAreaId ? { ...area, notes: areaNote } : area
        )
      );
      setSelectedAreaId(null);
      setAreaNote("");
    }
  };

  // Réinitialisation du diagramme
  const resetDiagram = () => {
    setSelectedAreas([]);
    setSelectedAreaId(null);
    setAreaNote("");
  };

  // Exportation du diagramme
  const exportDiagram = () => {
    if (!svgRef.current) return;

    // Créer une copie du SVG pour l'exportation
    const svgCopy = svgRef.current.cloneNode(true) as SVGSVGElement;

    // Ajouter des légendes et des informations au SVG avant l'exportation
    const legendGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    legendGroup.setAttribute("transform", "translate(20, 330)");

    // Titre de la légende
    const legendTitle = document.createElementNS("http://www.w3.org/2000/svg", "text");
    legendTitle.setAttribute("x", "0");
    legendTitle.setAttribute("y", "0");
    legendTitle.setAttribute("font-family", "Arial");
    legendTitle.setAttribute("font-size", "14");
    legendTitle.setAttribute("font-weight", "bold");
    legendTitle.textContent = "Légende:";
    legendGroup.appendChild(legendTitle);

    // Éléments de la légende
    const uniqueSymptoms = [...new Set(selectedAreas.map(area => area.symptomId))];
    uniqueSymptoms.forEach((symptomId, index) => {
      const symptom = symptoms.find(s => s.id === symptomId);
      if (symptom) {
        // Cercle de couleur
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", "10");
        circle.setAttribute("cy", (20 + index * 20).toString());
        circle.setAttribute("r", "6");
        circle.setAttribute("fill", symptom.color);
        legendGroup.appendChild(circle);

        // Texte de légende
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", "25");
        text.setAttribute("y", (24 + index * 20).toString());
        text.setAttribute("font-family", "Arial");
        text.setAttribute("font-size", "12");
        text.textContent = symptom.name;
        legendGroup.appendChild(text);
      }
    });

    svgCopy.appendChild(legendGroup);

    // Convertir SVG en URL de données
    const svgData = new XMLSerializer().serializeToString(svgCopy);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    // Créer un élément canvas pour la conversion en PNG
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");

    // Créer une image à partir du SVG
    const img = new Image();
    img.onload = () => {
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);

        // Convertir canvas en URL de données pour le téléchargement
        const pngUrl = canvas.toDataURL("image/png");

        // Créer un lien pour télécharger l'image
        const link = document.createElement("a");
        link.download = `${animalType}-${viewType}-diagram.png`;
        link.href = pngUrl;
        link.click();

        // Nettoyer
        URL.revokeObjectURL(svgUrl);
      }
    };
    img.src = svgUrl;
  };

  // Récupération des données pour le rapport
  const getDiagramData = () => {
    return {
      animalType,
      viewType,
      viewPerspective,
      useRealisticView,
      selectedAreas,
      symptoms
    };
  };

  // Fonction pour supprimer une zone sélectionnée
  const removeSelectedArea = (areaId: string) => {
    setSelectedAreas(areas => areas.filter(area => area.id !== areaId));
    if (selectedAreaId === areaId) {
      setSelectedAreaId(null);
      setAreaNote("");
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Diagramme anatomique ostéopathique</CardTitle>
          <CardDescription>
            Sélectionnez un animal, une vue et marquez les zones concernées par des symptômes
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Sélecteurs d'animal, de vue et de perspective */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="animal-type">Type d'animal</Label>
              <Select value={animalType} onValueChange={(value) => setAnimalType(value as AnimalType)}>
                <SelectTrigger id="animal-type">
                  <SelectValue placeholder="Sélectionnez un animal" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="dog" className="flex items-center">
                    <Dog className="h-4 w-4 mr-2" /> Chien
                  </SelectItem>
                  <SelectItem value="cat">
                    <Cat className="h-4 w-4 mr-2" /> Chat
                  </SelectItem>
                  <SelectItem value="horse">
                    <Squirrel className="h-4 w-4 mr-2" /> Cheval
                  </SelectItem>
                  <SelectItem value="rabbit">
                    <Rabbit className="h-4 w-4 mr-2" /> Lapin
                  </SelectItem>
                  <SelectItem value="bird">
                    <Bird className="h-4 w-4 mr-2" /> Oiseau
                  </SelectItem>
                  <SelectItem value="exotic">Exotique</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="view-type">Type de vue</Label>
              <Select value={viewType} onValueChange={(value) => setViewType(value as ViewType)}>
                <SelectTrigger id="view-type">
                  <SelectValue placeholder="Sélectionnez une vue" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skeletal">Squelette</SelectItem>
                  <SelectItem value="muscular">Système musculaire</SelectItem>
                  <SelectItem value="organs">Organes internes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="view-perspective">Perspective</Label>
              <Select value={viewPerspective} onValueChange={(value) => setViewPerspective(value as "lateral" | "frontal" | "dorsal")}>
                <SelectTrigger id="view-perspective">
                  <SelectValue placeholder="Sélectionnez une perspective" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lateral">Vue latérale</SelectItem>
                  <SelectItem value="frontal">Vue frontale</SelectItem>
                  <SelectItem value="dorsal">Vue dorsale</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Option pour basculer entre vue réaliste et simplifiée */}
          <div className="flex items-center justify-between border rounded-md p-3 bg-muted/30">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-primary" />
              <div>
                <Label htmlFor="realistic-view" className="text-sm font-medium">
                  Utiliser la vue réaliste
                </Label>
                <p className="text-xs text-muted-foreground">
                  Affiche un schéma anatomique plus détaillé lorsque disponible
                </p>
              </div>
            </div>
            <Switch
              id="realistic-view"
              checked={useRealisticView}
              onCheckedChange={setUseRealisticView}
            />
          </div>

          {/* Sélecteur de symptômes */}
          <div className="space-y-2">
            <Label className="font-medium">Sélectionner un symptôme</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {symptoms.map((symptom) => (
                <div
                  key={symptom.id}
                  className={`flex items-center p-2 rounded-md border cursor-pointer
                              ${currentSymptom === symptom.id ? 'border-primary bg-primary/10' : 'border-gray-200 hover:bg-muted'}`}
                  onClick={() => setCurrentSymptom(symptom.id)}
                >
                  <div
                    className="w-4 h-4 rounded-full mr-2"
                    style={{ backgroundColor: symptom.color }}
                  />
                  <span className="text-sm">{symptom.name}</span>
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Sélectionnez d'abord un symptôme, puis cliquez sur une zone du squelette pour la marquer
            </p>
          </div>

          {/* Zone de prévisualisation SVG */}
          <div className="border rounded-lg p-4 bg-white dark:bg-gray-950">
            <div className="relative w-full" style={{ minHeight: "400px" }}>
              {svgLoaded ? (
                <div
                  ref={(ref) => {
                    if (ref && svgContent) {
                      ref.innerHTML = svgContent;
                      svgRef.current = ref.querySelector('svg');
                    }
                  }}
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ __html: svgContent || '' }}
                />
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
                  <span className="ml-3">Chargement du schéma...</span>
                </div>
              )}
            </div>
          </div>

          {/* Légende des symptômes et zones sélectionnées */}
          {selectedAreas.length > 0 && (
            <div className="mt-4 pt-4 border-t">
              <h4 className="text-sm font-medium flex items-center">
                <Info className="h-4 w-4 mr-1" />
                Zones affectées
              </h4>
              <div className="mt-2 space-y-2">
                {selectedAreas.map((area) => {
                  const symptom = symptoms.find(s => s.id === area.symptomId);
                  return (
                    <div key={area.id} className="flex items-start justify-between gap-2 bg-muted/30 p-2 rounded-md">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 mt-1 rounded-full flex-shrink-0"
                          style={{ backgroundColor: symptom?.color }}
                        />
                        <div>
                          <div className="font-medium text-sm">{area.zoneName}</div>
                          <div className="text-xs text-muted-foreground">{symptom?.name} {area.notes && `- ${area.notes}`}</div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0"
                          onClick={() => {
                            setSelectedAreaId(area.id);
                            setAreaNote(area.notes || "");
                          }}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive"
                          onClick={() => removeSelectedArea(area.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Zone d'édition des notes */}
          {selectedAreaId && (
            <div className="mt-4 border rounded-md p-3 bg-muted/20">
              <Label htmlFor="area-note" className="text-sm font-medium">
                Ajouter une note pour {selectedAreas.find(a => a.id === selectedAreaId)?.zoneName}
              </Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="area-note"
                  value={areaNote}
                  onChange={(e) => setAreaNote(e.target.value)}
                  placeholder="Décrivez les symptômes ou observations..."
                  className="flex-grow"
                />
                <Button size="sm" onClick={handleSaveNote}>Enregistrer</Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetDiagram}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Réinitialiser
            </Button>
            <Button variant="outline" onClick={exportDiagram}>
              <Download className="h-4 w-4 mr-2" />
              Exporter
            </Button>
          </div>
          <Button onClick={() => console.log("Save diagram data:", getDiagramData())}>
            <Save className="h-4 w-4 mr-2" />
            Enregistrer
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 