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
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Plus,
  Pencil,
  Copy,
  Trash2,
  MoveDown,
  MoveUp,
  Layout,
  Save,
  FileText,
  CheckCircle
} from "lucide-react";

import { ReportType } from "./report-generator";

interface TemplateElement {
  id: string;
  type: "text" | "textarea" | "image" | "table" | "checkbox" | "date";
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[];
}

interface TemplateSection {
  id: string;
  title: string;
  elements: TemplateElement[];
}

export function TemplateBuilder() {
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [templateType, setTemplateType] = useState<ReportType>("health");
  const [sections, setSections] = useState<TemplateSection[]>([
    {
      id: "section-1",
      title: "Nouvelle section",
      elements: []
    }
  ]);
  const [activeSection, setActiveSection] = useState(0);
  const [showElementEditor, setShowElementEditor] = useState(false);
  const [currentElement, setCurrentElement] = useState<TemplateElement | null>(null);
  const [currentElementIndex, setCurrentElementIndex] = useState<number | null>(null);

  // Ajouter une nouvelle section
  const addSection = () => {
    setSections([
      ...sections,
      {
        id: `section-${sections.length + 1}`,
        title: `Nouvelle section ${sections.length + 1}`,
        elements: []
      }
    ]);
    setActiveSection(sections.length);
  };

  // Supprimer une section
  const deleteSection = (index: number) => {
    if (sections.length === 1) return;

    const newSections = [...sections];
    newSections.splice(index, 1);
    setSections(newSections);

    if (activeSection >= newSections.length) {
      setActiveSection(newSections.length - 1);
    }
  };

  // Mettre à jour le titre d'une section
  const updateSectionTitle = (index: number, title: string) => {
    const newSections = [...sections];
    newSections[index].title = title;
    setSections(newSections);
  };

  // Ajouter un nouvel élément dans la section active
  const addElement = (type: TemplateElement["type"]) => {
    const newElement: TemplateElement = {
      id: `element-${Date.now()}`,
      type,
      label: `Nouvel élément ${type}`,
      placeholder: "",
      required: false,
      options: type === "checkbox" ? ["Option 1", "Option 2"] : undefined
    };

    setCurrentElement(newElement);
    setCurrentElementIndex(null);
    setShowElementEditor(true);
  };

  // Éditer un élément existant
  const editElement = (element: TemplateElement, index: number) => {
    setCurrentElement({ ...element });
    setCurrentElementIndex(index);
    setShowElementEditor(true);
  };

  // Sauvegarder l'élément en cours d'édition
  const saveElement = () => {
    if (!currentElement) return;

    const newSections = [...sections];

    if (currentElementIndex !== null) {
      // Mise à jour d'un élément existant
      newSections[activeSection].elements[currentElementIndex] = currentElement;
    } else {
      // Ajout d'un nouvel élément
      newSections[activeSection].elements.push(currentElement);
    }

    setSections(newSections);
    setShowElementEditor(false);
    setCurrentElement(null);
    setCurrentElementIndex(null);
  };

  // Supprimer un élément
  const deleteElement = (index: number) => {
    const newSections = [...sections];
    newSections[activeSection].elements.splice(index, 1);
    setSections(newSections);
  };

  // Déplacer un élément vers le haut
  const moveElementUp = (index: number) => {
    if (index === 0) return;

    const newSections = [...sections];
    const element = newSections[activeSection].elements[index];
    newSections[activeSection].elements.splice(index, 1);
    newSections[activeSection].elements.splice(index - 1, 0, element);
    setSections(newSections);
  };

  // Déplacer un élément vers le bas
  const moveElementDown = (index: number) => {
    if (index === sections[activeSection].elements.length - 1) return;

    const newSections = [...sections];
    const element = newSections[activeSection].elements[index];
    newSections[activeSection].elements.splice(index, 1);
    newSections[activeSection].elements.splice(index + 1, 0, element);
    setSections(newSections);
  };

  // Enregistrer le modèle
  const saveTemplate = () => {
    const template = {
      name: templateName,
      description: templateDescription,
      type: templateType,
      sections
    };

    console.log("Modèle sauvegardé:", template);
    // Ici vous pourriez appeler une API pour sauvegarder le modèle
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Informations du modèle</CardTitle>
            <CardDescription>
              Définissez les détails de base de votre modèle de rapport
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="template-name">Nom du modèle</Label>
              <Input
                id="template-name"
                placeholder="Ex: Bilan de santé annuel"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-desc">Description</Label>
              <Textarea
                id="template-desc"
                placeholder="Décrivez l'utilisation de ce modèle..."
                className="min-h-[100px]"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="template-type">Type de rapport</Label>
              <RadioGroup
                defaultValue="health"
                value={templateType}
                onValueChange={(value) => setTemplateType(value as ReportType)}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="health" id="health" />
                  <Label htmlFor="health">Santé</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="surgery" id="surgery" />
                  <Label htmlFor="surgery">Chirurgie</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="behavior" id="behavior" />
                  <Label htmlFor="behavior">Comportement</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="nutrition" id="nutrition" />
                  <Label htmlFor="nutrition">Nutrition</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="statistics" id="statistics" />
                  <Label htmlFor="statistics">Statistiques</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Structure du modèle</CardTitle>
            <CardDescription>
              Organisez vos sections et ajoutez des éléments
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Sections</h3>
              <Button size="sm" onClick={addSection}>
                <Plus className="h-4 w-4 mr-2" />
                Ajouter
              </Button>
            </div>

            <div className="space-y-2">
              {sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`border rounded-md p-3 flex items-center justify-between cursor-pointer
                             ${activeSection === index ? "bg-muted" : ""}`}
                  onClick={() => setActiveSection(index)}
                >
                  <div className="flex items-center">
                    <Layout className="h-4 w-4 text-muted-foreground mr-2" />
                    <span>{section.title}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => deleteSection(index)} disabled={sections.length === 1}>
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={saveTemplate}>
              <Save className="h-4 w-4 mr-2" />
              Enregistrer le modèle
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="col-span-1 lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Édition de la section</CardTitle>
                <CardDescription>
                  Personnalisez votre section et ajoutez des éléments
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => addElement("text")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Texte
                </Button>
                <Button variant="outline" size="sm" onClick={() => addElement("textarea")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Zone de texte
                </Button>
                <Button variant="outline" size="sm" onClick={() => addElement("image")}>
                  <Plus className="h-4 w-4 mr-2" />
                  Image
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="section-title">Titre de la section</Label>
              <Input
                id="section-title"
                value={sections[activeSection].title}
                onChange={(e) => updateSectionTitle(activeSection, e.target.value)}
              />
            </div>

            <div className="space-y-4">
              <h3 className="font-medium">Éléments de la section</h3>

              {sections[activeSection].elements.length === 0 ? (
                <div className="border rounded-md p-6 text-center">
                  <FileText className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                  <h4 className="mb-1 font-medium">Aucun élément</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Commencez par ajouter des éléments à cette section
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="sm" onClick={() => addElement("text")}>
                      Texte
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addElement("textarea")}>
                      Zone de texte
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addElement("image")}>
                      Image
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {sections[activeSection].elements.map((element, index) => (
                    <div key={element.id} className="border rounded-md p-3 flex items-center justify-between">
                      <div>
                        <div className="font-medium">{element.label}</div>
                        <div className="text-sm text-muted-foreground">
                          Type: {element.type} {element.required && "· Requis"}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" onClick={() => moveElementUp(index)} disabled={index === 0}>
                          <MoveUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => moveElementDown(index)} disabled={index === sections[activeSection].elements.length - 1}>
                          <MoveDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => editElement(element, index)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => deleteElement(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {showElementEditor && currentElement && (
          <Card>
            <CardHeader>
              <CardTitle>Édition de l&apos;élément</CardTitle>
              <CardDescription>
                Personnalisez les propriétés de cet élément
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="element-label">Libellé</Label>
                <Input
                  id="element-label"
                  value={currentElement.label}
                  onChange={(e) => setCurrentElement({ ...currentElement, label: e.target.value })}
                />
              </div>

              {(currentElement.type === "text" || currentElement.type === "textarea") && (
                <div className="space-y-2">
                  <Label htmlFor="element-placeholder">Texte d&apos;aide (placeholder)</Label>
                  <Input
                    id="element-placeholder"
                    value={currentElement.placeholder || ""}
                    onChange={(e) => setCurrentElement({ ...currentElement, placeholder: e.target.value })}
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="required"
                  checked={currentElement.required}
                  onCheckedChange={(checked) => setCurrentElement({ ...currentElement, required: checked })}
                />
                <Label htmlFor="required">Champ obligatoire</Label>
              </div>

              {currentElement.type === "checkbox" && currentElement.options && (
                <div className="space-y-2">
                  <Label>Options</Label>
                  {currentElement.options.map((option, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...currentElement.options!];
                          newOptions[index] = e.target.value;
                          setCurrentElement({ ...currentElement, options: newOptions });
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          const newOptions = [...currentElement.options!];
                          newOptions.splice(index, 1);
                          setCurrentElement({ ...currentElement, options: newOptions });
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newOptions = [...currentElement.options!, `Option ${currentElement.options!.length + 1}`];
                      setCurrentElement({ ...currentElement, options: newOptions });
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Ajouter une option
                  </Button>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowElementEditor(false)}>
                Annuler
              </Button>
              <Button onClick={saveElement}>
                <CheckCircle className="h-4 w-4 mr-2" />
                Enregistrer
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
} 