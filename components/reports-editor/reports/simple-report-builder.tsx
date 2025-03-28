"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileUp, Trash2, FileText, Eye, Save, PlusCircle, X, Image } from "lucide-react"
import { AnimalCredenza } from "@/components/dashboard/shortcuts/pro/unified-metrics/AnimalCredenza"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ReportItem {
  id: string
  type: "observation" | "intervention" | "recommendation"
  content: string
}

interface SimpleReportBuilderProps {
  orgId: string
}

export function SimpleReportBuilder({ orgId }: SimpleReportBuilderProps) {
  const [title, setTitle] = useState("Compte rendu de visite du " + new Date().toLocaleDateString())
  const [selectedPetId, setSelectedPetId] = useState<string>("")
  const [isAnimalCredenzaOpen, setIsAnimalCredenzaOpen] = useState(false)
  const [items, setItems] = useState<ReportItem[]>([])
  const [notes, setNotes] = useState("")
  const [previewMode, setPreviewMode] = useState(false)
  const [activeTab, setActiveTab] = useState<string>("items")
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  const handleAddItem = (type: ReportItem["type"]) => {
    const newItem: ReportItem = {
      id: crypto.randomUUID(),
      type,
      content: "",
    }
    setItems([...items, newItem])
  }

  const handleUpdateItem = (id: string, field: keyof ReportItem, value: string) => {
    setItems(items.map(item => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const handleRemoveItem = (id: string) => {
    setItems(items.filter(item => item.id !== id))
  }

  const handleSaveReport = () => {
    // Ici on appellerait une server action pour sauvegarder le rapport
    console.log({
      title,
      petId: selectedPetId,
      items,
      notes,
      images: selectedFiles.map(file => file.name),
    })

    // Message de succès et/ou redirection
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const newFiles = Array.from(files)
      const validFiles = newFiles.filter(file => file.type.startsWith("image/"))

      if (validFiles.length !== newFiles.length) {
        // Gestion d'erreur: certains fichiers ne sont pas des images
        console.error("Certains fichiers sélectionnés ne sont pas des images")
      }

      const fileUrls = validFiles.map(file => URL.createObjectURL(file))

      setSelectedFiles(prev => [...prev, ...validFiles])
      setPreviewUrls(prev => [...prev, ...fileUrls])
    }
  }

  const handleRemoveFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index])
    setPreviewUrls(prev => prev.filter((_, i) => i !== index))
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleOpenAnimalSelector = () => {
    setIsAnimalCredenzaOpen(true)
  }

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode)
  }

  const getItemTypeLabel = (type: ReportItem["type"]) => {
    switch (type) {
      case "observation":
        return "Observation"
      case "intervention":
        return "Intervention réalisée"
      case "recommendation":
        return "Recommandation"
      default:
        return "Item"
    }
  }

  const getItemIcon = (type: ReportItem["type"]) => {
    switch (type) {
      case "observation":
        return <FileText className="h-4 w-4 text-blue-500" />
      case "intervention":
        return <FileText className="h-4 w-4 text-green-500" />
      case "recommendation":
        return <FileText className="h-4 w-4 text-amber-500" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Compte rendu simplifié</CardTitle>
          <CardDescription>Créez un compte rendu de visite avec les informations essentielles</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 w-full">
              <TabsTrigger value="items" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Contenu</span>
              </TabsTrigger>
              <TabsTrigger value="images" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                <span>Schémas & Images</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="items" className="mt-6 space-y-4">
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

              <div className="space-y-4 mt-6">
                <div className="flex items-center justify-between">
                  <Label>Éléments du compte rendu</Label>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleAddItem("observation")}>
                      <PlusCircle className="h-4 w-4 mr-2 text-blue-500" />
                      Observation
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleAddItem("intervention")}>
                      <PlusCircle className="h-4 w-4 mr-2 text-green-500" />
                      Intervention
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleAddItem("recommendation")}>
                      <PlusCircle className="h-4 w-4 mr-2 text-amber-500" />
                      Recommandation
                    </Button>
                  </div>
                </div>

                {items.length === 0 ? (
                  <div className="border rounded-md p-8 flex flex-col items-center justify-center">
                    <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground text-center">
                      Aucun élément ajouté.
                      <br />
                      Cliquez sur l'un des boutons pour ajouter un élément.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map(item => (
                      <Card
                        key={item.id}
                        className={`relative border-l-4 ${
                          item.type === "observation"
                            ? "border-l-blue-500"
                            : item.type === "intervention"
                              ? "border-l-green-500"
                              : "border-l-amber-500"
                        }`}
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        <CardContent className="pt-6">
                          <div className="space-y-2">
                            <div className="flex items-center">
                              {getItemIcon(item.type)}
                              <Label htmlFor={`content-${item.id}`} className="ml-2">
                                {getItemTypeLabel(item.type)}
                              </Label>
                            </div>
                            <Textarea
                              id={`content-${item.id}`}
                              value={item.content}
                              onChange={e => handleUpdateItem(item.id, "content", e.target.value)}
                              placeholder={`Ajoutez votre ${getItemTypeLabel(item.type).toLowerCase()} ici...`}
                              rows={3}
                            />
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2 mt-4">
                <Label htmlFor="notes">Notes complémentaires</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="Informations supplémentaires..."
                  rows={4}
                />
              </div>
            </TabsContent>

            <TabsContent value="images" className="mt-6 space-y-6">
              <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
                <Image className="h-10 w-10 text-muted-foreground mb-2" />
                <h3 className="font-medium mb-1">Importez vos schémas et images</h3>
                <p className="text-sm text-muted-foreground text-center mb-3">PNG, JPG ou GIF jusqu&apos;à 10 MB</p>
                <Button variant="secondary" className="relative">
                  <Input
                    type="file"
                    accept="image/*"
                    multiple
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                  />
                  <FileUp className="h-4 w-4 mr-2" />
                  Sélectionner des fichiers
                </Button>
              </div>

              {previewUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {previewUrls.map((url, index) => (
                    <div key={url} className="relative group">
                      <img
                        src={url}
                        alt={`Image ${index + 1}`}
                        className="rounded-md w-full aspect-square object-cover"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={togglePreviewMode}>
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? "Éditer" : "Aperçu"}
          </Button>
          <Button onClick={handleSaveReport} disabled={!title || !selectedPetId || items.length === 0}>
            <Save className="h-4 w-4 mr-2" />
            Terminer
          </Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Prévisualisation</CardTitle>
          <CardDescription>Aperçu du compte rendu avant finalisation</CardDescription>
        </CardHeader>
        <CardContent>
          {previewMode ? (
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

              {items.length > 0 && (
                <div className="space-y-6 mb-6">
                  {/* Regrouper les items par type */}
                  {["observation", "intervention", "recommendation"].map(type => {
                    const typeItems = items.filter(item => item.type === type)
                    if (typeItems.length === 0) return null

                    return (
                      <div key={type} className="space-y-2">
                        <h3 className="font-semibold">
                          {type === "observation"
                            ? "Observations"
                            : type === "intervention"
                              ? "Interventions réalisées"
                              : "Recommandations"}
                        </h3>
                        <ul className="list-disc pl-5 space-y-2">
                          {typeItems.map(item => (
                            <li key={item.id}>{item.content || `[${getItemTypeLabel(item.type)} à compléter]`}</li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              )}

              {previewUrls.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Schémas et images</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {previewUrls.map((url, index) => (
                      <img
                        key={url}
                        src={url}
                        alt={`Image ${index + 1}`}
                        className="rounded-md w-full object-contain h-40"
                      />
                    ))}
                  </div>
                </div>
              )}

              {notes && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-2">Notes complémentaires</h3>
                  <p className="text-sm whitespace-pre-line">{notes}</p>
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
