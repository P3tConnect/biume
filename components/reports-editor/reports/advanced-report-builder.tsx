"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileUp,
  Trash2,
  FileText,
  Eye,
  Save,
  PlusCircle,
  X,
  Image as ImageIcon,
  FilePenLine,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"

interface AnatomyHighlight {
  id: string
  regionId: string
  regionName: string
  color: string
  notes: string
  severity: number
}

interface AdvancedReportBuilderProps {
  orgId: string
}

export function AdvancedReportBuilder({ orgId }: AdvancedReportBuilderProps) {
  const [title, setTitle] = useState("Compte rendu détaillé du " + new Date().toLocaleDateString())
  const [selectedPetId, setSelectedPetId] = useState<string>("")
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)
  const [highlights, setHighlights] = useState<AnatomyHighlight[]>([])
  const [interventions, setInterventions] = useState<string>("")
  const [recommendations, setRecommendations] = useState<string>("")
  const [comments, setComments] = useState<string>("")
  const [previewMode, setPreviewMode] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("anatomy")
  const [activeSection, setActiveSection] = useState<string>("head")
  const [showPdfPreview, setShowPdfPreview] = useState(false)

  // Données simulées pour les régions anatomiques
  const anatomyRegions = {
    head: [
      { id: "head-ear-left", name: "Oreille gauche" },
      { id: "head-ear-right", name: "Oreille droite" },
      { id: "head-eye-left", name: "Œil gauche" },
      { id: "head-eye-right", name: "Œil droit" },
      { id: "head-nose", name: "Nez" },
      { id: "head-mouth", name: "Gueule" },
      { id: "head-teeth", name: "Dents" },
    ],
    body: [
      { id: "body-neck", name: "Cou" },
      { id: "body-chest", name: "Poitrine" },
      { id: "body-back", name: "Dos" },
      { id: "body-abdomen", name: "Abdomen" },
      { id: "body-tail", name: "Queue" },
    ],
    limbs: [
      { id: "limb-front-left", name: "Patte avant gauche" },
      { id: "limb-front-right", name: "Patte avant droite" },
      { id: "limb-rear-left", name: "Patte arrière gauche" },
      { id: "limb-rear-right", name: "Patte arrière droite" },
    ],
    internal: [
      { id: "internal-heart", name: "Cœur" },
      { id: "internal-lungs", name: "Poumons" },
      { id: "internal-liver", name: "Foie" },
      { id: "internal-kidneys", name: "Reins" },
      { id: "internal-digestive", name: "Système digestif" },
    ],
  }

  // Couleurs disponibles pour les surlignages
  const highlightColors = [
    { id: "red", name: "Rouge", hex: "#ef4444" },
    { id: "orange", name: "Orange", hex: "#f97316" },
    { id: "yellow", name: "Jaune", hex: "#eab308" },
    { id: "green", name: "Vert", hex: "#22c55e" },
    { id: "blue", name: "Bleu", hex: "#3b82f6" },
    { id: "purple", name: "Violet", hex: "#a855f7" },
  ]

  const handleAddHighlight = (regionId: string, regionName: string) => {
    // Vérifier si la région est déjà surlignée
    const existingHighlight = highlights.find(h => h.regionId === regionId)
    if (existingHighlight) return

    const newHighlight: AnatomyHighlight = {
      id: crypto.randomUUID(),
      regionId,
      regionName,
      color: highlightColors[0].id,
      notes: "",
      severity: 1,
    }
    setHighlights([...highlights, newHighlight])
  }

  const handleUpdateHighlight = (id: string, field: keyof AnatomyHighlight, value: string | number) => {
    setHighlights(highlights.map(item => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleRemoveHighlight = (id: string) => {
    setHighlights(highlights.filter(item => item.id !== id))
  }

  const handleSaveReport = () => {
    // Ici on appellerait une server action pour sauvegarder le rapport
    console.log({
      title,
      petId: selectedPetId,
      highlights,
      interventions,
      recommendations,
      comments,
    })

    // Message de succès et/ou redirection
  }

  const handleOpenAnimalSelector = () => {
    setIsAnimalCredenzaOpen(true)
  }

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode)
  }

  const togglePdfPreview = () => {
    setShowPdfPreview(!showPdfPreview)
  }

  // Fonction pour simuler le rendu de l'image avec surlignages
  const renderAnatomyImage = () => {
    return (
      <div className="relative border rounded-md aspect-square bg-slate-50 dark:bg-slate-900 overflow-hidden">
        {/* Image vectorielle simulée */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <p className="mb-2">[Image vectorielle d'un animal ici]</p>
            <p className="text-xs">Les zones sélectionnées seraient surlignées en couleur</p>
          </div>
        </div>

        {/* Exemples de surlignages */}
        {highlights.map(highlight => {
          const color = highlightColors.find(c => c.id === highlight.color)?.hex || "#ef4444"

          // Position simulée pour la démonstration
          const position = getPositionForRegion(highlight.regionId)

          return (
            <div
              key={highlight.id}
              className="absolute rounded-full border-2 flex items-center justify-center"
              style={{
                top: `${position.top}%`,
                left: `${position.left}%`,
                width: `${10 + highlight.severity * 5}%`,
                height: `${10 + highlight.severity * 5}%`,
                backgroundColor: `${color}33`,
                borderColor: color,
              }}
            >
              <span className="text-xs font-bold" style={{ color }}>
                {highlight.regionName.slice(0, 1)}
              </span>
            </div>
          )
        })}
      </div>
    )
  }

  // Position simulée pour la démonstration
  const getPositionForRegion = (regionId: string) => {
    const positions: Record<string, { top: number; left: number }> = {
      "head-ear-left": { top: 20, left: 35 },
      "head-ear-right": { top: 20, left: 65 },
      "head-eye-left": { top: 30, left: 40 },
      "head-eye-right": { top: 30, left: 60 },
      "head-nose": { top: 40, left: 50 },
      "head-mouth": { top: 50, left: 50 },
      "head-teeth": { top: 55, left: 50 },
      "body-neck": { top: 35, left: 50 },
      "body-chest": { top: 45, left: 50 },
      "body-back": { top: 40, left: 50 },
      "body-abdomen": { top: 60, left: 50 },
      "body-tail": { top: 70, left: 50 },
      "limb-front-left": { top: 60, left: 30 },
      "limb-front-right": { top: 60, left: 70 },
      "limb-rear-left": { top: 80, left: 35 },
      "limb-rear-right": { top: 80, left: 65 },
      "internal-heart": { top: 45, left: 50 },
      "internal-lungs": { top: 40, left: 50 },
      "internal-liver": { top: 55, left: 45 },
      "internal-kidneys": { top: 60, left: 50 },
      "internal-digestive": { top: 65, left: 50 },
    }

    return positions[regionId] || { top: 50, left: 50 }
  }

  const getColorNameById = (colorId: string) => {
    return highlightColors.find(c => c.id === colorId)?.name || "Rouge"
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="md:row-span-2">
        <CardHeader>
          <CardTitle>Compte rendu détaillé</CardTitle>
          <CardDescription>Créez un compte rendu complet avec anatomie interactive</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="anatomy" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span>Anatomie</span>
              </TabsTrigger>
              <TabsTrigger value="intervention" className="flex items-center gap-2">
                <FilePenLine className="h-4 w-4" />
                <span>Intervention</span>
              </TabsTrigger>
              <TabsTrigger value="recommendations" className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                <span>Recommandations</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="anatomy" className="mt-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre du compte rendu*</Label>
                    <Input
                      id="title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="Compte rendu de visite du 01/01/2023"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pet">Animal concerné*</Label>
                    <div className="flex space-x-2">
                      <Select value={selectedPetId} onValueChange={setSelectedPetId}>
                        <SelectTrigger className="flex-1">
                          <SelectValue placeholder="Sélectionner un animal" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pet-1">Rex (Chien)</SelectItem>
                          <SelectItem value="pet-2">Félix (Chat)</SelectItem>
                          <SelectItem value="pet-3">Bunny (Lapin)</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button variant="outline" size="icon" onClick={handleOpenAnimalSelector}>
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Régions sélectionnées</Label>
                      <Select value={activeSection} onValueChange={setActiveSection}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="head">Tête</SelectItem>
                          <SelectItem value="body">Corps</SelectItem>
                          <SelectItem value="limbs">Membres</SelectItem>
                          <SelectItem value="internal">Organes internes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="border rounded-md p-4 h-[360px] overflow-y-auto">
                      {anatomyRegions[activeSection as keyof typeof anatomyRegions].map(region => {
                        const isHighlighted = highlights.some(h => h.regionId === region.id)

                        return (
                          <div key={region.id} className="flex items-center justify-between py-2 border-b">
                            <div className="flex items-center">
                              <Checkbox
                                id={region.id}
                                checked={isHighlighted}
                                onCheckedChange={checked => {
                                  if (checked) {
                                    handleAddHighlight(region.id, region.name)
                                  } else {
                                    const highlight = highlights.find(h => h.regionId === region.id)
                                    if (highlight) handleRemoveHighlight(highlight.id)
                                  }
                                }}
                              />
                              <Label htmlFor={region.id} className="ml-2 cursor-pointer">
                                {region.name}
                              </Label>
                            </div>
                            {isHighlighted && (
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{
                                  backgroundColor: highlightColors.find(
                                    c => c.id === highlights.find(h => h.regionId === region.id)?.color
                                  )?.hex,
                                }}
                              />
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  {renderAnatomyImage()}

                  <div className="text-sm text-muted-foreground text-center">
                    Cliquez sur les régions dans la liste pour les surligner sur l'image
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="intervention" className="mt-6 space-y-4">
              <Label>Détails des anomalies détectées</Label>
              {highlights.length === 0 ? (
                <div className="border rounded-md p-8 flex flex-col items-center justify-center">
                  <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground text-center">
                    Aucune région anatomique sélectionnée.
                    <br />
                    Revenez à l'onglet "Anatomie" pour en ajouter.
                  </p>
                </div>
              ) : (
                <Accordion type="multiple" className="w-full">
                  {highlights.map(highlight => (
                    <AccordionItem key={highlight.id} value={highlight.id}>
                      <AccordionTrigger className="hover:no-underline">
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{
                              backgroundColor: highlightColors.find(c => c.id === highlight.color)?.hex,
                            }}
                          />
                          <span>{highlight.regionName}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-3 pt-2">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor={`color-${highlight.id}`}>Couleur</Label>
                              <Select
                                value={highlight.color}
                                onValueChange={value => handleUpdateHighlight(highlight.id, "color", value)}
                              >
                                <SelectTrigger id={`color-${highlight.id}`}>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {highlightColors.map(color => (
                                    <SelectItem key={color.id} value={color.id}>
                                      <div className="flex items-center">
                                        <div
                                          className="w-3 h-3 rounded-full mr-2"
                                          style={{ backgroundColor: color.hex }}
                                        />
                                        <span>{color.name}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor={`severity-${highlight.id}`}>Gravité</Label>
                              <div className="pt-2">
                                <Slider
                                  id={`severity-${highlight.id}`}
                                  min={1}
                                  max={5}
                                  step={1}
                                  value={[highlight.severity]}
                                  onValueChange={value => handleUpdateHighlight(highlight.id, "severity", value[0])}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`notes-${highlight.id}`}>Notes</Label>
                            <Textarea
                              id={`notes-${highlight.id}`}
                              value={highlight.notes}
                              onChange={e => handleUpdateHighlight(highlight.id, "notes", e.target.value)}
                              placeholder={`Décrivez l'anomalie observée sur ${highlight.regionName.toLowerCase()}...`}
                              rows={3}
                            />
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              )}

              <div className="space-y-2 mt-4">
                <Label htmlFor="interventions">Description des interventions</Label>
                <Textarea
                  id="interventions"
                  value={interventions}
                  onChange={e => setInterventions(e.target.value)}
                  placeholder="Décrivez les interventions réalisées..."
                  rows={6}
                />
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="recommendations">Recommandations pour le propriétaire</Label>
                <Textarea
                  id="recommendations"
                  value={recommendations}
                  onChange={e => setRecommendations(e.target.value)}
                  placeholder="Ajoutez vos recommandations pour le suivi et les soins..."
                  rows={8}
                />
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="comments">Commentaires supplémentaires</Label>
                <Textarea
                  id="comments"
                  value={comments}
                  onChange={e => setComments(e.target.value)}
                  placeholder="Ajoutez des commentaires ou observations complémentaires..."
                  rows={4}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" onClick={togglePreviewMode}>
              <Eye className="h-4 w-4 mr-2" />
              {previewMode ? "Éditer" : "Aperçu"}
            </Button>
            <Button variant="outline" onClick={togglePdfPreview}>
              <FileText className="h-4 w-4 mr-2" />
              Prévisualiser PDF
            </Button>
          </div>
          <Button
            onClick={handleSaveReport}
            disabled={!title || !selectedPetId || (highlights.length === 0 && !interventions)}
          >
            <Save className="h-4 w-4 mr-2" />
            Terminer
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prévisualisation</CardTitle>
          <CardDescription>Aperçu du compte rendu complet</CardDescription>
        </CardHeader>
        <CardContent>
          {showPdfPreview ? (
            <div className="aspect-[3/4] bg-white rounded-md border shadow flex flex-col">
              <div className="text-center p-4 border-b">
                <h2 className="font-bold text-xl">Aperçu PDF</h2>
              </div>
              <div className="p-6 text-center flex-1 flex items-center justify-center">
                <div>
                  <p className="text-muted-foreground mb-4">Prévisualisation du PDF avant finalisation</p>
                  <Button variant="outline" onClick={togglePdfPreview}>
                    Retour à l&apos;aperçu normal
                  </Button>
                </div>
              </div>
            </div>
          ) : previewMode ? (
            <div className="bg-white dark:bg-slate-900 p-6 rounded-md border shadow-sm overflow-y-auto max-h-[600px]">
              <div className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold">{title}</h2>
                <p className="text-sm text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Patient</h3>
                <p>Nom: Rex (à remplacer par les données réelles)</p>
                <p>Espèce: Chien</p>
                <p>Propriétaire: Jean Dupont</p>
              </div>

              {highlights.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Observations anatomiques</h3>
                  <ul className="space-y-3">
                    {highlights.map(highlight => (
                      <li key={highlight.id} className="border-b pb-2">
                        <div className="flex items-center gap-2 font-medium">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{
                              backgroundColor: highlightColors.find(c => c.id === highlight.color)?.hex,
                            }}
                          />
                          <span>
                            {highlight.regionName}
                            {highlight.severity > 1 && ` (Gravité: ${highlight.severity}/5)`}
                          </span>
                        </div>
                        {highlight.notes && <p className="text-sm mt-1 pl-5">{highlight.notes}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {interventions && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Interventions réalisées</h3>
                  <p className="whitespace-pre-line">{interventions}</p>
                </div>
              )}

              {recommendations && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Recommandations</h3>
                  <p className="whitespace-pre-line">{recommendations}</p>
                </div>
              )}

              {comments && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Commentaires</h3>
                  <p className="text-sm whitespace-pre-line">{comments}</p>
                </div>
              )}

              <div className="mt-8 pt-4 border-t text-right">
                <p className="font-medium">Dr. Vétérinaire</p>
                <p className="text-sm text-muted-foreground">Signature</p>
              </div>
            </div>
          ) : (
            <div className="aspect-[3/4] bg-muted rounded-md flex items-center justify-center">
              <p className="text-muted-foreground text-center">Cliquez sur "Aperçu" pour voir le compte rendu.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Modale de sélection d'animal */}
      {selectedPetId && (
        <AnimalCredenza isOpen={isAnimalCredenzaOpen} onOpenChange={setIsAnimalCredenzaOpen} petId={selectedPetId} />
      )}
    </div>
  )
}
